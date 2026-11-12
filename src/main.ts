import { createApp } from 'vue'
import App from './App.vue'
import { hideAppLoader } from './utils/appLoader'
import './assets/styles/main.css'

createApp(App).mount('#app')

void hideAppLoader()
