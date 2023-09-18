<template>
  <div>
    <h2>{{ post.name }} 상세 내용</h2>
    <p>{{ post.detail }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {}, // post 데이터를 저장할 객체를 초기화합니다.
    };
  },
  methods: {
    async fetchPost() {
      try {
        const boardId = this.$route.params.boardId;
        const postId = this.$route.params.postId;
        const response = await axios.get(`/boards/${boardId}/post/${postId}`);
        this.post = response.data; // 가져온 데이터를 post 객체에 할당합니다.
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
  },
  created() {
    this.fetchPost(); // PostDetail 컴포넌트가 생성될 때 데이터를 가져오도록 합니다.
  },
};
</script>
