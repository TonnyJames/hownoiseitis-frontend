import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from '@/routes'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

//eCharts
import '@/plugins/echarts'
import './../node_modules/bulma/css/bulma.css'

const app = createApp(App);

const vuetify = createVuetify({
    icons: {
        defaultSet: 'mdi',
    },
    components,
    directives,
})

app.use(router)
app.use(vuetify)
app.mount('#app')
