import { posts } from '@/api/index';

function fetchPosts() {
  return posts.get('/');
}

function fetchPost(input) {
  return posts.get(input);
}

function createPost(input) {
  return posts.post('/', input);
}

function deletePost(input) {
  return posts.delete(input);
}

function editPost(id, input) {
  return posts.put(id, input);
}

export { fetchPosts, fetchPost, createPost, editPost, deletePost };
