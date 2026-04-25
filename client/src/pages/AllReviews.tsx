// SilkierStrands.com — All Reviews Page
// Design: Bold magazine aesthetic with Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
// Features: Sidebar FilterPanel (price range + hair type + category) + Sort + Search

import { useEffect, useState, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import FilterPanel, {
  FilterState,
  getDefaultFilters,
  hasActiveFilters,
  applyFilters,
  HAIR_TYPES,
} from "@/components/FilterPanel";
import { allProducts, categories } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const SORT_OPTIONS = [
  { id: "default", label: "Featured" },
  { id: "rating-desc", label: "Highest Rated" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

export default function AllReviews() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [filters, setFilters] = useState<FilterState>(getDefaultFilters());
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    updateDocumentMeta({
      title: "All Hair Product Reviews | SilkierStrands",
      description:
        "Browse all expert hair product reviews across shampoos, conditioners, hair masks, serums, hair dryers, flat irons, and curling irons. Filter by price and hair type.",
      canonical: "https://silkierstrands.com/reviews",
    });
  }, []);

  const clearAll = () => {
    setSelectedCategory("all");
    setFilters(getDefaultFilters());
    setSortBy("default");
    setSearchQuery("");
  };

  const anyActive =
    selectedCategory !== "all" ||
    hasActiveFilters(filters) ||
    sortBy !== "default" ||
    searchQuery.length > 0;

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (filters.priceMin > 0 || filters.priceMax < 600 ? 1 : 0) +
    filters.hairTypes.length;

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    // Price + Hair Type via shared utility
    result = applyFilters(result, filters);

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sort
    switch (sortBy) {
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) =>
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
        break;
      default:
        result.sort((a, b) => {
          if (a.editorPick && !b.editorPick) return -1;
          if (!a.editorPick && b.editorPick) return 1;
          return b.rating - a.rating;
        });
    }

    return result;
  }, [selectedCategory, filters, sortBy, searchQuery]);

  const activeSortLabel =
    SORT_OPTIONS.find((o) => o.id === sortBy)?.label || "Featured";

  return (
    <SiteLayout>
      {/* ── Page Header ── */}
      <section
        className="py-14 border-b"
        style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}
      >
        <div className="container">
          <p
            className="font-label font-semibold text-xs mb-2"
            style={{ color: "#D4822A", letterSpacing: "0.12em", textTransform: "uppercase" }}
          >
            Expert Tested
          </p>
          <h1
            className="font-display font-bold"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#2C2C2C" }}
          >
            All Hair Product Reviews
          </h1>
          <p
            className="font-body text-lg mt-3"
            style={{ color: "#6C6C6C", maxWidth: "600px" }}
          >
            {allProducts.length} products reviewed across {categories.length} categories.
            Updated every Monday with new reviews.
          </p>
        </div>
      </section>

      {/* ── Search + Sort Bar ── */}
      <section
        className="py-4 border-b sticky top-[73px] z-40"
        style={{ borderColor: "#E8DDD0", backgroundColor: "#FDF6EE" }}
      >
        <div className="container">
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative flex-1" style={{ minWidth: "200px", maxWidth: "360px" }}>
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#8B1A2F" }}
              />
              <input
                type="text"
                placeholder="Search products, brands…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm font-body rounded-sm border"
                style={{
                  borderColor: "#D4C5B5",
                  backgroundColor: "#FFFFFF",
                  color: "#2C2C2C",
                  outline: "none",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "#999" }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters((v) => !v)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 text-xs font-label font-semibold rounded-sm border transition-colors"
              style={{
                borderColor: showMobileFilters ? "#8B1A2F" : "#D4C5B5",
                backgroundColor: showMobileFilters ? "#8B1A2F" : "transparent",
                color: showMobileFilters ? "#FDF6EE" : "#8B1A2F",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <SlidersHorizontal size={13} />
              Filters
              {activeFilterCount > 0 && (
                <span
                  className="ml-1 w-4 h-4 rounded-full text-xs flex items-center justify-center"
                  style={{ backgroundColor: "#D4822A", color: "#FFF" }}
                >
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-label font-semibold rounded-sm border transition-colors"
                style={{
                  borderColor: "#D4C5B5",
                  backgroundColor: "transparent",
                  color: "#2C2C2C",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                Sort: {activeSortLabel}
                <ChevronDown size={13} />
              </button>
              {sortOpen && (
                <div
                  className="absolute right-0 top-full mt-1 rounded-sm border shadow-lg z-50"
                  style={{ backgroundColor: "#FFF", borderColor: "#E8DDD0", minWidth: "180px" }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-xs font-label font-semibold hover:bg-amber-50 transition-colors"
                      style={{
                        color: sortBy === opt.id ? "#8B1A2F" : "#2C2C2C",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        borderBottom: "1px solid #F0E8DC",
                      }}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Clear All */}
            {anyActive && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1 text-xs font-label font-semibold"
                style={{ color: "#D4822A", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                <X size={12} /> Clear All
              </button>
            )}

            {/* Results count */}
            <span className="ml-auto text-xs font-body" style={{ color: "#999" }}>
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── Active Filter Chips ── */}
      {anyActive && (
        <section
          className="py-3 border-b"
          style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}
        >
          <div className="container">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-body" style={{ color: "#999" }}>Active:</span>
              {selectedCategory !== "all" && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE" }}
                >
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("all")}><X size={11} /></button>
                </span>
              )}
              {(filters.priceMin > 0 || filters.priceMax < 600) && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE" }}
                >
                  ${filters.priceMin}–{filters.priceMax >= 600 ? "$600+" : `$${filters.priceMax}`}
                  <button onClick={() => setFilters(f => ({ ...f, priceMin: 0, priceMax: 600 }))}><X size={11} /></button>
                </span>
              )}
              {filters.hairTypes.map((ht) => (
                <span
                  key={ht}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#D4822A", color: "#FFF" }}
                >
                  {HAIR_TYPES.find((h) => h.id === ht)?.label}
                  <button onClick={() => setFilters(f => ({ ...f, hairTypes: f.hairTypes.filter(t => t !== ht) }))}><X size={11} /></button>
                </span>
              ))}
              {sortBy !== "default" && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#6C6C6C", color: "#FFF" }}
                >
                  {activeSortLabel}
                  <button onClick={() => setSortBy("default")}><X size={11} /></button>
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Main Layout: Sidebar + Grid ── */}
      <section className="py-10">
        <div className="container">
          <div className="flex gap-8 items-start">

            {/* ── Desktop Sidebar Filter ── */}
            <aside className="hidden lg:block flex-shrink-0" style={{ width: "260px" }}>
              <div className="sticky top-[130px]">
                <div className="flex items-center justify-between mb-4">
                  <h2
                    className="font-label font-semibold text-xs"
                    style={{ color: "#8B1A2F", letterSpacing: "0.12em", textTransform: "uppercase" }}
                  >
                    Filter Products
                  </h2>
                  {anyActive && (
                    <button
                      onClick={clearAll}
                      className="text-xs font-label font-semibold"
                      style={{ color: "#D4822A" }}
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  showCategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  productCount={filtered.length}
                />
              </div>
            </aside>

            {/* ── Mobile Filter Panel (collapsible) ── */}
            {showMobileFilters && (
              <div className="lg:hidden w-full mb-6">
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  showCategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  productCount={filtered.length}
                />
              </div>
            )}

            {/* ── Products Grid ── */}
            <div className="flex-1 min-w-0">
              {filtered.length === 0 ? (
                <div className="text-center py-20">
                  <p className="font-display text-2xl font-semibold mb-3" style={{ color: "#2C2C2C" }}>
                    No products found
                  </p>
                  <p className="font-body text-base mb-6" style={{ color: "#6C6C6C" }}>
                    Try adjusting your price range, hair type, or search terms.
                  </p>
                  <button
                    onClick={clearAll}
                    className="px-6 py-3 font-label font-semibold text-xs rounded-sm"
                    style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE", letterSpacing: "0.1em", textTransform: "uppercase" }}
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Editor's Picks (only when no active filters) */}
                  {!anyActive && (
                    <div className="mb-10">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 rounded-sm" style={{ backgroundColor: "#D4822A" }} />
                        <h2
                          className="font-label font-semibold text-sm"
                          style={{ color: "#8B1A2F", letterSpacing: "0.12em", textTransform: "uppercase" }}
                        >
                          Editor's Picks
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
                        {filtered.filter((p) => p.editorPick).map((p) => (
                          <ProductCard key={p.id} product={p} variant="featured" />
                        ))}
                      </div>
                      <div className="border-t mb-10" style={{ borderColor: "#E8DDD0" }} />
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-1 h-6 rounded-sm" style={{ backgroundColor: "#8B1A2F" }} />
                        <h2
                          className="font-label font-semibold text-sm"
                          style={{ color: "#8B1A2F", letterSpacing: "0.12em", textTransform: "uppercase" }}
                        >
                          All Reviews
                        </h2>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filtered.map((p) => (
                      <ProductCard key={p.id} product={p} variant="featured" />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
