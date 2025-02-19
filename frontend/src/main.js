import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css';


// Import Bootstrap JS (including Popper.js)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// createApp(App).mount('#app');
createApp(App).use(router).mount('#app')
