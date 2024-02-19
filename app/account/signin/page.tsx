'use client';
import useBranchStore from '@/store/store-branch';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { z } from 'zod';
export default function SignInPage() {
  const [data, setData] = useState({
    email: 'admin@gmail.com',
    password: '1234',
  });
  const route = useRouter();
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPassword, setPassword] = useState<boolean>(true);
  const [errorWindow, setErrorWindow] = useState<boolean>();
  const { callBackUrl } = useBranchStore();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status == 'authenticated') {
      route.back();
    }
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-6 p-4 lg:pt-[6.1876rem] pt-[5rem]">
        <div className="text-2xl p-4 font-bold leading-10 max-sm:text-base">
          Sign in or create an account
        </div>
        <div className="w-[31.25rem] max-sm:w-full rounded-[0.75rem] p-6 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] ">
          <form action="" className="flex flex-col gap-y-2 w-full">
            <div className="py-4 text-[1rem]">* indicates required field</div>
            {errorWindow && (
              <div className=" border-2 bg-red-100 text-black p-8 mb-4 border-red-400">
                <div className="">Sign in unsuccessful.</div>
                <span className=" text-sm">
                  The email or password you entered is not valid. Please try
                  again.
                </span>
              </div>
            )}
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="email"
                  aria-describedby="outlined_success_help"
                  className="border-black-600 focus:border-black-600 peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-4 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0  "
                  placeholder="admin@example.com"
                  onBlur={(e) => {
                    const value = e.target.value;
                    const validation = z
                      .string()
                      .email()
                      .min(5)
                      .safeParse(value);
                    if (validation.success) {
                      setIsEmail(true);
                    } else {
                      setIsEmail(false);
                    }
                  }}
                  onChange={(e) => {
                    const value = e.target.value;
                    setData((prev) => ({ ...prev, email: value }));
                  }}
                />
                <label
                  htmlFor="outlined_success"
                  className="text-black-600 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm leading-6 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  <div className=" text-base text-opacity-90">
                    <span className="text-green-600">*</span>{' '}
                    <span>Username or email address</span>
                  </div>
                </label>
              </div>
              {isEmail ? (
                <p
                  id="outlined_success_help"
                  className="text-xs p-2 text-green-600 "
                >
                  <span className="font-medium">✅</span> Checked the Email
                  address correctly
                </p>
              ) : (
                <p
                  id="outlined_success_help"
                  className={`text-xs p-2 text-red-500 ${
                    isEmail == null ? 'invisible' : 'visible'
                  }`}
                >
                  <span className="font-medium">❌</span>
                  Enter the Email address correctly
                </p>
              )}

              <div className="relative">
                <input
                  type="password"
                  id="password"
                  aria-describedby="outlined_success_help"
                  className="border-black-600 focus:border-black-600 peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-4 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0  "
                  placeholder="1234"
                  autoComplete="on"
                  onBlur={(e) => {
                    const value = e.target.value;
                    const validation = z.string().min(4).safeParse(value);
                    if (validation.success) {
                      setPassword(true);
                    } else {
                      setPassword(false);
                    }
                  }}
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, password: e.target.value }));
                  }}
                />
                <label
                  htmlFor="outlined_success"
                  className="text-black-600 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm leading-6 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  <div className="text-base text-opacity-90">
                    <span className="text-green-600">*</span>{' '}
                    <span>Password</span>
                  </div>
                </label>
              </div>
              {isPassword ? (
                <p
                  id="outlined_success_help"
                  className="text-xs p-2 text-green-600 invisible"
                >
                  <span className="font-medium">✅</span> space
                </p>
              ) : (
                <p
                  id="outlined_success_help"
                  className={`text-xs p-2 text-red-500 ${
                    isPassword == null ? 'invisible' : 'visible'
                  }`}
                >
                  <span className="font-medium">❌</span>
                  Enter the password at least 4.
                </p>
              )}
            </div>
            <div className="flex items-center py-2">
              <input
                type="checkbox"
                name="keepinSign"
                id="keepinSign"
                className="h-[1.5rem] w-[1.5rem]"
              />
              <label htmlFor="keepinSign" className="px-2">
                Keep me signed in.
              </label>
              <span className=" font-bold text-seagreen underline">
                Details
              </span>
            </div>
            <div className="flex flex-col gap-y-2 font-bold leading-6 text-seagreen underline">
              <div>Forgot your username?</div>
              <div>Forgot your password?</div>
            </div>
            <div className=" self-end pt-8">
              {status === 'loading' ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent  motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              ) : (
                <button
                  className="rounded-[31.25rem] bg-seagreen px-6 py-4 font-[600] leading-6 text-white shadow"
                  onClick={async (e) => {
                    e.preventDefault();
                    if (!(isEmail && isPassword)) {
                      setErrorWindow(true);
                      return;
                    }
                    const a = await signIn('credentials', {
                      ...data,
                      redirect: false,
                      callbackUrl: callBackUrl[0],
                    });
                    route.push(a?.url as string);
                  }}
                >
                  Sign in
                </button>
              )}
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center gap-y-4 p-4 text-center">
          <div className="font-bold leading-5 tracking-wider text-seagreen">
            Join Starbucks® Rewards
          </div>
          <p className="max-w-[22.5rem]">
            Join Starbucks® Rewards to earn free food and drinks, get free
            refills, pay and order with your phone, and more.
          </p>
          <div>
            <button className="p rounded-[3.125rem] border-2 border-seagreen px-4 py-2 text-seagreen">
              Join now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
