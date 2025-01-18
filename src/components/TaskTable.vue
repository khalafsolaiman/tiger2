<template>
  <q-table :rows="tasks" :columns="columns" row-key="id" :pagination="pagination">
    <template v-slot:top-right>
      <q-btn label="Add Task" @click="openAddTaskDialog" color="primary" />
    </template>
  </q-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import { Task } from '../types/task'
import { QTable, QBtn } from 'quasar'

export default defineComponent({
  name: 'TaskTable',
  components: { QTable, QBtn },
  setup() {
    const taskStore = useTaskStore()
    const columns = [
      { name: 'title', label: 'Title', align: 'left', field: 'title' },
      { name: 'status', label: 'Status', align: 'center', field: 'status' },
      { name: 'priority', label: 'Priority', align: 'center', field: 'priority' },
    ]

    const pagination = { rowsPerPage: 5 }

    taskStore.fetchTasks()

    return { tasks: taskStore.tasks, columns, pagination }
  },
})
</script>
