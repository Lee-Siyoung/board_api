const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

app.use(bodyParser.json());

let boards = [
  {
    id: 1,
    name: "게시판 1",
    posts: [],
    check: 0,
  },
  {
    id: 2,
    name: "게시판 2",
    posts: [],
    check: 0,
  },
]; // 초기 게시판 데이터 추가
let nextBoardId = 3;
let postIdsByBoard = {}; // 각 게시판의 게시물 ID를 관리하는 객체

// ---- 게시판 api

// Create 게시판
app.post("/boards", (req, res) => {
  const { name } = req.body;
  const checknum = Object.keys(req.body).length;
  const newBoard = {
    id: nextBoardId,
    name,
    posts: [],
  };
  if (!name || checknum !== 1) {
    return res
      .status(404)
      .json({ message: "Board need one name. {name : your board name}" });
  }
  boards.push(newBoard);
  nextBoardId++;
  res.json(newBoard);
});

// Read 전체 게시판
app.get("/boards", (req, res) => {
  res.json(boards);
});

// READ 하나 게시판
app.get("/boards/:boardId", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const board = boards.find((board) => board.id === boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }
  res.json(board);
});

// UPDATE 하나 게시판
app.put("/boards/:boardId", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const { name } = req.body;
  const checknum = Object.keys(req.body).length;
  const board = boards.find((board) => board.id === boardId);
  if (checknum !== 1 || !name || !board) {
    res.status(404).json({ error: "need fix name. {name:fix name}" });
  }
  board.name = name;
  res.json(board);
});

app.delete("/boards/:boardId", (req, res) => {
  const boardId = parseInt(req.params.boardId);

  // 해당 게시판(boardId)을 찾습니다.
  const boardIndex = boards.findIndex((board) => board.id === boardId);
  if (boardIndex === -1) {
    return res.status(404).json({ message: "Board not found" });
  }

  // 게시판을 삭제합니다.
  boards.splice(boardIndex, 1);

  res.json({ message: "Board deleted successfully" });
});

// --- post api

// Create 게시판 내 포스트
app.post("/boards/:boardId/post", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const { name, detail } = req.body;
  const board = boards.find((board) => board.id === boardId);
  const checknum = Object.keys(req.body).length;
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  } else if (!name || !detail || checknum !== 2) {
    return res.status(404).json({
      message:
        "post need one name, one detail. {name : your post name, detail : post detail}",
    });
  }
  if (!postIdsByBoard[boardId]) {
    postIdsByBoard[boardId] = 1;
  } else {
    postIdsByBoard[boardId]++;
  }
  const newPost = {
    id: postIdsByBoard[boardId], // 게시물 ID를 게시판 별로 고유하게 생성
    name,
    detail,
    check: 0,
  };
  board.posts.push(newPost);
  res.json(newPost);
});

// READ 전체 포스트
app.get("/boards/:boardId/post", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const board = boards.find((board) => board.id === boardId);
  const posts = board.posts || [];
  if (posts.length === 0) {
    res.status(404).json({ error: "post not found" });
  } else {
    res.status(200).json(posts);
  }
});

// READ 개별 포스트
app.get("/boards/:boardId/post/:postId", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const postId = parseInt(req.params.postId);

  // 해당 게시판(boardId)에서 게시물(postId)을 찾습니다.
  const board = boards.find((board) => board.id === boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  // 해당 게시물을 찾습니다.
  const post = board.posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  // 게시물을 반환합니다.
  post.check += 1;
  res.json(post);
});

// UPDATE 개별 포스트
app.put("/boards/:boardId/post/:postId", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const postId = parseInt(req.params.postId);
  const { name, detail } = req.body;
  // 해당 게시판(boardId)에서 게시물(postId)을 찾습니다.
  const board = boards.find((board) => board.id === boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  // 해당 게시물을 찾습니다.
  const post = board.posts.find((post) => post.id === postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.name = name;
  post.detail = detail;
  res.status(201).json(post);
});

// DELETE 개별 포스트
app.delete("/boards/:boardId/post/:postId", (req, res) => {
  const boardId = parseInt(req.params.boardId);
  const postId = parseInt(req.params.postId);

  // 해당 게시판(boardId)에서 게시물(postId)을 찾습니다.
  const board = boards.find((board) => board.id === boardId);
  if (!board) {
    return res.status(404).json({ message: "Board not found" });
  }

  // 해당 게시물을 찾습니다.
  const postIndex = board.posts.findIndex((post) => post.id === postId);
  if (postIndex === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  // 게시물을 삭제합니다.
  board.posts.splice(postIndex, 1);

  res.json({ message: "Post deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
