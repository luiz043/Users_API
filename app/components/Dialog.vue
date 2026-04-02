<template>
  <v-dialog v-model="model" max-width="500">
    <v-card title="Dialog">
      <v-card-text>
        {{ props.filteredArray }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close Dialog" @click="model = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup lang="ts">
import type { User } from "@/types/User"

const props = defineProps<{
  filteredArray: User
}>()

const model = defineModel<boolean>()
const headers = [
  { title: "ID", key: "id" },
  // { title: "Nome", key: "name" },
  { title: "Usuario", key: "username" },
  // { title: "Email", key: "email" },
  // { title: "Endereço", key: "address" },
  { title: "Telefone", key: "phone" },
  { title: "Site", key: "website" },
  // { title: "Empresa", key: "company.name" },
]
</script>
