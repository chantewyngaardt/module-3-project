import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'bootstrap/dist/css/bootstrap.min.css';
import './registerServiceWorker'
import store from './store'

// Import Bootstrap CSS
// import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS (including Popper.js)
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// createApp(App).mount('#app');
createApp(App).use(store).use(router).mount('#app')
