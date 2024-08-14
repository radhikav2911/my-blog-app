import { Button, Container, Stack, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  imgUrl: string;
}
const EditBlogPost = () => {

  const [post, setPost] = useState<BlogPost | null>(null);
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dhiFRyjThKHLVptDswHtHpJs1Cx4CQOZVHQ90I_8eZP6yPuW2dVdF_9jdDr0-T_vd6E&usqp=CAU";
 
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [imgUrl, setImgUrl] = useState(post?.imgUrl || fallbackImage);

  const { id } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImgUrl(post.imgUrl)
    }
  }, [post]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return; // Ensure a post exists
    // Create updated post object
    const updatedPost: BlogPost = {
      id: post.id,
      title,
      content,
      imgUrl,
      createdAt: post.createdAt, 
    };

    // Find the index of the post to update
    const blogData = localStorage.getItem("blogData");
    if (blogData) {
      const blogDataArray = JSON.parse(blogData);
      const postIndex = blogDataArray.findIndex((p: BlogPost) => p.id === post.id);
      if (postIndex !== -1) {
        blogDataArray[postIndex] = updatedPost;
        // Save updated blogData to local storage 
        localStorage.setItem('blogData', JSON.stringify(blogDataArray));
      }
    }

    
    navigate(`/posts/${post.id}`);
  };

  useEffect(() => {
    if (id) {
      const blogData = localStorage.getItem("blogData");
      if (blogData) {
        const blogDataArray = JSON.parse(blogData);
        let foundPost = blogDataArray.find((post: BlogPost) => String(post.id) === id);
        setPost(foundPost);
      }
    }
  }, [id]);

  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm">
        <Stack spacing={2} mt={5}>
        <label htmlFor="title">Title:</label>
          <TextField
            required
            value={title} onChange={(e) => setTitle(e.target.value)}
            id="outlined-required"
          />

          <label htmlFor="content">Content:</label>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={content} onChange={(e) => setContent(e.target.value)}
          />

          <label htmlFor="image">Image (optional):</label>
          <TextField
            value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}
            id="outlined-required"
          />    

          <Button type="submit" variant="contained" >
            Save Post
          </Button>
          
        </Stack>
      </Container>
    </form>
  );
};

export default EditBlogPost;
