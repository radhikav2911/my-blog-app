import {  Button, Container, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BlogPost } from "../types";
import { KEY } from "../services/blogPostService";

const NewBlogPost = ({ updatePosts }: { updatePosts: (posts: BlogPost[]) => void }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    console.log(title, content, imgUrl)
    e.preventDefault();

    // Form validation
    if (!title || !content) {
      alert('Please fill in both title and content fields.');
      return;
    }

    // Create new blog post object
    const newBlogPost = {
      id: Math.floor(Math.random() * 100000),
      title,
      content,
      imgUrl: imgUrl || null,
      createdAt: new Date().toLocaleString(),
    };

    // Save new blog post 
    const storedPosts = getBlogPostsFromLocalStorage(); // Retrieve existing posts
    storedPosts.push(newBlogPost);
    saveBlogPostsToLocalStorage(storedPosts);

    // Update the parent component's state
    updatePosts(storedPosts);

    navigate(`/posts/${newBlogPost.id}`); // Redirect to details page after successful creation
  };

  const getBlogPostsFromLocalStorage = (): BlogPost[] => {
    const storedPosts = localStorage.getItem(KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  };

  const saveBlogPostsToLocalStorage = (posts: BlogPost[]) => {
    localStorage.setItem(KEY, JSON.stringify(posts));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Container maxWidth="sm"  >
        <Stack spacing={2} mt={5}>

          <label htmlFor="title">Title (required)</label>
          <TextField
            required
            value={title} onChange={(e) => setTitle(e.target.value)}
            id="outlined-required"
          />

          <label htmlFor="content">Content (required)</label>
          <TextField
            id="outlined-multiline-static"
            multiline
            rows={4}
            value={content} onChange={(e) => setContent(e.target.value)}
          />

          <label htmlFor="image">Image URL (optional)</label>
          <TextField
            value={imgUrl} onChange={(e) => setImgUrl(e.target.value)}
            id="outlined-required"
          />    

          <Button type="submit" variant="contained" >
            Create Post
          </Button>
        </Stack>
      </Container>
    </form>
  );
};




export default NewBlogPost;
