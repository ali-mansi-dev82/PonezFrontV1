import React from "react";
import { Routes, Route } from "react-router-dom";
import Index from "./modules/index";
import Posts from "./modules/post/pages/filter/index";
import NewPost from "./modules/post/pages/create/index";
import Post from "./modules/post/pages/find_one/index";
import AuthGuard from "./middleware/AuthGuard";
import TestMui from "./modules/test/index";
//panel
import MyPost from "./modules/my_panel/pages/my_post";
import MySaved from "./modules/my_panel/pages/my_saved";
import MyNotes from "./modules/my_panel/pages/my_notes";
import MyRecent from "./modules/my_panel/pages/recent";
import EditPost from "./modules/post/pages/edit";
//errors
import NotFound from "./modules/error/pages/not_found";
import MyPanel from "./modules/my_panel/pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/s/" element={<Posts />} />
      <Route path="/s/:slug" element={<Posts />} />
      <Route path="/v/:slug" element={<Post />} />
      <Route path="/new" element={<AuthGuard component={<NewPost />} />} />
      <Route path="/my-panel">
        <Route path="" element={<AuthGuard component={<MyPanel />} />} />
        <Route path="my-post" element={<AuthGuard component={<MyPost />} />} />
        <Route
          path="my-post/edit/:slug"
          element={<AuthGuard component={<EditPost />} />}
        />
        <Route path="saved" element={<AuthGuard component={<MySaved />} />} />
        <Route path="notes" element={<AuthGuard component={<MyNotes />} />} />
        <Route path="recent" element={<AuthGuard component={<MyRecent />} />} />
      </Route>
      <Route path="/test" element={<TestMui />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
