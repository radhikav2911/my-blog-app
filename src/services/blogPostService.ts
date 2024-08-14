import { BlogPost } from "../types";
import blogData from "../blogData";

export const KEY = "blogData";

const loadAndStoreInitialData = () => {
  const storedPosts = localStorage.getItem(KEY);

  if (!storedPosts) {
    localStorage.setItem(KEY, JSON.stringify(blogData));
  }
};

const getBlogPosts = (): BlogPost[] => {
  const storedPosts = localStorage.getItem(KEY);
  return storedPosts ? JSON.parse(storedPosts) : [];
};

const saveBlogPosts = (posts: BlogPost[]) => {
  localStorage.setItem(KEY, JSON.stringify(posts));
};

export default { loadAndStoreInitialData, getBlogPosts, saveBlogPosts };
