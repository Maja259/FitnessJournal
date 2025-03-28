import { createApp } from 'vue';
import App1 from './App.vue';
import router from './router';


const existingAppElement = document.getElementById('App');
if (existingAppElement) {

    existingAppElement.innerHTML = '';
}

const app = createApp(App1);
app.use(router);
app.mount('#App');

createApp(App1).use(router).mount('#App');