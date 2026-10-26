<template>
  <v-app>
    <v-main>
      <v-container class="py-8">
        <div class="d-flex align-center mb-6">
          <v-icon large color="primary" class="mr-3">mdi-cog</v-icon>
          <div>
            <h2 class="text-h5 font-weight-bold">Admin panel</h2>
            <p class="text-body-2 grey--text mb-0">
              Logged in as <strong>{{ user.name }}</strong>
            </p>
          </div>
          <v-spacer />
          <v-chip small color="success" dark>Vue 2 + Vuetify 2</v-chip>
        </div>

        <!-- Stats row -->
        <v-row class="mb-6">
          <v-col cols="6" md="3" v-for="stat in stats" :key="stat.label">
            <v-card>
              <v-card-text class="text-center">
                <div class="text-h4 font-weight-bold primary--text">{{ stat.value }}</div>
                <div class="text-body-2 grey--text">{{ stat.label }}</div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- Users table -->
        <v-card>
          <v-card-title>
            Users
            <v-spacer />
            <v-text-field
              v-model="search"
              prepend-inner-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
              outlined
              dense
            />
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="filteredUsers"
            :items-per-page="5"
          >
            <template #item.status="{ item }">
              <v-chip x-small :color="item.status === 'active' ? 'success' : 'grey'" dark>
                {{ item.status }}
              </v-chip>
            </template>
            <template #item.actions>
              <v-btn icon x-small color="primary">
                <v-icon x-small>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon x-small color="error">
                <v-icon x-small>mdi-delete</v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'AdminApp',
  props: {
    user: { type: Object, required: true },
    onLogout: { type: Function, default: () => {} },
  },
  data() {
    return {
      search: '',
      stats: [
        { label: 'Total users', value: '1,284' },
        { label: 'Active today', value: '347' },
        { label: 'New this month', value: '92' },
        { label: 'Pending review', value: '14' },
      ],
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Role', value: 'role' },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      users: [
        { name: 'Alice Martin', email: 'alice@company.com', role: 'Admin', status: 'active' },
        { name: 'Bob Chen', email: 'bob@company.com', role: 'Editor', status: 'active' },
        { name: 'Carol White', email: 'carol@company.com', role: 'Viewer', status: 'inactive' },
        { name: 'David Lee', email: 'david@company.com', role: 'Editor', status: 'active' },
        { name: 'Eva Kowalski', email: 'eva@company.com', role: 'Viewer', status: 'active' },
        { name: 'Frank Müller', email: 'frank@company.com', role: 'Admin', status: 'inactive' },
      ],
    }
  },
  computed: {
    filteredUsers() {
      const q = this.search.toLowerCase()
      if (!q) return this.users
      return this.users.filter(
        (u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      )
    },
  },
}
</script>
