import { gql } from './hygraph-cilent';
export const ProductFragment = gql`
  fragment ProductFragment on Product {
    collection {
      slug
    }
    id
    name
    slug
    description
    images {
      fileName
      url
    }
    productSizes {
      calories
      price
      weight
      name
    }
    productOptions {
      name
      typeOfUi
      slug
      children {
        name
        price
        quantity
      }
    }
  }
`;
export const CartFragment = gql`
  fragment CartFragment on Cart {
    id
    stripeCheckoutId
    email
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    cartLines {
      id
      quantity
      cost {
        amount
        currencyCode
      }
      merchandise {
        product {
          ...ProductFragment
        }
        selectedOptions {
          name
          price
          quantity
        }
        selectedSize {
          name
          price
          calories
          weight
        }
      }
    }
  }

  ${ProductFragment}
`;
export const LinesFragment = gql`
  fragment LinesFragment on CartLine {
    id
    quantity
    cost {
      amount
      currencyCode
    }
    merchandise {
      selectedOptions {
        name
        price
        quantity
      }
      selectedSize {
        name
        calories
        weight
        price
      }
      product {
        ...ProductFragment
      }
    }
  }
  ${ProductFragment}
`;
export const CategoryFragment = gql`
  fragment CategoryFragment on Category {
    name
    slug
    image {
      url
      fileName
    }
    products {
      slug
      name
      images {
        url
        fileName
      }
    }
  }
`;
export const CollectionFragment = gql`
  fragment CollectionFragment on Collection {
    name
    categories {
      name
      slug
      image {
        fileName
        url
      }
    }
  }
`;

export const ImageFragment = gql`
  fragment ImageFragment on Asset {
    id
    height
    url
    width
  }
`;

// export const ProductFragsment = gql`
//   fragment ProductFragment on Product {
//     id
//     description
//     images {
//       ...ImageFragment
//     }
//     name
//     price
//     slug
//     variants {
//       ...ProductVariantFragment
//     }
//   }

//   ${[ImageFragment, ProductVariantFragment]}
// `;

// export const ProductCardFragment = gql`
//   fragment ProductCardFragment on Product {
//     id
//     images(first: 1) {
//       ...ImageFragment
//     }
//     name
//     price
//     slug
//     variants(first: 1) {
//       ...ProductVariantFragment
//     }
//   }

//   ${[ImageFragment, ProductVariantFragment]}
// `;
