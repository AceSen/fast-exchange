import { createRouter, createWebHashHistory } from "vue-router";
import OKXContainer from "@/view/OKXContainer.vue";
import Home from "@/view/Home.vue";

const routes = [
  {
    path: "/",
    component: Home,
    name: "Home",
    children: [
      {
        path: "/exchange/okx",
        name: "OKXContainer",
        component: OKXContainer,
    
      },
    ]
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
