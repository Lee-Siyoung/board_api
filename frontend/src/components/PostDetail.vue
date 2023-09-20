<template>
  <div class="post-detail">
    <h2>{{ state.post.name }} 상세 내용</h2>
    <p class="detail" v-if="!state.isEditing">{{ state.post.detail }}</p>
    <div v-else>
      <input
        class="edit-input"
        v-model="state.editedName"
        type="text"
        placeholder="포스트 제목"
      />
      <textarea
        class="edit-textarea"
        v-model="state.editedDetail"
        placeholder="포스트 상세 내용"
      ></textarea>
    </div>
    <button v-if="!state.isEditing" @click="startEditing">수정</button>
    <button v-else @click="saveEdit">저장</button>
  </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      post: {
        name: "",
        detail: "",
      },
      isEditing: false,
      editedName: "",
      editedDetail: "",
    });

    const fetchPost = async () => {
      const boardId = route.params.boardId;
      const postId = route.params.postId;
      await axios
        .get(`/boards/${boardId}/post/${postId}`)
        .then((res) => {
          state.post.name = res.data.name;
          state.post.detail = res.data.detail;
        })
        .catch((error) => {
          console.error("Error fetching post:", error);
        });
    };

    const startEditing = () => {
      // 수정 모드 시작
      state.isEditing = true;
      state.editedName = state.post.name;
      state.editedDetail = state.post.detail;
    };

    const saveEdit = async () => {
      // 수정된 내용 저장
      const boardId = route.params.boardId;
      const postId = route.params.postId;
      await axios
        .put(`/boards/${boardId}/post/${postId}`, {
          name: state.editedName,
          detail: state.editedDetail,
        })
        .then(() => {
          state.post.name = state.editedName;
          state.post.detail = state.editedDetail;
          state.isEditing = false;
        })
        .catch((error) => {
          console.error("Error saving edit:", error);
        });
    };

    onMounted(() => {
      fetchPost();
    });

    return {
      startEditing,
      saveEdit,
      state,
    };
  },
};
</script>

<style scoped>
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
