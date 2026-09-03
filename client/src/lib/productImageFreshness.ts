import { isProductImageFresh } from "@/lib/priceFreshness.generated";

export type ProductImageLike = {
  asin?: string;
  imageUrl?: string;
  amazonImageUrl?: string;
};

const AMAZON_IMAGE_HOSTS = new Set([
  "m.media-amazon.com",
  "images-na.ssl-images-amazon.com",
]);

export function isAmazonHostedProductImage(url?: string): boolean {
  if (!url) return false;
  try {
    return AMAZON_IMAGE_HOSTS.has(new URL(url).hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function getRenderableProductImage(product?: ProductImageLike): string | undefined {
  const candidates = [product?.imageUrl, product?.amazonImageUrl].filter((url): url is string => Boolean(url));
  const siteOwnedImage = candidates.find((url) => !isAmazonHostedProductImage(url));
  if (siteOwnedImage) return siteOwnedImage;
  const amazonImage = candidates.find(isAmazonHostedProductImage);
  return amazonImage && isProductImageFresh(product?.asin) ? amazonImage : undefined;
}
