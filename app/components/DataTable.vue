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
      hover
      :items-per-page-options="[
        { value: 5, title: '5' },
        { value: 10, title: '10' },
      ]"
      :items-per-page="itemsPerPage"
      :search="searchRef"
      items-per-page-text="Items por pagina"
      :headers="headers"
      :items="dataTable.users"
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

const searchRef = ref("")
const itemsPerPage = ref(5)
const dialogRef = ref<boolean>()
const filteredArray = ref<User>()

const dataTable = useDataTableStore()

await callOnce(() => dataTable.fetch())

const openDialog = (id: number) => {
  dialogRef.value = true
  filteredArray.value = dataTable.users.filter((item) => item.id == id)[0]
}

const headers = [
  { title: "ID", key: "id" },
  { title: "Usuario", key: "username" },
  { title: "Telefone", key: "phone" },
  { title: "Site", key: "website" },
]
</script>
<style>
.hover {
  cursor: pointer;
}
</style>
