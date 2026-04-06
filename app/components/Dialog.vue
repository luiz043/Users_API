<template>
  <v-dialog v-model="model" max-width="520" :scrim="true">
    <v-card class="user-card" rounded="xl" elevation="0">
      <div class="pb-4 card-header pa-6">
        <div class="d-flex justify-space-between mb-4 align-center">
          <v-chip size="large" variant="tonal">
            {{ filteredArray.id }}
          </v-chip>
          <v-btn
            icon="mdi-close"
            variant="text"
            color="grey"
            @click="model = false"
          />
        </div>

        <div class="d-flex gap-4 align-center">
          <v-avatar size="64" class="avatar-ring" :color="avatarColor">
            <span class="font-weight-bold text-h5 text-white">
              {{ initials }}
            </span>
          </v-avatar>
          <div>
            <h2 class="my-0 ms-5 font-weight-bold text-h6">
              {{ filteredArray.name }}
            </h2>
            <p class="my-0 ms-5 text-medium-emphasis">
              @{{ filteredArray.username }}
            </p>
          </div>
          <div class="ms-auto">
            <v-btn :to="UserId" variant="text" icon="mdi-list-box-outline">
            </v-btn>
          </div>
        </div>
      </div>

      <v-divider />

      <v-card-text class="pa-6">
        <p class="mb-2 font-weight-bold text-grey-lighten-1 text-overline">
          Contato
        </p>
        <v-list density="compact" class="mb-4 rounded-lg pa-0 info-list">
          <v-list-item
            prepend-icon="mdi-email-outline"
            :title="filteredArray.email"
            subtitle="Email"
            class="px-3"
          />
          <v-divider inset />
          <v-list-item
            prepend-icon="mdi-phone-outline"
            :title="filteredArray.phone"
            subtitle="Telefone"
            class="px-3"
          />
          <v-divider inset />
          <v-list-item
            prepend-icon="mdi-web"
            :title="filteredArray.website"
            subtitle="Website"
            class="px-3"
          />
        </v-list>

        <p class="mb-1 font-weight-bold text-grey-lighten-1 text-overline">
          Endereço
        </p>
        <v-list density="compact" class="mb-4 rounded-lg pa-0 info-list">
          <v-list-item
            prepend-icon="mdi-map-marker-outline"
            :title="`${filteredArray.address.street}, ${filteredArray.address.suite}`"
            :subtitle="`${filteredArray.address.city} — ${filteredArray.address.zipcode}`"
            class="px-3"
          />
        </v-list>

        <p class="mb-3 font-weight-bold text-grey-lighten-1 text-overline">
          Empresa
        </p>
        <v-card class="rounded-lg company-card pa-4" variant="flat">
          <div class="d-flex mb-2 align-center">
            <v-icon color="grey-lighten-2" icon="mdi-domain" />
            <span class="ms-2 font-weight-bold text-grey-lighten-1">
              {{ filteredArray.company.name }}
            </span>
          </div>
          <p class="text-body-2 text-grey-darken-1 font-italic">
            "{{ filteredArray.company.catchPhrase }}"
          </p>
        </v-card>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue"
import type { User } from "@/types/User"

const props = defineProps<{
  filteredArray: User
}>()

const UserId = computed(() => "/user/" + props.filteredArray.id)

const model = defineModel<boolean>()

const avatarColors = [
  "indigo-darken-2",
  "deep-purple-darken-2",
  "blue-darken-2",
  "teal-darken-2",
  "cyan-darken-2",
]

const avatarColor = computed(() => {
  return avatarColors[props.filteredArray.id % avatarColors.length]
})

const initials = computed(() => {
  return props.filteredArray.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
})
</script>

<style scoped>
.user-card {
  border: 1px solid rgba(194, 172, 172, 0.06);
}

.avatar-ring {
  box-shadow: 0 0 0 5px rgba(63, 81, 181, 0.3);
}

.info-list {
  border: 1px solid rgba(250, 250, 250, 0.05);
}

.company-card {
  border: 1px solid rgba(255, 255, 255, 0.05);
}
</style>
