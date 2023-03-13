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
            <div class="text-center notion-title">Login</div>
            <!-- Start login in-app -->
            <div>
              <!-- Start Email input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-32">Email<span class="text-red-500">*</span></div>
                <div class="relative">
                  <input
                    v-model="user.email"
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="email" />
                  <div class="w-8 h-50 absolute left-0 -top-2 text-[2.5rem] font-normal rounded-r-md px-2.5 py-2"></div>
                </div>
              </div>
              <!-- End Email input -->
              <!-- Start Password input -->
              <div class="flex justify-center w-full pb-3 gap-3 items-center">
                <div class="text-md font-semibold whitespace-nowrap w-32">
                  Password<span class="text-red-500">*</span>
                </div>
                <div class="relative">
                  <input
                    v-model="user.password"
                    class="bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[200px] h-8 p-1"
                    type="password" />
                  <div class="w-8 h-50 absolute left-0 -top-2 text-[2.5rem] font-normal rounded-r-md px-2.5 py-2"></div>
                </div>
              </div>
              <!-- End Password input -->
              <div class="pb-3 flex justify-between text-sm h-11">
                <div><a class="notion-link">Forgot password</a></div>
              </div>
              <div class="flex justify-center">
                <MyButton @on-click="login">Login</MyButton>
              </div>
            </div>
            <!-- End login in-app -->
            <div class="notion-text text-center">
              <div class="pb-5 pt-2">
                Don't have an account? <NuxtLink :to="'/signup'" class="notion-link">Create one.</NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useStorage } from 'vue3-storage'
import { isEmpty } from '~~/common/utils'
import userService from '~~/services/user.service'
import urlConstants from '~~/common/urlConstants'
import toast from '@/common/toast-option'

const storage = useStorage()
const router = useRouter()
const user = ref({
  email: '',
  password: '',
})
const msg = ref('')

async function login() {
  if (validate()) {
    await userService
      .login(user.value)
      .then(res => res.json())
      .then(data => {
        const token = data.token
        if (token) {
          storage.setStorageSync('token', token, 600000)
          storage.setStorageSync('userId', data.userId, 600000)
          router.push(urlConstants.endpoints.todo.base)
        }
      })
      .catch(error => {
        toast.toastError('Incorrect email or password')
        console.log(error)
      })
  } else {
    toast.toastError(msg.value)
  }
}
function validate() {
  let result = true
  if (isEmpty(user.value.email)) {
    result = false
  }
  if (isEmpty(user.value.password)) {
    result = false
  }
  if (!result) {
    msg.value = 'Fields with * cannot be skipped.'
  }
  return result
}
</script>
