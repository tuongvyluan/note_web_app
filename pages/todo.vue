<template>
  <div class="w-full flex justify-between px-4">
    <div class="w-full pr-2">
      <div class="pt-3 overflow-x-auto h-full">
        <div class="flex gap-12">
          <div class="text-4xl font-bold">Todo</div>
          <div class="text-2xl font-semibold">2</div>
        </div>
        <!-- Start tasks section -->
        <section class="pt-5">
          <div class="w-full">
            <div class="w-full">
              <div class="flex flex-wrap justify-between gap-2 items-baseline">
                <div class="flex flex-wrap justify-start gap-2 items-center">
                  <label class="font-semibold">Select date:</label>
                  <VueDatePicker v-model="timerange" range class="w-[345px] z-20" />
                </div>
                <MyButton>Create Task</MyButton>
              </div>
              <!-- Start task list section -->
              <div class="font-semibold cursor-pointer w-full">
                <!--Start task info-->
                <div class="border-b-2 py-2" @click="openTaskDetails(), (isSub = false)">
                  <div>Research content ideas</div>
                  <div class="flex flex-wrap gap-x-6 text-sm">
                    <div class="flex gap-x-2 items-center pt-2">
                      <Icon name="ep:calendar" size="20" />
                      <div>02-03-23</div>
                    </div>
                    <div class="flex gap-x-2 text-sm items-center pt-2">
                      <div class="bg-yellow-100 px-2 py-1 rounded-lg">1</div>
                      <div>Subtask</div>
                    </div>
                    <div class="flex gap-x-2 text-sm items-center pt-2">
                      <StatusPill color="p0">HIGH</StatusPill>
                    </div>
                    <div class="flex gap-x-2 text-sm items-center pt-2">
                      <StatusPill color="p1">Progress</StatusPill>
                    </div>
                  </div>
                </div>
                <!--End task info-->
                <!--Start subtasks-->
                <div class="w-full pl-6" @click="openTaskDetails(), (isSub = true)">
                  <div class="border-b-2 py-2 font-semibold cursor-pointer">
                    <div class="text-left flex justify-start">Research content ideas sub</div>
                    <div class="flex flex-wrap gap-x-6 text-sm">
                      <div class="flex gap-x-2 items-center pt-2">
                        <Icon name="ep:calendar" size="20" />
                        <div>02-02-23</div>
                      </div>
                      <div class="flex gap-x-2 text-sm items-center pt-2">
                        <StatusPill color="p3">LOW</StatusPill>
                      </div>
                      <div class="flex gap-x-2 text-sm items-center pt-2">
                        <StatusPill color="p1">Progress</StatusPill>
                      </div>
                    </div>
                  </div>
                </div>
                <!--End subtasks-->
              </div>
              <!-- End task list section -->
            </div>
          </div>
        </section>
        <!-- End tasks section -->
      </div>
    </div>
    <div
      id="taskDetailsMenu"
      class="min-w-[350px] h-full py-2 px-2 md:pr-2 z-40 md:block hidden right-0 absolute top-0 w-52 md:relative">
      <div
        id="taskDetailsMenuSetting"
        class="absolute bottom-2 left-2 rounded-b-2xl bg-gray-50 w-[calc(100%-16px)] flex justify-center gap-x-5 py-3">
        <MyButton type="outline">Delete {{ isSub ? 'Subtask' : 'Task' }}</MyButton>
        <MyButton>Save {{ isSub ? 'Subtask' : 'Task' }}</MyButton>
      </div>
      <div class="py-3 pl-3 pr-2 bg-gray-50 rounded-t-2xl h-[calc(100%-62px)] overflow-auto cursor-pointer">
        <!-- Start task information -->
        <div class="text-xl font-semibold flex justify-between">
          <div><span @click="isSub = false">Task</span><span v-show="isSub"> > Subtask</span></div>
          <div class="md:hidden block hover:scale-110 transition ease-in duration-300">
            <Icon name="mi:close" size="20" @click="closeTaskDetails" />
          </div>
        </div>
        <div class="pt-4">
          <label class="font-semibold">Name</label>
          <MyInput type="text" placeholder="Add new task" :model-value="currentTask" w="w-full" />
        </div>
        <div class="pt-3">
          <label class="font-semibold">Description</label>
          <textarea
            class="w-full resize-none h-28 bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Add desscription"></textarea>
        </div>
        <div class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[72px]">Status</div>
          <DropdownMenu id-button="statusBtn" id-menu="statusMenu">
            <template #button> {{ statusList.at(currentStatus).name }} </template>
            <template #menu>
              <ListGroup class="cursor-pointer max-h-48 overflow-y-auto">
                <ListGroupItem
                  v-for="status in statusList"
                  :key="status.value"
                  :class="status.value === currentStatus ? 'bg-blue-50 font-bold' : ''"
                  class="px-2 py-1 hover:bg-blue-50">
                  {{ status.name }}</ListGroupItem
                >
              </ListGroup>
            </template>
          </DropdownMenu>
        </div>
        <div class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[72px]">Due date</div>
          <VueDatePicker v-model="currentDueDate" class="w-[200px]" />
        </div>
        <div class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[72px]">Priority</div>
          <DropdownMenu :id-button="'priorityBtn'" :id-menu="'priorityMenu'">
            <template #button> {{ priorities.at(currentPriority).name }} </template>
            <template #menu>
              <ListGroup class="cursor-pointer max-h-48 overflow-y-auto">
                <ListGroupItem
                  v-for="priority in priorities"
                  :key="priority.value"
                  :class="priority.value === currentPriority ? 'bg-blue-50 font-bold' : ''"
                  class="px-2 py-1 hover:bg-blue-50">
                  {{ priority.name }}</ListGroupItem
                >
              </ListGroup>
            </template>
          </DropdownMenu>
        </div>
        <!-- End task information -->
        <!-- Start task item list information -->
        <div v-show="!isSub">
          <div class="flex justify-between items-center pt-4">
            <div class="text-xl font-semibold">Subtasks</div>
            <MyButton @click="isSub = true">Create Subtask</MyButton>
          </div>
          <!-- Start a task item -->
          <div class="border-b-2 border-gray-300 py-2 font-normal" @click="isSub = true">
            <div class="pl-3">
              <div>Research content ideas sub</div>
              <div class="flex gap-x-6 text-sm">
                <div class="flex gap-x-2 items-center">
                  <Icon name="ep:calendar" size="20" />
                  <div>02-02-23</div>
                </div>
                <div class="flex gap-x-2 text-sm items-center">
                  <StatusPill color="p3">LOW</StatusPill>
                </div>
                <div class="flex gap-x-2 text-sm items-center">
                  <StatusPill color="p1">Progress</StatusPill>
                </div>
              </div>
            </div>
          </div>
          <!-- End a task item -->
        </div>
        <!-- End task item list information -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ListGroup, ListGroupItem } from 'flowbite-vue'
import constants from '~~/common/constants'
const currentTask = ref('Research content ideas')
const currentDueDate = ref(null)
const timerange = ref(null)
const currentPriority = ref(0)
const currentStatus = ref(1)
const isSub = ref(false)
const priorities = ref(constants.priorities)
const statusList = ref(constants.statusList)

function openTaskDetails() {
  const taskDetailsMenu = document.getElementById('taskDetailsMenu')
  const taskDetailsMenuSetting = document.getElementById('taskDetailsMenuSetting')
  taskDetailsMenu.classList.remove('hidden')
  taskDetailsMenuSetting.classList.remove('hidden')
}

function closeTaskDetails() {
  const taskDetailsMenu = document.getElementById('taskDetailsMenu')
  const taskDetailsMenuSetting = document.getElementById('taskDetailsMenuSetting')
  taskDetailsMenu.classList.add('hidden')
  taskDetailsMenuSetting.classList.add('hidden')
}
</script>
