import { createApp } from "vue";
import Shortener from "./Shortener.vue";

const App = {
  components: {
    Shortener,
  },
  template: `
    <div style="min-height: 100vh; display: flex; flex-direction: column;">
      <div style="flex: 1; padding: 2rem; text-align: center;">
        <h2>URL Shortener Development Mode</h2>
      </div>
      <Shortener />
    </div>
  `,
};

const app = createApp(App);
app.mount("#app");
