<template>
  <div class="w-full">
    <div class="fixed -top-1/2 -left-1/2 w-[200%] h-[200%] block">
      <img
        class="absolute top-0 left-0 right-0 bottom-0 m-auto min-w-full min-h-full"
        src="../assets/images/login-background.png"
        alt="" />
    </div>
    <div class="w-full min-w-[360px] relative">
      <div class="notion w-full z-50 flex items-center justify-center h-screen">
        <div class="bg-white rounded-2xl">
          <div class="w-full p-5">
            <div class="text-center notion-title">Sign up</div>
            <!-- Start login in-app -->
            <div>
              <!-- Start Email input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-32">Email</div>
                <div class="relative">
                  <input
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="email" />
                  <div class="w-8 h-50 absolute left-0 -top-2 text-[2.5rem] font-normal rounded-r-md px-2.5 py-2"></div>
                </div>
              </div>
              <!-- End Email input -->
              <!-- Start Password input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-32">Password</div>
                <div class="relative">
                  <input
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="password" />
                  <div class="w-8 h-50 absolute left-0 -top-2 text-[2.5rem] font-normal rounded-r-md px-2.5 py-2"></div>
                </div>
              </div>
              <!-- End Password input -->
              <!-- End Email input -->
              <!-- Start Confirm Password input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-32">Confirm password</div>
                <div class="relative">
                  <input
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="password" />
                  <div class="w-8 h-50 absolute left-0 -top-2 text-[2.5rem] font-normal rounded-r-md px-2.5 py-2"></div>
                </div>
              </div>
              <!-- End Confirm Password input -->
              <div class="flex justify-center">
                <MyButton>Sign up</MyButton>
              </div>
            </div>
            <!-- End login in-app -->
            <div class="notion-text text-center">
              <div class="pb-5 pt-2">
                Already have an account? <NuxtLink :to="'/login'" class="notion-link">Back to login.</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
