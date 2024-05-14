import { createApp } from "vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "@/assets/style/index.scss";
import "virtual:svg-icons-register";
import App from "./App.vue";
import svgIcon from "@/components/SvgIcon/index.vue";
import { registerMicroApps, addGlobalUncaughtErrorHandler } from "qiankun";

createApp(App)
  .use(router)
  .use(ElementPlus)
  .component("svg-icon", svgIcon)
  .mount("#app");

// registerMicroApps(
//   [
//     {
//       name: "childAPP",
//       entry: "http://localhost:9527/",
//       container: "#micorApp",
//       activeRule: "/#/demo",
//       props: {
//         mag: "我是主应用main",
//         domain: "http://localhost:5173/",
//       },
//     },
//   ],
//   {
//     beforeLoad: (app) => {
//       console.log("before load app.name====>>>>>", app.name);
//       return Promise.resolve();
//     },
//     beforeMount: [
//       (app) => {
//         console.log("[LifeCycle] before mount %c%s", "color: green;", app.name);
//         return Promise.resolve();
//       },
//     ],
//     afterMount: [
//       (app) => {
//         console.log("[LifeCycle] after mount %c%s", "color: green;", app.name);
//         return Promise.resolve();
//       },
//     ],
//     afterUnmount: [
//       (app) => {
//         console.log(
//           "[LifeCycle] after unmount %c%s",
//           "color: green;",
//           app.name,
//         );
//         return Promise.resolve();
//       },
//     ],
//   },
// );

// // 添加全局异常捕获
// addGlobalUncaughtErrorHandler((handler) => {
//   console.log("异常捕获", handler);
// });
