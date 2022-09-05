import { posts } from '@/api/index';

function fetchPosts() {
  return posts.get('/');
}

function createPost(input) {
  return posts.post('/', input);
}

export { fetchPosts, createPost };
