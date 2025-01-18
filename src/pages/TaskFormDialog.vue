<template>
  <q-dialog v-model="dialogVisible">
    <q-card>
      <q-card-section>
        <q-form @submit="submitForm" :loading="loading">
          <q-input v-model="task.title" label="Task Title" maxlength="50" required />
          <q-select v-model="task.status" :options="statusOptions" label="Status" required />
          <q-select v-model="task.priority" :options="priorityOptions" label="Priority" required />
          <q-btn label="Submit" type="submit" color="primary" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useTaskStore } from '../stores/taskStore'
import type { Task } from '../types/task'
import { QDialog, QForm, QInput, QSelect, QBtn } from 'quasar'

export default defineComponent({
  name: 'TaskFormDialog',
  components: { QDialog, QForm, QInput, QSelect, QBtn },
  props: {
    task: Object as () => Task,
    dialogVisible: Boolean,
  },
  setup(props) {
    const taskStore = useTaskStore()
    const task = ref<Task>({ ...props.task })
    const statusOptions = ['Pending', 'In Progress', 'Completed']
    const priorityOptions = ['Low', 'Medium', 'High']
    const loading = ref(false)

    const submitForm = async () => {
      loading.value = true
      // Handle add/edit task logic here
      if (task.value.id) {
        // Edit Task
        await fetch(`/api/tasks/${task.value.id}`, {
          method: 'PUT',
          body: JSON.stringify(task.value),
        })
      } else {
        // Add Task
        await fetch('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(task.value),
        })
      }
      taskStore.fetchTasks()
      loading.value = false
    }

    return { task, statusOptions, priorityOptions, submitForm, loading }
  },
})
</script>
