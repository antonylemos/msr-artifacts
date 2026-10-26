<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <div class="d-flex align-center mb-8">
          <v-icon size="32" color="primary" class="mr-3">mdi-chart-line</v-icon>
          <div>
            <h2 class="text-h5 font-weight-bold">Dashboard</h2>
            <p class="text-body-2 text-medium-emphasis mb-0">Analytics & reports</p>
          </div>
          <v-spacer />
          <v-chip color="orange" variant="tonal" size="small">Vue 3 + Vuetify 3</v-chip>
        </div>

        <!-- KPI cards -->
        <v-row class="mb-6">
          <v-col cols="6" md="3" v-for="kpi in kpis" :key="kpi.label">
            <v-card rounded="lg">
              <v-card-text>
                <div class="d-flex align-center mb-2">
                  <v-icon :color="kpi.color" class="mr-2">{{ kpi.icon }}</v-icon>
                  <span class="text-body-2 text-medium-emphasis">{{ kpi.label }}</span>
                </div>
                <div class="text-h5 font-weight-bold">{{ kpi.value }}</div>
                <div class="text-caption" :class="kpi.trend > 0 ? 'text-success' : 'text-error'">
                  {{ kpi.trend > 0 ? '▲' : '▼' }} {{ Math.abs(kpi.trend) }}% vs last month
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Activity table -->
        <v-card rounded="lg">
          <v-card-title class="pa-6 pb-2">Recent activity</v-card-title>
          <v-table>
            <thead>
              <tr>
                <th>Event</th>
                <th>User</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in activity" :key="row.id">
                <td>{{ row.event }}</td>
                <td>{{ row.user }}</td>
                <td>{{ row.date }}</td>
                <td>
                  <v-chip
                    :color="row.status === 'completed' ? 'success' : row.status === 'pending' ? 'warning' : 'error'"
                    variant="tonal"
                    size="x-small"
                  >
                    {{ row.status }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  user: { type: Object, required: true },
  onLogout: { type: Function, default: () => {} },
})

const kpis = ref([
  { label: 'Revenue', value: '€48,250', trend: 12.4, icon: 'mdi-currency-eur', color: 'success' },
  { label: 'Orders', value: '1,284', trend: 8.1, icon: 'mdi-package-variant', color: 'primary' },
  { label: 'Customers', value: '9,421', trend: 5.3, icon: 'mdi-account-group', color: 'purple' },
  { label: 'Churn rate', value: '2.1%', trend: -0.4, icon: 'mdi-trending-down', color: 'error' },
])

const activity = ref([
  { id: 1, event: 'New subscription', user: 'Alice Martin', date: '2026-05-23', status: 'completed' },
  { id: 2, event: 'Payment failed', user: 'Bob Chen', date: '2026-05-22', status: 'failed' },
  { id: 3, event: 'Plan upgrade', user: 'Carol White', date: '2026-05-22', status: 'completed' },
  { id: 4, event: 'Refund requested', user: 'David Lee', date: '2026-05-21', status: 'pending' },
  { id: 5, event: 'New subscription', user: 'Eva Kowalski', date: '2026-05-21', status: 'completed' },
])
</script>
