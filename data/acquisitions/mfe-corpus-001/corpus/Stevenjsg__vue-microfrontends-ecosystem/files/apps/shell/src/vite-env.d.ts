// apps/shell/src/vite-env.d.ts (o remotes.d.ts)

declare module "dashboard/Widget" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
