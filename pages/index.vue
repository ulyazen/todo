<template>
  <div
    class="min-w-screen min-h-screen bg-gray-800 flex items-center justify-center px-5 py-5"
  >
    <div
      class="w-full mx-auto rounded-lg border border-gray-700 p-8 lg:py-12 lg:px-14 text-gray-300"
      style="max-width: 800px"
    >
      <div class="mb-10">
        <h1 class="text-2xl font-bold">Todos</h1>
      </div>

      <ul
        class="flex flex-wrap text-sm font-medium text-center text-gray-500 w-full py-4"
      >
        <li class="mr-2">
          <div
            class="inline-block px-6 py-3 rounded-sm border border-gray-800 hover:border-gray-700 cursor-pointer"
            :class="{ 'text-white bg-indigo-800': tab.all }"
            aria-current="page"
            @click="changeTabsAll"
          >
            All
          </div>
        </li>
        <li class="mr-2">
          <div
            class="inline-block px-6 py-3 rounded-sm border border-gray-800 hover:border-gray-700 cursor-pointer"
            :class="{ 'text-white bg-indigo-800': tab.not_completed }"
            @click="changeTabsNotCompleted"
          >
            Not Completed
          </div>
        </li>
        <li class="mr-2">
          <div
            class="inline-block px-6 py-3 rounded-sm border border-gray-800 hover:border-gray-700 cursor-pointer"
            :class="{ 'text-white bg-indigo-800': tab.completed }"
            @click="changeTabsCompleted"
          >
            Completed
          </div>
        </li>
      </ul>

      <div class="mb-10">
        <div v-if="todos.length">
          <ul class="-mx-1">
            <div v-for="(item, index) of data" :key="index">
              <li
                @mouseover="focusItem(item.id)"
                @dblclick="openItem(item.id)"
                class="px-2 py-2 rounded transition-all flex text-md"
                :class="{
                  'bg-indigo-800 pt-6 px-6': item.focused,
                  'bg-gray-700 shadow-lg px-4 py-4 my-10 -mx-2': item.open,
                  'mb-1 cursor-pointer': !item.open,
                }"
              >
                <div class="flex-none w-10 leading-none">
                  <input
                    type="checkbox"
                    :checked="item.checked"
                    @change="onChecked(item.id, $event)"
                  />
                </div>
                <div class="flex-grow max-w-full">
                  <div class="w-full leading-none">
                    <span
                      class="leading-none truncate w-full pr-10"
                      :class="
                        item.title.length ? 'text-gray-100' : 'text-gray-300'
                      "
                      v-show="!item.open"
                    >
                      <div class="flex justify-between">
                        <span>
                          <p class="text-md">
                            {{ item.title || 'New todo...' }}
                          </p>
                          <p class="text-xl">{{ item.notes }}</p>
                        </span>
                        <span>
                          <p>
                            {{
                              item?.completed_at
                                ? `Completed in : ${formatDuration(
                                    item?.completed_at,
                                    item?.added_at
                                  )}`
                                : ''
                            }}
                          </p>
                        </span>
                      </div>
                    </span>
                    <input
                      type="text"
                      v-show="item.open"
                      class="text-md w-full bg-transparent text-gray-300 leading-none focus:outline-none mb-2"
                      v-model="item.title"
                      :id="`titleField${item.id}`"
                      placeholder="New todo..."
                    />
                  </div>
                  <div class="w-full" v-show="item.open">
                    <textarea
                      class="text-md w-full bg-transparent text-gray-300 leading-tight focus:outline-none"
                      rows="10"
                      v-model="item.notes"
                      placeholder="Notes"
                    ></textarea>
                  </div>
                  <div class="w-full flex justify-between" v-show="item.open">
                    <button class="p-1 focus:outline-none">
                      <span>Added : {{ item.added_at?.toLocaleString() }}</span>
                    </button>
                    <button
                      class="p-1 -mr-1 focus:outline-none hover:text-red-300"
                      @click="removeItem(item.id)"
                    >
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </li>
            </div>
          </ul>
        </div>
        <div v-if="!todos.length">
          <p class="text-gray-500">No todos</p>
        </div>
      </div>
      <div class="flex justify-center" v-if="!tab.completed">
        <button
          class="py-1 px-10 border border-gray-800 hover:border-gray-700 rounded leading-none focus:outline-none text-xl"
          @click="addItem()"
        >
          <span>+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTodosStore } from '~/stores/todos'

const store = useTodosStore()

const todos = store.todos


const focusItem = (id: string) => {
  store.focusItem(id)
}

const openItem = (id: string) => {
  store.openItem(id)
}

const defocusItems = () => {
  store.defocusItems()
}

const removeItem = (id: string) => {
  store.removeItem(id)
}

const onChecked = (id: string, event: any) => {
  store.onChecked(id, event)
}

const addItem = () => {
  store.addItem()
}

const formatDuration = (x: any, y: any) => {
  return store.formatDuration(x, y)
}

const changeTabsAll = () => {
  store.changeTabsAll()
}

const changeTabsCompleted = () => {
  store.changeTabsCompleted()
}

const changeTabsNotCompleted = () => {
  store.changeTabsNotCompleted()
}

const data = computed(() => {
  return store.data
})

const tab = computed(() => {
  return store.tabs
})
</script>
