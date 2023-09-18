<template>
  <div class="app">
    <div class="board-list">
      <h1>게시판 목록</h1>
      <!-- 게시판 이름을 입력할 폼 필드 -->
      <input v-model="newBoardName" type="text" placeholder="게시판 이름" />
      <button @click="createBoard">게시판 생성</button>
      <ul>
        <li v-for="board in boards" :key="board.id">
          <div v-if="!board.isEditing">
            <router-link :to="'/boards/' + board.id">{{
              board.name
            }}</router-link>
            <div class="button-group">
              <button @click="startEditing(board)">수정</button>
              <button @click="deleteBoard(board.id)">삭제</button>
            </div>
          </div>
          <div v-else>
            <input
              v-model="board.editedName"
              type="text"
              placeholder="수정된 게시판 이름"
            />
            <button @click="saveEdit(board)">저장</button>
          </div>
        </li>
      </ul>
    </div>
    <div class="post-list">
      <h2>{{ board.name }} 게시판</h2>
      <ul>
        <li v-for="post in board.posts" :key="post.id">
          <router-link :to="'/boards/' + board.id + '/post/' + post.id">{{
            post.name
          }}</router-link>
          (조회수: {{ post.check }})
          <button @click="deletePost(post.id)">삭제</button>
        </li>
      </ul>
    </div>
    <!-- 포스트 생성 폼 -->
    <div class="post-create">
      <input v-model="newPostName" type="text" placeholder="포스트 이름" />
      <button @click="createPost">포스트 생성</button>
      <textarea
        v-model="newPostDetail"
        placeholder="포스트 상세 내용"
      ></textarea>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      boards: [],
      board: {
        posts: [],
      },
      newBoardName: "",
      newPostName: "",
      newPostDetail: "",
    };
  },
  methods: {
    async createPost() {
      try {
        const boardId = this.$route.params.boardId;
        const response = await axios.post(`/boards/${boardId}/post`, {
          name: this.newPostName,
          detail: this.newPostDetail,
        });
        this.board.posts.push(response.data);
        this.newPostName = "";
        this.newPostDetail = "";
      } catch (error) {
        console.error("Error creating post:", error);
      }
    },
    async deletePost(postId) {
      try {
        const boardId = this.$route.params.boardId;
        await axios.delete(`/boards/${boardId}/post/${postId}`);
        this.board.posts = this.board.posts.filter(
          (post) => post.id !== postId
        );
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    },
    async createBoard() {
      try {
        // eslint-disable-next-line
        const response = await axios.post("/boards", {
          name: this.newBoardName,
        });
        this.newBoardName = "";

        // 게시판을 생성한 후에 목록을 업데이트합니다.
        await this.fetchBoards();
      } catch (error) {
        console.error("Error creating board:", error);
      }
    },
    async deleteBoard(boardId) {
      try {
        // 게시판 삭제 요청을 서버로 보냅니다.
        await axios.delete(`/boards/${boardId}`);

        // 삭제가 성공하면 화면에서 해당 게시판을 제거합니다.
        this.boards = this.boards.filter((board) => board.id !== boardId);
      } catch (error) {
        console.error("Error deleting board:", error);
      }
    },
    startEditing(board) {
      // 게시판 수정 시작
      board.isEditing = true;
      board.editedName = board.name; // 수정 전 게시판 이름 저장
    },
    async saveEdit(board) {
      try {
        // 서버에 수정된 게시판 정보 업데이트 요청 보내기
        await axios.put(`/boards/${board.id}`, {
          name: board.editedName,
        });

        // 수정 후 입력 필드 숨기고 수정된 이름으로 업데이트
        board.name = board.editedName;
        board.isEditing = false;
      } catch (error) {
        console.error("Error saving board edit:", error);
      }
    },

    async fetchBoard() {
      // 게시판 정보를 가져오는 메서드
      try {
        const boardId = this.$route.params.boardId;
        const response = await axios.get(`/boards/${boardId}`);
        this.board = response.data;
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    },
    async fetchBoards() {
      try {
        const response = await axios.get("/boards");
        this.boards = response.data;
      } catch (error) {
        console.error("Error fetching boards:", error);
      }
    },
  },
  created() {
    this.fetchBoards(); // 게시판 목록을 초기에 가져오도록 수정
    this.fetchBoard(); // 게시판 정보를 가져오도록 수정
  },
  watch: {
    // 라우터 파라미터(`boardId`)가 변경될 때마다 `fetchBoard` 메서드를 호출
    $route() {
      this.fetchBoard();
    },
  },
};
</script>

<style>
.post-create {
  flex: 3;
  padding: 20px;
  border: 1px solid #000000;
  height: 100vh;
  width: 50px;
}
.input[type="text"],
.post-create textarea {
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #000000;
  border-radius: 4px;
  height: 70vh;
}
</style>
