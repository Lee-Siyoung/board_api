import { createRouter, createWebHistory } from "vue-router";
import BoardDetail from "../components/BoardDetail.vue";
import BoardList from "../components/BoardList.vue";
import PostDetail from "../components/PostDetail.vue";
const routes = [
  {
    path: "/",
    name: "Boards",
    component: BoardList,
  },
  {
    path: "/boards/:boardId",
    name: "BoardDetail",
    component: BoardDetail,
    props: true,
  },
  {
    path: "/boards/:boardId/post/:postId",
    name: "PostDetail",
    component: PostDetail,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  console.log("Navigating to", to); // 라우팅 정보 로그 출력
  next();
});

export default router;