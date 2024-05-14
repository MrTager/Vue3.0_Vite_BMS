import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";
// import MicroApp from "@/views/micro-app/index.vue";

const routes: Array<any> = [
  {
    path: "/",
    redirect: "/home",
    component: () => import("@/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页",
          icon: "index",
          requiresAuth: true,
        },
      },
      {
        path: "/template",
        name: "template",
        component: () => import("@/views/template/index.vue"),
        meta: {
          title: "模板页",
          icon: "index",
        },
      },
      // {
      //   path: "/demo",
      //   name: "demo",
      //   component: () => import("@/views/micro-app/index.vue"),
      //   meta: {
      //     title: "微前端页",
      //     icon: "index",
      //   },
      // },
      // {
      //   path: "/demo1",
      //   name: "demo1",
      //   component: () => import("@/views/micro-wujie/index.vue"),
      //   meta: {
      //     title: "微前端无界",
      //     icon: "index",
      //   },
      // },
      {
        path: "https://www.baidu.com",
        name: "外链",
        meta: {
          title: "外链页面demo",
          icon: "index",
          isExternal: true,
        },
      },
      {
        path: "/test1",
        name: "test1",
        component: () => import("@/views/test/index.vue"),
        children: [
          {
            path: "/test11",
            name: "test11",
            component: () => import("@/views/home/index.vue"),
            children: [
              {
                path: "/test111",
                name: "test111",
                component: () => import("@/views/home/index.vue"),
                meta: {
                  title: "11111",
                },
              },
            ],
            meta: {
              title: "测试页11",
              icon: "index",
            },
          },
          {
            path: "/test22",
            name: "test22",
            component: () => import("@/views/home/index.vue"),
            meta: {
              title: "测试页22",
              icon: "index",
            },
          },
        ],
        meta: {
          title: "测试页1",
          icon: "index",
        },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/home/index.vue"),
  },
];

const useCreateRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    routes: routes as Array<RouteRecordRaw>,
  });

const router = useCreateRouter();

/**
 * @description 重置路由
 *
 */
export const resetRouter = () => {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
};

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isUserAuthenticated()) {
    next("/login");
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  // 在路由切换后执行的逻辑
});

function isUserAuthenticated() {
  // 实现用户认证检查的逻辑
  // 返回 true 或 false
  return true;
}

export default router;
