<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <!-- Header -->
        <div class="d-flex align-center mb-8">
          <v-icon size="32" color="primary" class="mr-3">mdi-account-circle</v-icon>
          <div>
            <h2 class="text-h5 font-weight-bold">My profile</h2>
            <p class="text-body-2 text-medium-emphasis mb-0">Manage your account settings</p>
          </div>
          <v-spacer />
          <v-chip color="purple" variant="tonal" size="small">Vue 3 + Vuetify 3</v-chip>
        </div>

        <v-row>
          <!-- Avatar & basic info -->
          <v-col cols="12" md="4">
            <v-card rounded="lg" class="pa-6 text-center">
              <v-avatar size="96" color="primary" class="mb-4">
                <span class="text-h4 text-white">{{ initials }}</span>
              </v-avatar>
              <div class="text-h6 font-weight-semibold">{{ user.name }}</div>
              <div class="text-body-2 text-medium-emphasis mb-4">{{ user.email }}</div>
              <v-chip
                v-for="role in user.roles"
                :key="role"
                size="x-small"
                color="primary"
                variant="tonal"
                class="mr-1"
              >
                {{ role }}
              </v-chip>
            </v-card>
          </v-col>

          <!-- Edit form -->
          <v-col cols="12" md="8">
            <v-card rounded="lg">
              <v-card-title class="pa-6 pb-0">Account details</v-card-title>
              <v-card-text class="pa-6">
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.name"
                      label="Full name"
                      variant="outlined"
                      density="comfortable"
                    />
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      variant="outlined"
                      density="comfortable"
                      type="email"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="form.company"
                      label="Company"
                      variant="outlined"
                      density="comfortable"
                    />
                  </v-col>
                  <v-col cols="12">
                    <v-select
                      v-model="form.timezone"
                      :items="timezones"
                      label="Timezone"
                      variant="outlined"
                      density="comfortable"
                    />
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions class="pa-6 pt-0">
                <v-spacer />
                <v-btn variant="text">Discard</v-btn>
                <v-btn color="primary" variant="flat" @click="save">Save changes</v-btn>
              </v-card-actions>
            </v-card>

            <!-- Preferences -->
            <v-card rounded="lg" class="mt-4">
              <v-card-title class="pa-6 pb-2">Preferences</v-card-title>
              <v-list>
                <v-list-item
                  v-for="pref in preferences"
                  :key="pref.label"
                  :subtitle="pref.description"
                  :title="pref.label"
                >
                  <template #append>
                    <v-switch v-model="pref.value" color="primary" hide-details />
                  </template>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>

        <v-snackbar v-model="saved" color="success">Profile saved!</v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  user: { type: Object, required: true },
  onLogout: { type: Function, default: () => {} },
})

const saved = ref(false)

const initials = computed(() =>
  props.user.name?.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2) ?? '?'
)

const form = ref({
  name: props.user.name,
  email: props.user.email,
  company: 'ACME Corp',
  timezone: 'Europe/Lisbon',
})

const timezones = ['Europe/Lisbon', 'Europe/London', 'America/New_York', 'Asia/Tokyo']

const preferences = ref([
  { label: 'Email notifications', description: 'Receive updates by email', value: true },
  { label: 'Dark mode', description: 'Use dark colour scheme', value: false },
  { label: 'Two-factor auth', description: 'Extra security on login', value: false },
])

function save() {
  saved.value = true
}
</script>
