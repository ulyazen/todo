import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import _ from 'lodash'
dayjs.extend(duration)
dayjs.extend(relativeTime)

export interface Todo {
  id: string
  title: string
  notes: string
  checked: boolean
  focused: boolean
  open: boolean
  added_at?: Date
  completed_at?: Date
}

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    tabs: {
      all: true,
      completed: false,
      not_completed: false,
    },
  }),

  getters: {
    data(state) {
      if (state.tabs.all) {
        return state.todos
      } else if (state.tabs.completed) {
        return _.filter(state.todos, (o) => o.checked)
      } else if (state.tabs.not_completed) {
        return _.filter(state.todos, (o) => !o.checked)
      }
      return []
    },
    tab(state){
      return state.tabs
    }
  },

  actions: {
    focusItem(id: string) {
      const item = _.find(this.todos, ['id', id])
      if (!item?.open) {
        this.todos.forEach((item) => {
          item.focused = item.id === id
        })
      }
    },

    openItem(id: string) {
      this.todos.forEach((item) => {
        item.focused = false
        item.open = item.id === id
      })
    },

    defocusItems() {
      this.todos.forEach((item) => {
        item.focused = false
        item.open = false
      })
    },

    removeItem(id: string) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
      setTimeout(() => this.defocusItems(), 10)
    },

    onChecked(id: string, event: any) {
      this.todos.forEach((item) => {
        if (item.id === id) {
          item.checked = item.id === id && event.target.checked
          item.completed_at = new Date()
          item.open = false
        }
      })
    },

    addItem() {
      const newTodo: Todo = {
        id: Date.now().toString() + Math.random(),
        title: '',
        notes: '',
        checked: false,
        focused: false,
        open: false,
        added_at: new Date(),
        completed_at: undefined,
      }
      this.todos.push(newTodo)
      setTimeout(() => this.openItem(newTodo.id), 10)
    },

    changeTabsAll() {
      this.tabs.all = true
      this.tabs.completed = false
      this.tabs.not_completed = false
    },

    changeTabsCompleted() {
      this.tabs.all = false
      this.tabs.completed = true
      this.tabs.not_completed = false
    },

    changeTabsNotCompleted() {
      this.tabs.all = false
      this.tabs.completed = false
      this.tabs.not_completed = true
    },

    formatDuration(x: any, y: any) {
      return x && y
        ? dayjs.duration(x - y, 'milliseconds').format('D[d] H[h] m[m] s[s]')
        : ''
    },
  },
});
