<template>
  <div class="post-detail">
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

<style>
.post-detail {
  width: 600px;
  height: 80vh;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.post-detail h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.post-detail p {
  font-size: 16px;
}
</style>
