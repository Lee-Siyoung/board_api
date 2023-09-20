<template>
  <div class="post-create">
    <h2>포스트 생성</h2>
    <input v-model="state.newPostName" type="text" placeholder="포스트 제목" />
    <textarea
      v-model="state.newPostDetail"
      placeholder="포스트 내용"
    ></textarea>
    <button @click="createPost">포스트 생성</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const router = useRouter();
    const state = reactive({
      board: {
        posts: [],
      },
      newPostName: "",
      newPostDetail: "",
    });

    const createPost = () => {
      const boardId = route.params.boardId;
      axios
        .post(`/boards/${boardId}/post`, {
          name: state.newPostName,
          detail: state.newPostDetail,
        })
        .then((res) => {
          state.board.posts.push(res.data);
          state.newPostName = "";
          state.newPostDetail = "";
          router.go(-1);
        })
        .catch((error) => {
          console.error("Error creating post:", error);
        });
    };

    return {
      createPost,
      state,
    };
  },
};
</script>

<style></style>
