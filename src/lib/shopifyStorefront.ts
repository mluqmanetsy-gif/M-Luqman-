const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN as string | undefined;
const STOREFRONT_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string | undefined;
const API_VERSION = '2026-10';

type ShopifyImage = { url: string; altText?: string | null };
type ShopifyVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number | null;
  price: { amount: string; currencyCode: string };
  selectedOptions: { name: string; value: string }[];
};
export type ShopifyStorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
};

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] };

function getEndpoint() {
  if (!SHOPIFY_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error('Shopify Storefront settings are missing. Check the Vercel environment variables.');
  }
  const domain = SHOPIFY_DOMAIN.replace(/^https?:\\/\\//, '').replace(/\\/$/, '');
  return `https://${domain}/api/${API_VERSION}/graphql.json`;
}

async function storefrontRequest<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(getEndpoint(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN as string,
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = (await response.json()) as GraphQLResponse<T>;
  if (!response.ok || payload.errors?.length || !payload.data) {
    const message = payload.errors?.map((error) => error.message).join('; ');
    throw new Error(message || `Shopify Storefront request failed (${response.status}).`);
  }
  return payload.data;
}

const PRODUCT_FIELDS = `
  id
  handle
  title
  description
  productType
  tags
  availableForSale
  images(first: 10) { nodes { url altText } }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 100) {
    nodes {
      id
      title
      availableForSale
      quantityAvailable
      price { amount currencyCode }
      selectedOptions { name value }
    }
  }
`;

export async function fetchStorefrontProducts(first = 50): Promise<ShopifyStorefrontProduct[]> {
  const data = await storefrontRequest<{
    products: { nodes: Omit<ShopifyStorefrontProduct, 'images' | 'variants'> & {
      images: { nodes: ShopifyImage[] };
      variants: { nodes: ShopifyVariant[] };
    }[] };
  }>(`
    query VeyoraProducts($first: Int!) {
      products(first: $first, sortKey: UPDATED_AT, reverse: true) {
        nodes {
          ${PRODUCT_FIELDS}
        }
      }
    }
  `, { first });

  return data.products.nodes.map((product) => ({
    ...product,
    images: product.images.nodes,
    variants: product.variants.nodes,
  }));
}

export async function createStorefrontCart(
  lines: { merchandiseId: string; quantity: number }[],
  buyer: { email?: string; phone?: string; countryCode?: string } = {},
): Promise<{ id: string; checkoutUrl: string }> {
  const data = await storefrontRequest<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { message: string }[];
    };
  }>(`
    mutation VeyoraCartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart { id checkoutUrl }
        userErrors { message }
      }
    }
  `, {
    input: {
      lines,
      buyerIdentity: {
        ...(buyer.email ? { email: buyer.email } : {}),
        ...(buyer.phone ? { phone: buyer.phone } : {}),
        ...(buyer.countryCode ? { countryCode: buyer.countryCode } : { countryCode: 'PK' }),
      },
    },
  });

  const result = data.cartCreate;
  if (result.userErrors.length || !result.cart) {
    throw new Error(result.userErrors.map((error) => error.message).join('; ') || 'Shopify could not create the cart.');
  }
  return result.cart;
}

export async function verifyStorefrontConnection(): Promise<{ shopName: string; currencyCode: string }> {
  const data = await storefrontRequest<{
    shop: { name: string; paymentSettings: { currencyCode: string } };
  }>(`
    query VeyoraStorefrontHealth {
      shop { name paymentSettings { currencyCode } }
    }
  `);
  return { shopName: data.shop.name, currencyCode: data.shop.paymentSettings.currencyCode };
}
