<template>
  <div class="w-full flex justify-between pr-1 md:px-4">
    <div class="w-full">
      <CardModal
        v-model="showDeleteModal"
        accept-text="Delete"
        decline-text="Cancel"
        @close-modal="showDeleteModal = false"
        @decline-modal="showDeleteModal = false"
        @confirm-modal="onConfirmDelete()">
        <template #header>
          <SectionTitle title="Confirm delete"></SectionTitle>
        </template>
        <template #body>
          <div class="w-full">Are you sure to delete the <span v-if="isSub">sub</span>task {{ currentTaskTitle }}?</div>
        </template>
      </CardModal>
      <div class="pt-3 pr-2 overflow-x-auto h-full">
        <div class="flex flex-wrap justify-between gap-2 items-center">
          <div class="flex gap-12">
            <div class="text-4xl font-bold">Todo</div>
          </div>
          <MyButton @on-click="openCreate('')">Create Task</MyButton>
        </div>
        <!-- Start tasks section -->
        <section class="pt-5">
          <div class="w-full">
            <div class="w-full">
              <div class="flex flex-wrap justify-start gap-2 items-baseline">
                <div class="flex flex-wrap justify-start gap-2 items-center">
                  <label class="font-semibold">Select date:</label>
                  <VueDatePicker
                    v-model="timerange"
                    :enable-time-picker="false"
                    range
                    :clearable="false"
                    class="w-[260px] z-20"
                    @update:model-value="getTasks()" />
                </div>
                <div class="flex gap-x-1 items-center pt-2">
                  <DropdownMenu id-button="sortBtn" id-menu="sortMenu">
                    <template #button>
                      <div>
                        <span class="pr-2">{{ sortList.at(currentSort) }}</span>
                      </div>
                    </template>
                    <template #menu>
                      <ListGroup class="cursor-pointer w-28 max-h-48 overflow-y-auto">
                        <ListGroupItem
                          v-for="(sort, index) in sortList"
                          :key="index"
                          :class="`${currentSort === index ? 'bg-blue-50 font-bold' : ''}`"
                          class="px-6 py-1 hover:bg-blue-50"
                          @click="onOrderByChange(index)">
                          {{ sort }}</ListGroupItem
                        >
                      </ListGroup>
                    </template>
                  </DropdownMenu>
                  <div class="pb-1 cursor-pointer" @click="onSortChange()">
                    <Icon size="20" :name="isAsc ? 'fa-solid:sort-amount-up-alt' : 'fa-solid:sort-amount-down'" />
                  </div>
                </div>
              </div>
              <!-- Start task list section -->
              <div class="font-semibold cursor-pointer w-full">
                <!--Start task info-->
                <div v-for="task in taskList.filter(t => t.isDelete === false)" :key="task.id">
                  <div class="border-b-2 py-2" @click="openTaskDetails(), viewTask(task)">
                    <div>{{ task.title }}</div>
                    <div class="flex flex-wrap gap-x-6 text-sm">
                      <div class="flex gap-x-2 text-sm items-center pt-2 min-w-[100px]">
                        <div class="bg-yellow-100 px-2 py-1 rounded-lg">{{ task.taskItems.length }}</div>
                        <div>Subtask<span v-if="task.taskItems.length > 1">s</span></div>
                      </div>
                      <div class="flex gap-x-2 text-sm items-center pt-2">
                        <StatusPill class="min-w-[70px]" :color="'p' + task.priority">{{
                          priorities.at(task.priority).name
                        }}</StatusPill>
                      </div>
                      <div class="flex gap-x-2 text-sm items-center pt-2">
                        <StatusPill class="min-w-[72px]" :color="'p' + task.progress">{{
                          statusList.at(task.progress).name
                        }}</StatusPill>
                      </div>
                    </div>
                  </div>
                </div>
                <!--End task info-->
              </div>
              <!-- End task list section -->
            </div>
          </div>
        </section>
        <!-- End tasks section -->
      </div>
    </div>
    <!-- Start side menu section -->
    <div
      id="taskDetailsMenu"
      class="min-w-[350px] h-full py-2 px-2 md:pl-2 md:pr-0 z-30 md:block hidden right-0 absolute top-0 w-52 md:relative">
      <div
        id="taskDetailsMenuSetting"
        class="absolute bottom-2 left-2 rounded-b-2xl bg-gray-50 w-[calc(100%-16px)] md:w-[calc(100%-8px)] flex justify-center gap-x-5 py-3">
        <MyButton
          v-if="!isEmpty(currentTaskId) && (!isSub || !isEmpty(currentTaskItemId))"
          type="outline"
          @on-click="showDeleteModal = true">
          Delete {{ isSub ? 'Subtask' : 'Task' }}
        </MyButton>
        <MyButton :disabled="isDisableSave" @on-click="save()"> Save {{ isSub ? 'Subtask' : 'Task' }} </MyButton>
      </div>
      <div class="py-3 pl-3 pr-2 bg-gray-50 rounded-t-2xl h-[calc(100%-62px)] overflow-auto">
        <!-- Start task information -->
        <div class="text-xl font-semibold flex justify-between">
          <div>
            <span class="cursor-pointer" @click="viewTask(taskList.find(t => t.id === currentTaskId))">Task</span>
            <span v-show="isSub"> > Subtask</span>
          </div>
          <div class="md:hidden cursor-pointer block hover:scale-110 transition ease-in duration-300">
            <Icon name="mi:close" size="20" @click="closeTaskDetails" />
          </div>
        </div>
        <div class="pt-4">
          <label class="font-semibold">Name<span class="text-red-500">*</span></label>
          <MyInput v-model:model-value="currentTaskTitle" type="text" placeholder="Add new task" w="w-full" />
        </div>
        <div class="pt-3">
          <label class="font-semibold">Description</label>
          <textarea
            v-model="currentDescription"
            class="w-full resize-none h-28 bg-white focus:bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
            placeholder="Add desscription"></textarea>
        </div>
        <div class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[80px]">Status<span class="text-red-500">*</span></div>
          <DropdownMenu id-button="statusBtn" id-menu="statusMenu">
            <template #button> {{ statusList.at(currentStatus).name }} </template>
            <template #menu>
              <ListGroup class="cursor-pointer w-28 max-h-48 overflow-y-auto">
                <ListGroupItem
                  v-for="status in statusList"
                  :key="status.value"
                  :class="status.value === currentStatus ? 'bg-blue-50 font-bold' : ''"
                  class="px-2 py-1 hover:bg-blue-50"
                  @click="currentStatus = status.value">
                  {{ status.name }}</ListGroupItem
                >
              </ListGroup>
            </template>
          </DropdownMenu>
        </div>
        <div class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[80px]">Priority<span class="text-red-500">*</span></div>
          <DropdownMenu :id-button="'priorityBtn'" :id-menu="'priorityMenu'">
            <template #button> {{ priorities.at(currentPriority).name }} </template>
            <template #menu>
              <ListGroup class="cursor-pointer w-28 max-h-48 overflow-y-auto">
                <ListGroupItem
                  v-for="priority in priorities"
                  :key="priority.value"
                  :class="priority.value === currentPriority ? 'bg-blue-50 font-bold' : ''"
                  class="px-2 py-1 hover:bg-blue-50"
                  @click="currentPriority = priority.value">
                  {{ priority.name }}</ListGroupItem
                >
              </ListGroup>
            </template>
          </DropdownMenu>
        </div>
        <div class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[80px]">Start date<span class="text-red-500">*</span></div>
          <VueDatePicker v-model="currentStartDate" :clearable="false" class="w-[200px]" />
        </div>
        <div v-if="isSub" class="pt-3 flex gap-x-2 items-center">
          <div class="font-semibold w-[80px]">Due date<span class="text-red-500">*</span></div>
          <VueDatePicker v-model="currentDueDate" :clearable="false" class="w-[200px]" />
        </div>
        <!-- End task information -->
        <!-- Start task item list information -->
        <div v-show="!isSub">
          <div class="flex justify-between items-center pt-4">
            <div class="text-xl font-semibold">Subtasks</div>
            <MyButton :disabled="isEmpty(currentTaskId)" @on-click="openCreateSubTask()">Create Subtask</MyButton>
          </div>
          <!-- Start a task item -->
          <div v-if="subList.length > 0" class="font-normal" @click="isSub = true">
            <div
              v-for="(sub, subIndex) in subList"
              :key="sub.id"
              class="border-b-2 border-gray-300 py-2 pl-3 cursor-pointer"
              @click="viewTaskItem(currentTaskId, subIndex)">
              <div>{{ sub.title }}</div>
              <div class="flex gap-x-6 text-sm">
                <div class="flex gap-x-2 items-center text-red-500">
                  <Icon name="ep:calendar" size="20" />
                  <div class="font-semibold">{{ moment(sub.deadline).format(constants.shortDateFormat) }}</div>
                </div>
                <div class="flex gap-x-2 text-sm items-center">
                  <StatusPill class="min-w-[70px]" color="p3">{{ priorities.at(sub.priority).name }}</StatusPill>
                </div>
                <div class="flex gap-x-2 text-sm items-center">
                  <StatusPill class="min-w-[72px]" color="p1">{{ statusList.at(sub.progress).name }}</StatusPill>
                </div>
              </div>
            </div>
          </div>
          <!-- End a task item -->
        </div>
        <!-- End task item list information -->
      </div>
    </div>
    <!-- End side menu section -->
  </div>
</template>
<script setup>
import { useStorage } from 'vue3-storage'
import { ListGroup, ListGroupItem } from 'flowbite-vue'
import moment from 'moment'
import { isEmpty } from '~~/common/utils'
import taskService from '~~/services/task.service'
import taskItemService from '~~/services/taskItem.service'
import constants from '~~/common/constants'
import toast from '@/common/toast-option'

const storage = useStorage()
const today = ref(new Date())
const showDeleteModal = ref(false)

// Current selected task fields
const currentTaskId = ref('')
const currentTaskItemId = ref('')
const currentTaskTitle = ref('')
const currentDescription = ref('')
const currentDueDate = ref(today.value)
const currentStartDate = ref(today.value)
const timerange = ref([
  moment().subtract(6, 'day').unix() * 1000 + (today.value.getTime() % 1000),
  moment().add(1, 'day').unix() * 1000 + (today.value.getTime() % 1000),
])
const currentPriority = ref(0)
const currentStatus = ref(0)
const isSub = ref(false)
const isAsc = ref(true)

const subList = ref([])
const taskList = ref([])
const priorities = ref(constants.priorities)
const statusList = ref(constants.statusList)
const isDisableSave = computed(() => {
  if (isSub.value) {
    return (
      isEmpty(currentTaskId.value) ||
      isEmpty(currentTaskTitle.value) ||
      new Date(currentDueDate.value).getTime() <= new Date(currentStartDate.value).getTime()
    )
  } else {
    return isEmpty(currentTaskTitle.value)
  }
})
// Handle sort
const currentSort = ref(0)
const sortList = ref(['Priority', 'Status'])

function onSortChange() {
  isAsc.value = !isAsc.value
  taskList.value = taskList.value.reverse()
}

function onOrderByChange(index) {
  currentSort.value = index
  getTasks()
}

// Delete
async function onConfirmDelete() {
  if (isSub.value) {
    await taskItemService
      .deleteTaskItem(currentTaskItemId.value)
      .then(res => res.json())
      .then(async data => {
        toast.toastSuccess('Delete subtask successfully.')
        await getTasks()
        viewTask(taskList.value.find(t => t.id === currentTaskId.value))
      })
  } else {
    await taskService
      .deleteTask(currentTaskId.value)
      .then(res => res.json())
      .then(async data => {
        toast.toastSuccess('Delete task successfully.')
        await getTasks()
        if (taskList.value.length > 0) {
          viewTask(taskList.value.at(0))
        } else {
          openCreate('')
        }
      })
  }
  showDeleteModal.value = false
}

// Save
function save() {
  if (isSub.value) {
    saveTaskItem()
  } else {
    saveTask()
  }
}

async function saveTask() {
  const task = {
    userId: storage.getStorageSync('userId'),
    title: currentTaskTitle.value,
    description: currentDescription.value,
    priority: currentPriority.value,
    progress: currentStatus.value,
    startDate: currentStartDate.value,
  }
  if (currentTaskId.value === '') {
    await taskService
      .createTask(task)
      .then(res => res.json())
      .then(data => {
        if (data.taskid) {
          getTasks()
          toast.toastSuccess('Create task successfully.')
          currentTaskId.value = data.taskid
          console.log(currentTaskId.value)
        }
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    task.id = currentTaskId.value
    await taskService
      .updateTask(task)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          getTasks()
          toast.toastSuccess('Update task successfully.')
        }
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

async function saveTaskItem() {
  const taskItem = {
    taskId: currentTaskId.value,
    title: currentTaskTitle.value,
    description: currentDescription.value,
    priority: currentPriority.value,
    progress: currentStatus.value,
    startDate: currentStartDate.value,
    deadline: currentDueDate.value,
  }
  if (currentTaskItemId.value === '') {
    await taskItemService
      .createTaskItem(taskItem)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          getTasks()
          toast.toastSuccess('Create subtask successfully.')
        }
      })
      .catch(err => {
        console.log(err)
      })
  } else {
    taskItem.id = currentTaskItemId.value
    await taskItemService
      .updateTaskItem(taskItem)
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          getTasks()
          toast.toastSuccess('Update subtask successfully.')
        }
        console.log(data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// On click task or task item
function viewTask(task) {
  isSub.value = false
  currentTaskId.value = task.id
  currentDescription.value = task.description
  currentStartDate.value = new Date(task.startDate)
  currentDueDate.value = task.deadline
  currentPriority.value = task.priority
  currentStatus.value = task.progress
  subList.value = task.taskItems
  currentTaskTitle.value = task.title
}

function viewTaskItem(taskId, taskItemIndex) {
  isSub.value = true
  currentTaskId.value = taskId
  const taskItem = subList.value.at(taskItemIndex)
  currentTaskItemId.value = taskItem.id
  currentDescription.value = taskItem.description
  currentDueDate.value = taskItem.deadline
  currentPriority.value = taskItem.priority
  currentStatus.value = taskItem.progress
  currentTaskTitle.value = taskItem.title
}

// function handle task details side menu on small screen
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

function openCreate(taskId) {
  currentDescription.value = ''
  currentTaskItemId.value = ''
  currentTaskId.value = taskId
  currentDueDate.value = today.value
  currentPriority.value = 0
  currentTaskTitle.value = ''
  currentStartDate.value = today.value
  currentStatus.value = 0
  subList.value = []
  openTaskDetails()
}

function openCreateSubTask() {
  openCreate(currentTaskId.value)
  openTaskDetails()
  isSub.value = true
}

// Get task
async function getTasks() {
  await taskService
    .getTasks(
      currentSort.value,
      isAsc.value,
      new Date(timerange.value.at(0)).getTime(),
      new Date(timerange.value.at(1)).getTime(),
    )
    .then(res => res.json())
    .then(data => {
      if (typeof data.taskList !== 'undefined') {
        taskList.value = data.taskList
      } else {
        taskList.value = []
      }
    })
}

onMounted(() => {
  getTasks()
})
</script>
<style>
.dp__input {
  border-radius: 0.5rem;
}
</style>
