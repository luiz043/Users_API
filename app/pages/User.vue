<template>
  <v-container>
    <v-row v-if="loading" align="center" justify="center" class="h-full">
      <v-progress-circular indeterminate color="primary" size="64" />
    </v-row>
    <template v-else-if="taskStore.cache[userId]?.user">
      <v-row class="mb-4">
        <v-col cols="12">
          <v-card rounded="lg" elevation="2">
            <v-card-item>
              <template #prepend>
                <v-avatar color="primary" size="56">
                  <span class="text-title-large text-white">{{
                    initials
                  }}</span>
                </v-avatar>
              </template>
              <v-card-title class="text-title-large">{{
                taskStore.cache[userId]?.user.name
              }}</v-card-title>
              <v-card-subtitle
                >@{{ taskStore.cache[userId]?.user.username }}</v-card-subtitle
              >
            </v-card-item>

            <v-card-text>
              <div class="d-flex justify-space-around text-body-medium">
                <div class="d-flex gap-2 align-center">
                  <v-icon color="primary">mdi-email-outline</v-icon>
                  <span>{{ taskStore.cache[userId]?.user.email }}</span>
                </div>

                <div class="d-flex gap-2 align-center">
                  <v-icon color="primary">mdi-phone-outline</v-icon>
                  <span>{{ taskStore.cache[userId]?.user.phone }}</span>
                </div>

                <div class="d-flex gap-2 align-center">
                  <v-icon color="primary">mdi-domain</v-icon>
                  <span>{{ taskStore.cache[userId]?.user.name }}</span>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-card rounded="lg" elevation="2">
            <v-card-item>
              <v-card-title>
                <v-icon class="mr-2">mdi-checkbox-marked-circle-outline</v-icon>
                Tarefas
              </v-card-title>

              <template #append>
                <v-chip-group v-model="filter" mandatory>
                  <v-chip value="all" filter>Todas</v-chip>
                  <v-chip value="pending" filter color="warning"
                    >Pendentes</v-chip
                  >
                  <v-chip value="completed" filter color="success"
                    >Concluídas</v-chip
                  >
                </v-chip-group>
              </template>
            </v-card-item>

            <v-card-text>
              <v-text-field
                v-model="search"
                placeholder="Buscar tarefa..."
                prepend-inner-icon="mdi-magnify"
                variant="outlined"
                density="compact"
                clearable
                class="mb-3"
                hide-details
              />

              <v-row class="mb-4" density="comfortable">
                <v-col cols="4">
                  <v-sheet rounded="lg" class="text-center pa-3">
                    <div class="text-display-small">{{ todos.length }}</div>
                    <div class="text-medium-emphasis text-title-medium">
                      Total
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="4">
                  <v-sheet
                    rounded="lg"
                    color="success-darken-1"
                    class="text-center pa-3"
                  >
                    <div class="text-display-small">
                      {{ completedCount }}
                    </div>
                    <div class="text-medium-emphasis text-title-medium">
                      Concluídas
                    </div>
                  </v-sheet>
                </v-col>
                <v-col cols="4">
                  <v-sheet
                    rounded="lg"
                    color="warning-darken-1"
                    class="text-center pa-3"
                  >
                    <div class="text-display-small">
                      {{ pendingCount }}
                    </div>
                    <div class="text-caption text-medium-emphasis">
                      Pendentes
                    </div>
                  </v-sheet>
                </v-col>
              </v-row>

              <v-list lines="one" rounded="lg" border>
                <template v-if="filteredTodos.length">
                  <v-list-item
                    v-for="todo in filteredTodos"
                    :key="todo.id"
                    :title="todo.title"
                    rounded="lg"
                  >
                    <template #prepend>
                      <v-icon :color="todo.completed ? 'success' : 'warning'">
                        {{
                          todo.completed
                            ? "mdi-check-circle"
                            : "mdi-clock-outline"
                        }}
                      </v-icon>
                    </template>
                    <template #append>
                      <v-chip
                        :color="todo.completed ? 'success' : 'warning'"
                        size="small"
                        variant="tonal"
                      >
                        {{ todo.completed ? "Concluída" : "Pendente" }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </template>

                <v-list-item v-else>
                  <v-list-item-title
                    class="py-4 text-medium-emphasis text-center"
                  >
                    Nenhuma tarefa encontrada.
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <v-alert v-else type="error" text="Erro ao carregar dados do usuário." />
  </v-container>
</template>

<script setup lang="ts">
interface Todo {
  id: string
  title: string
  completed: boolean
}

interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  company: { name: string }
  todos: { data: Todo[] }
}

const route = useRoute()
const userId = computed(() => route.params.id as string)

const taskStore = useTaskStore()
const loading = ref(false)

watch(
  userId,
  async (newId) => {
    loading.value = true
    await taskStore.fetch(newId)
    loading.value = false
  },
  { immediate: true },
)

const search = ref("")
const filter = ref<"all" | "pending" | "completed">("all")

const todos = computed(() => taskStore.cache[userId.value]?.todos)
const initials = computed(
  () =>
    taskStore?.cache[userId.value]?.user.name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "",
)

const completedCount = computed(
  () => todos.value.filter((t) => t.completed).length,
)
const pendingCount = computed(
  () => todos.value.filter((t) => !t.completed).length,
)

const filteredTodos = computed(() => {
  let list = todos.value

  if (filter.value === "completed") list = list.filter((t) => t.completed)
  if (filter.value === "pending") list = list.filter((t) => !t.completed)

  if (search.value) {
    const q = search.value.toLowerCase()
    list = list.filter((t) => t.title.toLowerCase().includes(q))
  }

  return list
})
</script>
