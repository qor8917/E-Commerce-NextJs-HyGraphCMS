'use server';

import createCart from '@/hygraph/cart/create-cart';
import stripeClient from '@/hygraph/stripe-client';
import { CartItem } from '@/types/types';

export async function retrieveOrder(
  _currentState: any,
  payload: { lines: CartItem[] }
) {
  const { lines } = payload;
  try {
    const session = await stripeClient.checkout.sessions.create({
      line_items: lines.map((line) => {
        const { name, images } = line.merchandise.product;
        return {
          price_data: {
            currency: line.cost.currencyCode.toLowerCase(),
            product_data: { name, images: [images[0].url] },
            unit_amount: line.cost.amount + line.cost.amount * 0.1,
          },
          quantity: 1,
        };
      }),
      mode: 'payment',
      success_url: 'https://starbucksdubai.vercel.app/order',
      cancel_url: 'https://starbucksdubai.vercel.app/cart',
    });
    //주문한 내역(상품,이메일,stripe checkout ID, 총금액, 총수량) 저장
    const subtotalAmount = lines?.reduce(
      (acc, line) => (acc += line.cost.amount),
      0
    );
    const totalTaxAmount = subtotalAmount! * 0.1;
    const totalAmount = subtotalAmount! + totalTaxAmount;
    const variables = {
      data: {
        email: session.customer_email,
        stripeCheckoutId: session.id,
        totalQuantity: lines.length,
        cost: {
          create: {
            subtotalAmount: {
              create: { amount: subtotalAmount, currencyCode: 'krw' },
            },
            totalAmount: {
              create: { amount: totalAmount, currencyCode: 'krw' },
            },
            totalTaxAmount: {
              create: { amount: totalTaxAmount, currencyCode: 'krw' },
            },
          },
        },
        cartLines: {
          create: lines.map((line) => {
            const { amount } = line.cost;
            const { selectedOptions, selectedSize, product } = line.merchandise;
            return {
              quantity: 1,
              cost: { create: { amount: amount, currencyCode: 'krw' } },
              merchandise: {
                create: {
                  selectedOptions: {
                    create: selectedOptions,
                  },
                  selectedSize: { create: selectedSize },
                  product: { connect: { id: product.id } },
                },
              },
            };
          }),
        },
      },
    };
    await createCart(variables);
    return { session: session };
  } catch (error: any) {
    return { error: error.message };
  }
}
