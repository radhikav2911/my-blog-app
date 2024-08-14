import { useNavigate, useParams } from "react-router-dom";
import { KEY } from "../services/blogPostService";
import { useEffect, useState } from "react";
import { BlogPost } from "../types";
import { Box, Button } from "@mui/material";

const BlogPostDetails = () => {
  const [post, setPost] = useState<BlogPost | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dhiFRyjThKHLVptDswHtHpJs1Cx4CQOZVHQ90I_8eZP6yPuW2dVdF_9jdDr0-T_vd6E&usqp=CAU";

  useEffect(() => {
    if (id) {
      const blogData = localStorage.getItem("blogData");
      if (blogData) {
        const blogDataArray = JSON.parse(blogData);
        let foundPost = blogDataArray.find((post: BlogPost) => String(post.id) === id);
        const localPosts = localStorage.getItem("blogData");
        if (!foundPost && localPosts && JSON.parse(localPosts)) {
          foundPost = JSON.parse(localPosts).find(
            (post: BlogPost) => String(post.id) === id
          );
        }
        setPost(foundPost);
      }
    }
  }, [id]);

  const handleEditPost = () => {
    if (!post) return; // Ensure a post exists
    navigate(`/edit-post/${post.id}`, { state: { post } }); // Pass post data to edit page
  };

  const handleDeletePost = async () => {
    if (!post) return; // Ensure a post exists
    const localPosts = localStorage.getItem("blogData");
    if (localPosts && JSON.parse(localPosts)) {
      const updatedPosts = JSON.parse(localPosts).filter((p: BlogPost) => p.id !== post.id);
      localStorage.setItem(KEY, JSON.stringify(updatedPosts));
      setPost(updatedPosts);
    }
    const updatedPosts = JSON.parse(localStorage.getItem("blogData") || "[]");
    navigate("/", { state: { posts: updatedPosts } });
  };

  return (
    <div>
      <Box display="flex" justifyContent={"center"} >
        <Box width={800} m={4} p={4} sx={{ minheight: '30vw', boxShadow: 3 }}>
          <h1>{post?.title}</h1>
          <img width={400} height={400} src={post?.imgUrl ? post.imgUrl : fallbackImage} alt="blogImage" />
          <p>{post?.content}</p>
          <p>Created at: {post?.createdAt}</p>
          <Box display="flex" margin={"8px"} gap={"8px"}>
            <Button variant="contained" onClick={handleEditPost}>
              Edit
            </Button>
            <Button variant="contained" onClick={handleDeletePost}>
              Delete
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default BlogPostDetails;
