export type Image = {
  url: string;
  fileName: string;
};

export type Category = {
  name: string;
  image: Image;
  products: Product[];
  slug: string;
};
export type Collection = {
  name: string;
  slug: string;
  categories: Category[];
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalTaxAmount: Money;
    totalAmount: Money;
  };
  cartLines: CartItem[];
  totalQuantity: number;
};

export type Money = {
  amount: number;
  currencyCode: string;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: Money;
  merchandise: {
    selectedOptions: {
      name: string;
      price: number;
      quantity: number;
    }[];
    selectedSize: ProductSize;
    product: Product;
  };
};
export type CreateCartOperation = {
  data: { cartCreate: { cart: Cart } };
};

export type AddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: Cart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};
export type RemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: Cart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};
export type UpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: Cart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type Product = {
  id: string;
  name: string;
  options: any;
  images: Image[];
  slug: string;
  description: string;
  productSizes: ProductSize[];
  productOptions: ProductOption[];
  collection: Collection;
};

export type Select = {
  name: string;
  price: number;
  quantity: number;
};
export type ProductOption = {
  name: string;
  typeOfUi: string;
  children: Select[];
  slug: string;
};
export type ProductSize = {
  calories: number;
  price: number;
  weight: number;
  name: string;
};
