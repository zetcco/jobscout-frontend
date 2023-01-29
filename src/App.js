import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { GridLayout } from "./components/layout/GridLayout";
import { NavigationLayout } from "./components/layout/NavigationLayout";
import { RootLayout } from "./components/layout/RootLayout";
import { JobPost } from "./routes/feed/JobPost";
import { JobPosts } from "./routes/feed/JobPosts";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { CreateJobPost } from "./routes/feed/CreateJobPost";
import { Recommendations } from "./routes/profile/job_seeker/Recommendations";
import { OrgJobPosts } from "./routes/profile/organization/OrgJobPosts";
import { OrganizationProfileCreation } from "./routes/signup/organization/OrganizationProfileCreation";
import { OrganizationSignup } from "./routes/signup/organization/OrganizationSignup";
import { SelectAccountType } from "./routes/signup/SelectAccountType";
import { Test } from "./routes/signup/Test/Test";
import { SeekerSignup } from "./routes/signup/users/job_seeker/SeekerSignup";
import { AddEducationalQualifications } from "./routes/signup/users/job_seeker/AddEducationalQualifications";
import { AddSkills } from "./routes/signup/users/job_seeker/AddSkills";
import { UploadProfilePicture } from "./routes/signup/users/job_seeker/UploadProfilePicture";
import { CreatorSignup } from "./routes/signup/users/job_creator/CreatorSignup";
import Blog from "./routes/blog/Blog";
import BlogPost from "./routes/blog/BlogPost";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>

      <Route path="/" element={<NavigationLayout/>}>
        <Route path="home" element={<Home/>}/>

        <Route path="posts" element={<JobPosts/>}/>
        <Route path="posts">
          <Route path=":postId" element={<JobPost/>}/>
        </Route>
        <Route path="posts">
          <Route path="create" element={<CreateJobPost/>}/>
        </Route>

        <Route path="users">
          <Route path=":userId" element={<Recommendations/>}/>
        </Route>

        <Route path="organizations">
          <Route path=":organizationId" element={<OrgJobPosts/>}/>
        </Route>
      </Route>

      <Route path="/" element={ <GridLayout/> }>
        <Route path="login" element={<Login/>}/>
        <Route path="signup">
          <Route path="type" element={ <SelectAccountType/> }/>
          <Route path="organization">
            <Route path="account" element={ <OrganizationSignup/> }/>
            <Route path="profile" element={ <OrganizationProfileCreation/> }/>
          </Route>
          <Route path="user">
            <Route path="dp" element={ <UploadProfilePicture/> }/>
            <Route path="seeker">
              <Route path="account" element={ <SeekerSignup/> }/>
              <Route path="profile">
                <Route path="skills" element={ <AddSkills/> }/>
                <Route path="qualification" element={ <AddEducationalQualifications/> }/>
              </Route>
            </Route>
            <Route path="creator">
              <Route path="account" element={ <CreatorSignup/> }/>
              <Route path="profile">
                <Route path="company" element={ <AddEducationalQualifications/> }/>
              </Route>
            </Route>
          </Route>
          <Route path="Test">
            <Route path="hello" element={ <Test/> }/>
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<NavigationLayout/>}>
        <Route path="blog" element={<Blog/>}/>
        <Route path="blog" element={<BlogPost/>}/>
      </Route>

    </Route>
))

function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
