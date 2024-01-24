'use client';
import useStore from '@/store';
import useCartStore from '@/store/store-cart';
import getURL from '@/utils/utils';
import { Dialog, Transition } from '@headlessui/react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useMemo, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { retrieveOrder } from './stripe/actions';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST as string
);
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      role="link"
      disabled={pending}
      className="text-lg w-30 fixed bottom-12 right-10 flex  h-8 cursor-pointer items-center justify-center rounded-full bg-emerald-700 px-6 py-8 text-center  font-semibold leading-snug  tracking-wider text-white shadow max-md:right-4 "
    >
      {pending ? (
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
      ) : (
        <div> Continue</div>
      )}
    </button>
  );
}
export default function ContinueModal() {
  console.log(window.location.origin);
  const currentCart = useStore(useCartStore, (state) => state.currentCart);

  const payload = { lines: currentCart!, url: getURL('') };
  const [active, setActive] = useState(false);
  const closeContinue = () => setActive(false);
  const [isShow, setIsShow] = useState(false);
  const [state, FormState] = useFormState(retrieveOrder, null);
  const actionWithVariant = FormState.bind(null, payload);
  useEffect(() => {
    if (!isShow) {
      setIsShow(true);
    }
  }, [isShow]);
  useMemo(async () => {
    if (!state?.session) return;
    const stripe = await stripePromise;

    await stripe!.redirectToCheckout({
      sessionId: state!.session!.id,
    });
  }, [state]);

  return (
    <Transition
      show={isShow}
      enter="transition-opacity duration-1000"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-1000"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <>
        <form action={actionWithVariant}>
          <SubmitButton />
          <p aria-live="polite" className="sr-only" role="status">
            {/* {state} */}
          </p>
        </form>

        <Transition show={active}>
          <Dialog onClose={closeContinue} as="div" className="relative z-10">
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-300"
              enterFrom="opacity-0 backdrop-blur-none"
              enterTo="opacity-100 backdrop-blur-[.5px]"
              leave="transition-all ease-in-out duration-200"
              leaveFrom="opacity-100 backdrop-blur-[.5px]"
              leaveTo="opacity-0 backdrop-blur-none"
            >
              <div className="fixed inset-0 bg-black/30" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition-all ease-in-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transition-all ease-in-out duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="fixed bottom-0 left-0 right-0 h-[30%] w-screen bg-white p-4 text-black">
                <div className="w-full">
                  <Image src="/close.svg" width={32} height={32} alt="close" />
                </div>
                <div className="flex flex-col items-center justify-center gap-y-6">
                  <div>
                    To place an order, you&apos;ll need to be a Starbucks®
                    Rewards member
                  </div>
                  <Link
                    href="/account/create"
                    className="text-2xl text-seagreen"
                  >
                    Join now
                  </Link>
                  <Link
                    href="/account/signin"
                    className="text-2xl text-seagreen"
                  >
                    Sign in
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </Dialog>
        </Transition>
      </>
    </Transition>
  );
}
