import { createApp } from 'vue';
import App from './App.vue';

import PageHome from './pages/Home';
import DemoComponent from './components/DemoComponent';

const app = createApp(App);
app.component('page-home', PageHome);
app.component('demo-component', DemoComponent);
app.mount('#app');
