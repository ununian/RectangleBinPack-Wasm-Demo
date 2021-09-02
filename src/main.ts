import { createApp } from 'vue';
import App from './App.vue';
import naive from 'naive-ui';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import 'virtual:windi.css';
import { createPinia } from 'pinia';

createApp(App).use(naive).use(createPinia()).mount('#app');
