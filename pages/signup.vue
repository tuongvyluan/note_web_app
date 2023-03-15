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
              <!-- Start first name input -->
              <div class="w-full pb-3">
                <div class="flex justify-center w-full gap-3 items-center">
                  <div class="text-md font-semibold whitespace-nowrap w-36">
                    First Name<span class="text-red-500">*</span>
                  </div>
                  <div class="relative">
                    <input
                      v-model="user.firstName"
                      required=""
                      class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                      type="text" />
                  </div>
                </div>
              </div>
              <!-- Start middle name input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-36">Middle Name</div>
                <div class="relative">
                  <input
                    v-model="user.middleName"
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="text" />
                </div>
              </div>
              <!-- Start last name input -->
              <div class="w-full pb-3">
                <div class="flex justify-center w-full gap-3 items-center">
                  <div class="text-md font-semibold whitespace-nowrap w-36">
                    Last Name<span class="text-red-500">*</span>
                  </div>
                  <div class="relative">
                    <input
                      v-model="user.lastName"
                      required=""
                      class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                      type="text" />
                  </div>
                </div>
              </div>
              <!-- Start phone input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-36">Phone number</div>
                <div class="relative">
                  <input
                    v-model="user.phone"
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="tel" />
                </div>
              </div>
              <!-- Start Email input -->
              <div class="w-full pb-3">
                <div class="flex justify-center w-full gap-3 items-center">
                  <div class="text-md font-semibold whitespace-nowrap w-36">
                    Email<span class="text-red-500">*</span>
                  </div>
                  <div class="relative">
                    <input
                      v-model="user.email"
                      required=""
                      class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                      type="email" />
                  </div>
                </div>
              </div>
              <!-- End Email input -->
              <!-- Start Password input -->
              <div class="w-full pb-3">
                <div class="flex justify-center w-full gap-3 items-center">
                  <div class="text-md font-semibold whitespace-nowrap w-36">
                    Password<span class="text-red-500">*</span>
                  </div>
                  <div class="relative">
                    <input
                      v-model="user.password"
                      required=""
                      class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                      type="password" />
                  </div>
                </div>
              </div>
              <!-- End Password input -->
              <!-- End Email input -->
              <!-- Start Confirm Password input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-36">
                  Confirm password<span class="text-red-500">*</span>
                </div>
                <div class="relative">
                  <input
                    v-model="confirmPassword"
                    required=""
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="password" />
                </div>
              </div>
              <!-- End Confirm Password input -->
              <div class="flex justify-center">
                <MyButton :disabled="!validate" @on-click="signup">Sign up</MyButton>
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
<script setup>
import userService from '~~/services/user.service'
import urlConstants from '~~/common/urlConstants'
import toast from '@/common/toast-option'
import { isEmpty } from '~~/common/utils'

const router = useRouter()
const confirmPassword = ref('')
const user = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  middleName: '',
  birthday: new Date(),
  phone: '',
  createdAt: new Date(),
  updatedAt: new Date(),
})

const msg = ref('')
async function signup() {
  const validateResult = validate
  if (validateResult) {
    await userService
      .createUser(user.value)
      .then(res => res.json())
      .then(data => {
        if (data.id) {
          toast.toastSuccess('Create user successfully.')
          router.push(urlConstants.endpoints.login.base)
        }
      })
  } else {
    toast.toastError(msg.value)
  }
}
const validate = computed(() => {
  let result = true
  if (isEmpty(user.value.firstName)) {
    result = false
  }
  if (isEmpty(user.value.lastName)) {
    result = false
  }
  if (isEmpty(user.value.email)) {
    result = false
  }
  if (isEmpty(user.value.password)) {
    result = false
  }
  if (isEmpty(confirmPassword.value)) {
    result = false
  }
  if (!result) {
    msg.value = 'Fields with * cannot be skipped. '
  }
  if (user.value.password !== confirmPassword.value) {
    msg.value += 'Password and confirmed password do not match. '
    result = false
  }
  return result
})
</script>
