import { useEffect } from "react";
import { BlogPost, BlogPostListProps } from "../types";
import { Link, useLocation } from "react-router-dom";
import { Grid, Box } from "@mui/material";


const BlogPostList = ({ posts, updatePosts }: BlogPostListProps) => {

  const location = useLocation();
  const fallbackImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8dhiFRyjThKHLVptDswHtHpJs1Cx4CQOZVHQ90I_8eZP6yPuW2dVdF_9jdDr0-T_vd6E&usqp=CAU";

  const handlePostUpdate = (updatedPosts: BlogPost[]) => {
    updatePosts(updatedPosts); // Call the passed-in function
  };

  useEffect(() => {
    const { posts: updatedPosts } = location.state || {};
    if (updatedPosts) {
      handlePostUpdate(updatedPosts); // Update state with navigation data
    }
  }, [location, handlePostUpdate]);

  return (

    <Grid container spacing={2} style={{ marginTop: "5rem" }}>
      {posts.map((post) => (
        <Grid item lg={3} sm={4} xs={12} key={post.id} className="blog-post">
          <Box
            sx={{
              border: "2px solid grey",
              padding: 5,
              margin: 3,
              textAlign: "center",
            }}
          >
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/posts/${post.id}`}
            >
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: "36rem",
                }}
              >
                <h2>{post.title}</h2>
                <img
                  width={250}
                  height={250}
                  className="blogImage"
                  src={post.imgUrl ? post.imgUrl : fallbackImage}
                  alt="blogImage"
                />
                <p>{post.content}</p>
              </div>
            </Link>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default BlogPostList;
