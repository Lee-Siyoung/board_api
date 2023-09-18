<!-- PostCreate.vue -->
<template>
  <div class="post-create">
    <h2>포스트 생성</h2>
    <input v-model="newPostName" type="text" placeholder="포스트 제목" />
    <textarea v-model="newPostDetail" placeholder="포스트 내용"></textarea>
    <button v-on:click="createPost">포스트 생성</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      board: { id: "", name: "", posts: [] },
      newPostName: "",
      newPostDetail: "",
    };
  },
  methods: {
    async createPost() {
      try {
        const boardId = this.$route.params.boardId;
        const boardResponse = await axios.get(`/boards/${boardId}`);
        this.board = boardResponse.data;
        const response = await axios.post(`/boards/${boardId}/post`, {
          name: this.newPostName,
          detail: this.newPostDetail,
        });
        this.board.posts.push(response.data); // 새로운 게시물 추가
        console.log("Response from server:", this.board);
        this.newPostName = ""; // 입력 필드 초기화
        this.newPostDetail = ""; // 입력 필드 초기화
        console.log("Response from server:", response.data, response);
        // 포스트 생성 후, 이전 페이지로 이동
        this.$router.go(-1); // 이전 페이지로 이동
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
  },
};
</script>

<style></style>
