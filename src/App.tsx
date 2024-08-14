import { useEffect, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import BlogPostList from "./components/BlogPostList";
import { BlogPost } from "./types";
import BlogPostDetails from "./components/BlogPostDetails";
import NewBlogPost from "./components/NewBlogPost";
import EditBlogPost from "./components/EditBlogPost";
import blogPostService from "./services/blogPostService";
import ResponsiveAppBar from "./components/NavBar";

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const handlePostUpdate = (updatedPosts: BlogPost[]) => {
    setPosts(updatedPosts);
  };

  useEffect(() => {  
    blogPostService.loadAndStoreInitialData();
    const fetchedPosts = blogPostService.getBlogPosts();    
    setPosts(fetchedPosts);
  }, []);

  return (    
    <Router>
    <ResponsiveAppBar/>
      <Routes>     
        <Route
          path="/"
          element={<BlogPostList posts={posts} updatePosts={handlePostUpdate} />}
        />
        <Route path="/posts/:id" element={<BlogPostDetails />} />
        <Route path="/new-post" element={<NewBlogPost updatePosts={handlePostUpdate} />} />
        <Route path="/edit-post/:id" element={<EditBlogPost  />} />
      </Routes>
    </Router>
  );
}

export default App;
