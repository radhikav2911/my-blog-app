export interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl: string  | null; // Make imgUrl optional
}

export interface BlogPostListProps {
  posts: BlogPost[];
  updatePosts: any;
}