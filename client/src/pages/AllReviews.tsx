// SilkierStrands.com — All Reviews Page
// Design: Bold magazine aesthetic with Burgundy (#8B1A2F) + Amber (#D4822A) + Cream (#FDF6EE)
// Features: Category filter + Hair Type filter + Sort + Search

import { useEffect, useState, useMemo } from "react";
import SiteLayout from "@/components/SiteLayout";
import ProductCard from "@/components/ProductCard";
import { allProducts, categories } from "@/lib/products";
import { updateDocumentMeta } from "@/lib/seo";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";

const HAIR_TYPES = [
  { id: "fine", label: "Fine" },
  { id: "thick", label: "Thick" },
  { id: "curly", label: "Curly" },
  { id: "coarse", label: "Coarse" },
  { id: "dry", label: "Dry" },
  { id: "normal", label: "Normal" },
  { id: "color-treated", label: "Color-Treated" },
  { id: "all", label: "All Hair Types" },
];

const SORT_OPTIONS = [
  { id: "default", label: "Featured" },
  { id: "rating-desc", label: "Highest Rated" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "newest", label: "Newest First" },
];

export default function AllReviews() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedHairTypes, setSelectedHairTypes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("default");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    updateDocumentMeta({
      title: "All Hair Product Reviews | SilkierStrands",
      description:
        "Browse all expert hair product reviews across shampoos, conditioners, hair masks, serums, hair dryers, flat irons, and curling irons. Filter by hair type.",
      canonical: "https://silkierstrands.com/reviews",
    });
  }, []);

  const toggleHairType = (typeId: string) => {
    setSelectedHairTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedHairTypes([]);
    setSortBy("default");
    setSearchQuery("");
  };

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedHairTypes.length > 0 ||
    sortBy !== "default" ||
    searchQuery.length > 0;

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.categorySlug === selectedCategory);
    }

    // Hair type filter
    if (selectedHairTypes.length > 0) {
      result = result.filter((p) => {
        if (!p.hairTypes || p.hairTypes.length === 0) return true;
        return selectedHairTypes.some(
          (ht) => p.hairTypes!.includes(ht) || p.hairTypes!.includes("all")
        );
      });
    }

    // Search filter
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
        // Featured: editor picks first, then by rating
        result.sort((a, b) => {
          if (a.editorPick && !b.editorPick) return -1;
          if (!a.editorPick && b.editorPick) return 1;
          return b.rating - a.rating;
        });
    }

    return result;
  }, [selectedCategory, selectedHairTypes, sortBy, searchQuery]);

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

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters((v) => !v)}
              className="flex items-center gap-2 px-4 py-2 text-xs font-label font-semibold rounded-sm border transition-colors"
              style={{
                borderColor: showFilters ? "#8B1A2F" : "#D4C5B5",
                backgroundColor: showFilters ? "#8B1A2F" : "transparent",
                color: showFilters ? "#FDF6EE" : "#8B1A2F",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <SlidersHorizontal size={13} />
              Filters
              {(selectedCategory !== "all" || selectedHairTypes.length > 0) && (
                <span
                  className="ml-1 w-4 h-4 rounded-full text-xs flex items-center justify-center"
                  style={{ backgroundColor: "#D4822A", color: "#FFF" }}
                >
                  {(selectedCategory !== "all" ? 1 : 0) + selectedHairTypes.length}
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
                  style={{
                    backgroundColor: "#FFF",
                    borderColor: "#E8DDD0",
                    minWidth: "180px",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        setSortBy(opt.id);
                        setSortOpen(false);
                      }}
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

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs font-label font-semibold"
                style={{ color: "#D4822A", letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                <X size={12} /> Clear All
              </button>
            )}

            {/* Results count */}
            <span
              className="ml-auto text-xs font-body"
              style={{ color: "#999" }}
            >
              {filtered.length} result{filtered.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>
      </section>

      {/* ── Expandable Filter Panel ── */}
      {showFilters && (
        <section
          className="border-b py-5"
          style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}
        >
          <div className="container">
            <div className="flex flex-col gap-5 md:flex-row md:gap-10">
              {/* Category Filter */}
              <div>
                <p
                  className="font-label font-semibold text-xs mb-3"
                  style={{
                    color: "#8B1A2F",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Category
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory("all")}
                    className="px-3 py-1.5 text-xs font-label font-semibold rounded-sm border transition-colors"
                    style={{
                      backgroundColor: selectedCategory === "all" ? "#8B1A2F" : "transparent",
                      color: selectedCategory === "all" ? "#FDF6EE" : "#8B1A2F",
                      border: "1px solid #8B1A2F",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    All
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.slug)}
                      className="px-3 py-1.5 text-xs font-label font-semibold rounded-sm border transition-colors"
                      style={{
                        backgroundColor:
                          selectedCategory === cat.slug ? "#8B1A2F" : "transparent",
                        color: selectedCategory === cat.slug ? "#FDF6EE" : "#8B1A2F",
                        border: "1px solid #8B1A2F",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hair Type Filter */}
              <div>
                <p
                  className="font-label font-semibold text-xs mb-3"
                  style={{
                    color: "#8B1A2F",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Hair Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {HAIR_TYPES.map((ht) => {
                    const active = selectedHairTypes.includes(ht.id);
                    return (
                      <button
                        key={ht.id}
                        onClick={() => toggleHairType(ht.id)}
                        className="px-3 py-1.5 text-xs font-label font-semibold rounded-sm transition-colors"
                        style={{
                          backgroundColor: active ? "#D4822A" : "transparent",
                          color: active ? "#FFF" : "#D4822A",
                          border: `1px solid #D4822A`,
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {ht.label}
                      </button>
                    );
                  })}
                </div>
                {selectedHairTypes.length > 0 && (
                  <p className="text-xs font-body mt-2" style={{ color: "#999" }}>
                    Showing products suitable for:{" "}
                    <strong style={{ color: "#D4822A" }}>
                      {selectedHairTypes
                        .map((id) => HAIR_TYPES.find((h) => h.id === id)?.label)
                        .join(", ")}
                    </strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Active Filter Chips ── */}
      {hasActiveFilters && !showFilters && (
        <section
          className="py-3 border-b"
          style={{ borderColor: "#E8DDD0", backgroundColor: "#FFF8F0" }}
        >
          <div className="container">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-body" style={{ color: "#999" }}>
                Active filters:
              </span>
              {selectedCategory !== "all" && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#8B1A2F", color: "#FDF6EE" }}
                >
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                  <button onClick={() => setSelectedCategory("all")}>
                    <X size={11} />
                  </button>
                </span>
              )}
              {selectedHairTypes.map((ht) => (
                <span
                  key={ht}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#D4822A", color: "#FFF" }}
                >
                  {HAIR_TYPES.find((h) => h.id === ht)?.label}
                  <button onClick={() => toggleHairType(ht)}>
                    <X size={11} />
                  </button>
                </span>
              ))}
              {sortBy !== "default" && (
                <span
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-label font-semibold rounded-full"
                  style={{ backgroundColor: "#6C6C6C", color: "#FFF" }}
                >
                  {activeSortLabel}
                  <button onClick={() => setSortBy("default")}>
                    <X size={11} />
                  </button>
                </span>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Products Grid ── */}
      <section className="py-12">
        <div className="container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p
                className="font-display text-2xl font-semibold mb-3"
                style={{ color: "#2C2C2C" }}
              >
                No products found
              </p>
              <p className="font-body text-base mb-6" style={{ color: "#6C6C6C" }}>
                Try adjusting your filters or search terms.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 font-label font-semibold text-xs rounded-sm"
                style={{
                  backgroundColor: "#8B1A2F",
                  color: "#FDF6EE",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              {/* Editor's Picks section (only when no active filters) */}
              {!hasActiveFilters && (
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1 h-6 rounded-sm"
                      style={{ backgroundColor: "#D4822A" }}
                    />
                    <h2
                      className="font-label font-semibold text-sm"
                      style={{
                        color: "#8B1A2F",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      Editor's Picks
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {filtered
                      .filter((p) => p.editorPick)
                      .map((p) => (
                        <ProductCard key={p.id} product={p} variant="featured" />
                      ))}
                  </div>
                  <div
                    className="border-t mb-10"
                    style={{ borderColor: "#E8DDD0" }}
                  />
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="w-1 h-6 rounded-sm"
                      style={{ backgroundColor: "#8B1A2F" }}
                    />
                    <h2
                      className="font-label font-semibold text-sm"
                      style={{
                        color: "#8B1A2F",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      All Reviews
                    </h2>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} variant="featured" />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
