import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '../types/task'

export const useTaskStore = defineStore('taskStore', () => {
  const tasks = ref<Task[]>([])
  const loading = ref<boolean>(false)

  // Fetch tasks from the mock API
  const fetchTasks = async () => {
    loading.value = true
    try {
      const response = await fetch('/api/tasks')
      tasks.value = await response.json()
    } catch (error) {
      console.error('Error fetching tasks:', error)
    } finally {
      loading.value = false
    }
  }

  return { tasks, fetchTasks, loading }
})
