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
        </li>
      </ul>
    </div>
    <div class="post-list">
      <h2>{{ board.name }} 게시판</h2>
      <!-- 게시물 생성 폼 -->
      <div>
        <input v-model="newPostName" type="text" placeholder="게시물 이름" />
        <input
          v-model="newPostDetail"
          type="text"
          placeholder="게시물 상세 내용"
        />
        <button @click="createPost">게시물 생성</button>
      </div>
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
