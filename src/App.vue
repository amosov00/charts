<template>
  <v-app>
    <v-dialog
        v-model="dialog"
        persistent
        max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="primary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
      <v-card>
        <v-alert
            type="error"
            color="red"
            v-if="error"
        >{{error}}
        </v-alert>
        <v-card-title>
          <span class="headline">Создать график</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                    label="Тип данных"
                    required
                    dense
                    outlined
                    v-model="type"
                    :items="typeItems"
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-select
                    label="Источник данных"
                    required
                    dense
                    outlined
                    v-model="origin"
                    :items="originItems"
                    :disabled="disabelSelect"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
          >
            Отмена
          </v-btn>
          <v-btn
              color="blue darken-1"
              text
              @click="addChart"
              :loading="loading"
              :disabled="disabelButton"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        text
        @click="dialog = true"
      >
        <span class="mr-2">Создать новый график</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="px-10">
      <v-card class="mb-6" v-for="chart of charts">
        <t-chart :type="chart.type" :data="chart.data"></t-chart>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  data: () => ({
    dialog: false,
    loading: false,
    type: '',
    origin: '',
    typeItems: [
      {text: 'pie', value: 'pie'},
      {text: 'line', value: 'line'}
    ],
    charts: [],
    error: null,
    timer: null
  }),
  computed: {
    disabelSelect() {
      return this.type === ''
    },
    disabelButton() {
      return this.type === '' || this.origin === ''
    },
    originItems() {
      if (this.type === 'pie') {
        return [
          {text: 'группы', value: 'https://run.mocky.io/v3/2699115b-8ced-40c3-8072-b7fa9faf6047'}
        ]
      } else if (this.type === 'line') {
        return [
          {text: 'даты', value: 'https://run.mocky.io/v3/92a0a266-0321-4ff5-9993-b394d03ceee2'}
        ]
      } else {
        return []
      }
    }
  },
  methods: {
    async addChart() {
      try {
        this.loading = true
        const {data} = await axios.get(this.origin)
        this.charts.unshift({
          data,
          type: this.type
        })
        this.loading = false
        this.dialog = false
        this.type = ''
        this.origin = ''
      } catch (e) {
        this.addError(e)
      } finally {
        this.loading = false
      }
    },
    addError(e) {
      if (this.timer) clearTimeout(this.timer)
      this.error = e
      this.timer = setInterval(()=>{
        this.error = null
      }, 5000)
    }
  }
};
</script>
