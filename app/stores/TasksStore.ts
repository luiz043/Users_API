import type { User } from "@/types/User"
import type { Todos } from "@/types/Todos"

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    cache: {} as Record<string, { user: User; todos: Todos[] }>,
  }),
  actions: {
    async fetch(userId: string) {
      if (this.cache[userId]) return
      const result = await $fetch<any>("https://graphqlzero.almansi.me/api", {
        method: "POST",
        body: {
          query: `
            query GetUserWithTodos($id: ID!) {
              user(id: $id) {
                id
                name
                username
                email
                phone
                company { name }
                todos {
                  data {
                    id
                    title
                    completed
                  }
                }
              }
            }
          `,
          variables: { id: userId },
        },
      })

      this.cache[userId] = {
        user: result.data.user,
        todos: result.data.user.todos.data,
      }
    },
  },
})
