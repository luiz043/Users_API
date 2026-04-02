<template>
  <v-card class="w-100 w-lg-75">
    <template v-slot:text>
      <v-text-field
        v-model="searchRef"
        label="Pesquisa"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
    </template>

    <v-data-table
      @update:expanded="(value) => openDialog(value)"
      expand-on-click
      hover
      :items-per-page-options="[
        { value: 5, title: '5' },
        { value: 10, title: '10' },
      ]"
      :items-per-page="itemsPerPage"
      :search="searchRef"
      items-per-page-text="Items por pagina"
      :headers="headers"
      :items="items"
    >
      <template v-slot:item="{ item }">
        <tr class="hover" @click="openDialog(item.id)">
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.username }}
          </td>
          <td>
            {{ item.phone }}
          </td>
          <td>
            {{ item.website }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-card>
  <Dialog :filtered-array="filteredArray" v-model="dialogRef"></Dialog>
</template>
<script setup lang="ts">
import type { User } from "@/types/User"
import { C } from "vue-router/dist/options-BErt5RTe.cjs"

const searchRef = ref("")

const itemsPerPage = ref(5)
const dialogRef = ref<boolean>()
const filteredArray = ref<User>()

const openDialog = (id: number) => {
  dialogRef.value = true
  filteredArray.value = ref(items.value?.filter((item) => item.id == id)[0])
}

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

const { data: items } = await useFetch<User[]>(
  "https://jsonplaceholder.typicode.com/users",
)

const filtered = ref(items.value?.filter((item) => item.id == 3)[0])

console.log(filtered)
</script>
<style>
.hover {
  cursor: pointer;
}
</style>
