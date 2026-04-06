import type { User } from "@/types/User"
export const useDataTableStore = defineStore("datatableStore", {
  state: () => ({
    users: [] as User[],
  }),
  actions: {
    async fetch() {
      this.users = await $fetch<User[]>(
        "https://jsonplaceholder.typicode.com/users",
      )
    },
  },
})
