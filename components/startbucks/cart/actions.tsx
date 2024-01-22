'use server';
import { TAGS } from '@/hygraph';
import addToCart from '@/hygraph/cart/add-to-cart';
import createCart from '@/hygraph/cart/create-cart';
import getCartById from '@/hygraph/cart/get-cart';
import removeFromCart from '@/hygraph/cart/remove-from-cart';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function addItem(_currentState: any, payload: any) {
  const { product, selectedOptions } = payload;
  let cartId = cookies().get('cartId')?.value;
  let cart;
  if (cartId) {
    cart = await getCartById(cartId);
  }
  if (!cartId || !cart) {
    cart = await createCart();
    cartId = cart.id;
    cookies().set('cartId', cartId);
  }
  const [size, ...rest] = selectedOptions;
  const amount = selectedOptions.reduce((acc: any, option: any) => {
    acc += option.price as number;
    return acc;
  }, 0);

  try {
    const lines = {
      create: [
        {
          quantity: 1,
          cost: { create: { amount: amount, currencyCode: 'krw' } },
          merchandise: {
            create: {
              selectedOptions: {
                create: rest,
              },
              selectedSize: { create: size },
              product: { connect: { id: product.id } },
            },
          },
        },
      ],
    };

    await addToCart(cartId, lines);
    revalidateTag(TAGS.CART);
    return '추가완료';
  } catch (error) {
    return '장바구니에 담는데 에러가 발생했습니다.';
  }
}

export async function removeItem(prevState: any, lineId: string) {
  try {
    await removeFromCart(lineId);
    revalidateTag(TAGS.CART);
    return '제거완료';
  } catch (e) {
    return 'Error removing item from cart';
  }
}

export async function updateItem(prevState: any, payload: any) {
  let cartId = cookies().get('cartId')?.value;
  let cart = await getCartById(cartId as string);

  const { product, selectedOptions, lineId } = payload;

  const [size, ...rest] = selectedOptions;
  const amount = selectedOptions.reduce((acc: any, option: any) => {
    acc += option.price as number;
    return acc;
  }, 0);

  await removeFromCart(lineId);
  try {
    const lines = {
      create: [
        {
          quantity: 1,
          cost: { create: { amount: amount, currencyCode: 'krw' } },
          merchandise: {
            create: {
              selectedOptions: {
                create: rest,
              },
              selectedSize: { create: size },
              product: { connect: { id: product.id } },
            },
          },
        },
      ],
    };
    await addToCart(cart.id, lines);
    revalidateTag(TAGS.CART);

    return '업데이트 완료';
  } catch (error) {
    return '상품을 업데이트하는데 실패 했습니다.';
  }
}
