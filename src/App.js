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
import { useResponsive } from "./context/ResponsiveContext";
import ShowCategory from "./modules/category/pages/show";

const App = () => {
  const { isMobile } = useResponsive();

  return (
    <Routes>
      <Route path="/" element={<Index isMobile={isMobile} />} />
      <Route path="/s/" element={<Posts isMobile={isMobile} />} />
      <Route path="/s/:slug" element={<Posts isMobile={isMobile} />} />
      <Route path="/v/:slug" element={<Post isMobile={isMobile} />} />
      <Route
        path="/new"
        element={<AuthGuard component={<NewPost isMobile={isMobile} />} />}
      />
      <Route
        path="/category"
        element={<AuthGuard component={<ShowCategory isMobile={isMobile} />} />}
      />
      <Route path="/my-panel">
        <Route
          path=""
          element={<AuthGuard component={<MyPanel isMobile={isMobile} />} />}
        />
        <Route
          path="my-post"
          element={<AuthGuard component={<MyPost isMobile={isMobile} />} />}
        />
        <Route
          path="my-post/edit/:slug"
          element={<AuthGuard component={<EditPost isMobile={isMobile} />} />}
        />
        <Route
          path="saved"
          element={<AuthGuard component={<MySaved isMobile={isMobile} />} />}
        />
        <Route
          path="notes"
          element={<AuthGuard component={<MyNotes isMobile={isMobile} />} />}
        />
        <Route
          path="recent"
          element={<AuthGuard component={<MyRecent isMobile={isMobile} />} />}
        />
      </Route>
      <Route path="/test" element={<TestMui />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
