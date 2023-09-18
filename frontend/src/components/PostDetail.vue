<template>
  <div class="post-detail">
    <h2>{{ post.name }} 상세 내용</h2>
    <p class="detail" v-if="!isEditing">{{ post.detail }}</p>
    <div v-else>
      <input
        class="edit-input"
        v-model="editedName"
        type="text"
        placeholder="포스트 제목"
      />
      <textarea
        class="edit-textarea"
        v-model="editedDetail"
        placeholder="포스트 상세 내용"
      ></textarea>
    </div>
    <button v-if="!isEditing" @click="startEditing">수정</button>
    <button v-else @click="saveEdit">저장</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      post: {}, // post 데이터를 저장할 객체를 초기화
      isEditing: false, // 편집 모드 여부를 나타내는 변수
      editedName: "", // 편집 중인 포스트 이름을 저장하는 변수
      editedDetail: "", // 편집 중인 포스트 내용을 저장하는 변수
    };
  },
  methods: {
    async fetchPost() {
      try {
        const boardId = this.$route.params.boardId;
        const postId = this.$route.params.postId;
        const response = await axios.get(`/boards/${boardId}/post/${postId}`);
        this.post = response.data; // 가져온 데이터를 post 객체에 할당
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    },
    startEditing() {
      // 수정 모드 시작
      this.isEditing = true;
      this.editedName = this.post.name; // 편집 중인 제목 초기화
      this.editedDetail = this.post.detail; // 편집 중인 내용 초기화
    },
    async saveEdit() {
      // 수정된 내용 저장
      try {
        const boardId = this.$route.params.boardId;
        const postId = this.$route.params.postId;
        await axios.put(`/boards/${boardId}/post/${postId}`, {
          name: this.editedName,
          detail: this.editedDetail,
        });
        // 수정 완료 후 데이터를 업데이트하고 수정 모드 종료
        this.post.name = this.editedName;
        this.post.detail = this.editedDetail;
        this.isEditing = false;
      } catch (error) {
        console.error("Error saving edit:", error);
      }
    },
  },
  created() {
    this.fetchPost(); // PostDetail 컴포넌트가 생성될 때 데이터를 가져옴
  },
};
</script>

<style>
.detail {
  background-color: #ffffff;
  border: 1px solid #b8b8b8;
  height: 450px;
}
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

.edit-input,
.edit-textarea {
  width: 96%;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
  resize: vertical;
}

.edit-textarea {
  height: 400px;
}

.post-detail button {
  background-color: #696df2;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
