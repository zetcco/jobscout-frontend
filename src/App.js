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
import UploadEducationalQualification from './routes/signup/user/UploadEducationalQualification';
import { UploadProfilePicture } from "./routes/signup/user/UploadProfilePicture";
import { UserSignup } from "./routes/signup/users/UserSignup";
import { AddEducationalQualifications } from "./routes/signup/user/AddEducationalQualifications";

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
          <Route path='creation' element={<CreateJobPost />}/>
          <Route path="organization">
            <Route path="account" element={ <OrganizationSignup/> }/>
            <Route path="profile" element={ <OrganizationProfileCreation/> }/>
          </Route>
          <Route path="user">
            <Route path="account" element={ <UserSignup/> }/>
            <Route path="profile">
              <Route path="profilepicture" element={ <UploadProfilePicture/> }/>
              <Route path="qualification" element={ <AddEducationalQualifications/> }/>
            </Route>
          </Route>
          <Route path="Test">
            <Route path="hello" element={ <Test/> }/>
          </Route>
        </Route>
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
