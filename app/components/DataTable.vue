<template>
  <v-data-table :items="items">
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>

        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
        <td>
          {{ item.address.street }}, {{ item.address.suite }} -
          {{ item.address.city }}
        </td>

        <td>{{ item.phone }}</td>
        <td>{{ item.website }}</td>
        <td>{{ item.company.name }}</td>
      </tr>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import type { User } from "@/types/User"
const { data: items } = await useFetch<User[]>(
  "https://jsonplaceholder.typicode.com/users",
)
</script>
