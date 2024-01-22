export default function SignInPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-6 p-4">
        <div className=" text-2xl p-4 font-bold leading-10">Sign in or create an account</div>
        <div className="w-[31.25rem] rounded-[0.75rem] p-6 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
          <form action="" className="flex flex-col gap-y-2">
            <div className="py-4 text-[1rem]">* indicates required field</div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="outlined_success"
                  aria-describedby="outlined_success_help"
                  className="border-black-600 focus:border-black-600 peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-4 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0  "
                  placeholder=""
                />
                <label
                  htmlFor="outlined_success"
                  className="text-black-600 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm leading-6 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  <div className=" text-base text-opacity-90">
                    <span className="text-green-600">*</span> <span>Username or email address</span>
                  </div>
                </label>
              </div>
              <p id="outlined_success_help" className="text-xs p-2 text-green-600 ">
                <span className="font-medium">Well done!</span> Some success message.
              </p>
              <div className="relative">
                <input
                  type="text"
                  id="outlined_success"
                  aria-describedby="outlined_success_help"
                  className="border-black-600 focus:border-black-600 peer block w-full appearance-none rounded-lg border-2 bg-transparent px-2.5 pb-4 pt-4 text-sm text-gray-900 focus:outline-none focus:ring-0  "
                  placeholder=""
                />
                <label
                  htmlFor="outlined_success"
                  className="text-black-600 absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm leading-6 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                >
                  <div className="text-base text-opacity-90">
                    <span className="text-green-600">*</span> <span>Password</span>
                  </div>
                </label>
              </div>
              <p id="outlined_success_help" className="text-xs p-2 text-green-600">
                <span className="font-medium">Well done!</span> Some success message.
              </p>
              {/* 벨리데이션 실패했을때 css */}
              {/* <div>
                <div className="relative">
                  <input
                    type="text"
                    id="outlined_error"
                    aria-describedby="outlined_error_help"
                    className="border-1 peer block w-full appearance-none rounded-lg border-red-600 bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:border-red-600 focus:outline-none focus:ring-0 dark:border-red-500 dark:text-white dark:focus:border-red-500"
                    placeholder=" "
                  />
                  <label
                    for="outlined_error"
                    className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-red-600 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-red-500"
                  >
                    Outlined error
                  </label>
                </div>
                <p id="outlined_error_help" className="text-xs mt-2 text-red-600 dark:text-red-400">
                  <span className="font-medium">Oh, snapp!</span> Some error message.
                </p>
              </div>  */}
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
              <span className=" font-bold text-seagreen underline">Details</span>
            </div>
            <div className="flex flex-col gap-y-2 font-bold leading-6 text-seagreen underline">
              <div>Forgot your username?</div>
              <div>Forgot your password?</div>
            </div>
            <div className=" self-end pt-8">
              <button className="rounded-[31.25rem] bg-seagreen px-6 py-4 font-[600] leading-6 text-white shadow">
                Sign in
              </button>
            </div>
          </form>
        </div>
        <div className="flex flex-col items-center gap-y-4 p-4 text-center">
          <div className="font-bold leading-5 tracking-wider text-seagreen">
            Join Starbucks® Rewards
          </div>
          <p className="max-w-[22.5rem]">
            Join Starbucks® Rewards to earn free food and drinks, get free refills, pay and order
            with your phone, and more.
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
