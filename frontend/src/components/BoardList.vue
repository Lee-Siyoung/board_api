<template>
  <div class="app">
    <div class="board-list">
      <h1>게시판 목록</h1>
      <!-- 게시판 이름을 입력할 폼 필드 -->
      <input v-model="newBoardName" type="text" placeholder="게시판 이름" />
      <button @click="createBoard">게시판 생성</button>
      <ul>
        <li v-for="board in boards" :key="board.id">
          <router-link :to="'/boards/' + board.id">{{
            board.name
          }}</router-link>
          (조회수: {{ board.check }})
          <button @click="deleteBoard(board.id)">삭제</button>
          <!-- 삭제 버튼 추가 -->
        </li>
      </ul>
    </div>
    <div class="post-list">
      <h1>포스트 목록</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      boards: [],
      newBoardName: "", // 추가: 게시판 이름을 저장할 데이터
    };
  },
  methods: {
    async fetchBoards() {
      try {
        const response = await axios.get("/boards");
        this.boards = response.data;
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    },
    async createBoard() {
      try {
        const response = await axios.post("/boards", {
          name: this.newBoardName,
        }); // 게시판 이름을 보내기
        this.boards.push(response.data);
        this.newBoardName = ""; // 입력 필드 초기화
      } catch (error) {
        console.error("Error creating board:", error);
      }
    },
    async deleteBoard(boardId) {
      // 삭제 버튼 클릭 시 실행될 함수
      try {
        await axios.delete(`/boards/${boardId}`);
        // 삭제 요청이 성공한 경우, 해당 게시판을 목록에서 제거합니다.
        this.boards = this.boards.filter((board) => board.id !== boardId);
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    },
  },
  mounted() {
    this.fetchBoards();
  },
};
</script>

<style>
.app {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
}
.board-list {
  flex: 1;
  max-width: 250px;
  height: 100vh;
  overflow-y: auto;
  border: 1px solid #000000;
  padding: 20px;
  margin-right: 20px;
}
.post-list {
  flex: 1;
  padding: 20px;
  border: 1px solid #000000;
  height: 100vh;
}
</style>
