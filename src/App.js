import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { GridLayout } from "./components/layout/GridLayout";
import { NavigationLayout } from "./components/layout/NavigationLayout";
import { RootLayout } from "./components/layout/RootLayout";
import { JobPost } from "./routes/feed/JobPost";
import { JobPosts } from "./routes/feed/JobPosts";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { CreateJobPost } from "./routes/feed/CreateJobPost";
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
import AddCompany from "./routes/signup/users/job_creator/AddCompany";
import Blog from "./routes/blog/Blog";
import BlogPost from "./routes/blog/BlogPost";
import ManageJobPost from "./routes/feed/ManageJobPost";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Messaging } from "./components/profile/Message/Messaging";
import { Meeting } from "components/meeting/Meeting";
import ConversationMessaging from "components/profile/Message/ConversationMessaging";
import PastExperiencesForm from "components/authentication/user/job_seeker/PastExperiencesForm";
import { Intro } from "routes/signup/users/job_seeker/Intro";
import { Profile } from "components/profile/Profile";
import { Typography } from "@mui/material";
import { ProfileRecommendations } from "routes/profile/job_seeker/ProfileRecommendations";
import { ProfileQualifications } from "routes/profile/job_seeker/ProfileQualifications";
import { ProfileAbout } from "routes/profile/job_seeker/ProfileAbout";
import { ProfileExperiences } from "routes/profile/job_seeker/ProfileExperiences";
import { ProfileSkills } from "routes/profile/job_seeker/ProfileSkills";
import { CodingInterview } from "routes/CodingInterview";
import { Meet } from "components/meeting/Meet";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout />}>
      <Route path='/' element={<GridLayout />}>
        <Route path='login' element={<Login />} />
        <Route path='signup'>
          <Route path='type' element={<SelectAccountType />} />
          <Route path='organization'>
            <Route path='account' element={<OrganizationSignup />} />
            <Route path='profile' element={<OrganizationProfileCreation />} />
          </Route>
          <Route path="user">
            <Route path="dp" element={ <UploadProfilePicture/> }/>
            <Route path="seeker">
              <Route path="account" element={ <SeekerSignup/> }/>
              <Route path="profile">
                <Route path="skills" element={ <AddSkills/> }/>
                <Route path="qualification" element={ <AddEducationalQualifications/> }/>
                <Route path="experiences" element={ <PastExperiencesForm/> }/>
                <Route path="intro" element={ <Intro/> }/>
              </Route>
            </Route>
            <Route path='creator'>
              <Route path='account' element={<CreatorSignup />} />
              <Route path='profile'>
                <Route path='company' element={<AddCompany />} />
              </Route>
            </Route>
          </Route>
          <Route path='Test'>
            <Route path='hello' element={<Test />} />
          </Route>
        </Route>
      </Route>

      <Route path='/' element={<ProtectedRoute />}>
        <Route
          path='/'
          element={
            <NavigationLayout
              sx={{ mx: { md: '100px', lg: '250px' }, mt: 4 }}
            />
          }
        >
          <Route path='home' element={<Home />} />

        <Route path="/" element={<NavigationLayout/>}>
          <Route path="home" element={<Home/>}/>

          <Route path="posts" element={<JobPosts/>}/>
          <Route path="posts">
            <Route path=":postId" element={<JobPost/>}/>
            <Route path=":postId/manage" element={<ManageJobPost/>}/>
            <Route path="create" element={<CreateJobPost/>}/>
          </Route>


          <Route path='organizations'>
            <Route path=':organizationId' element={<OrgJobPosts />} />
          </Route>
        </Route>

        <Route path="/" element={<NavigationLayout/>}>
          <Route path="blog" element={<Blog/>}/>
          <Route path="blog">
            <Route path=":blogId" element={<BlogPost/>}/>
          </Route>
        </Route>

        <Route path="/" element={<NavigationLayout noRouteAnimation/>}>
          <Route path="users">
            <Route path=":userId" element={<Profile/>}>
              <Route index element={<ProfileAbout/>}/>
              <Route path="skills" element={<ProfileSkills/>}/>
              <Route path="recommendations" element={<ProfileRecommendations/>}/>
              <Route path="qualifications" element={<ProfileQualifications/>}/>
              <Route path="experiences" element={<ProfileExperiences/>}/>
              <Route path="posts" element={<Typography>Posts</Typography>}/>
              <Route path="gallery" element={<Typography>Gallery</Typography>}/>
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<NavigationLayout sx={{ widht: '100%' }}/>}>
          <Route path="messages-meet" element={<Messaging/>}/>
          <Route path="meet/:link" element={<Meet/>}/>
        </Route>

        <Route path="/" element={<NavigationLayout sx={{ widht: '100%' }}/>}>
          <Route path="messages" element={<ConversationMessaging/>}/>
        </Route>

        <Route path='/' element={<NavigationLayout />}>
          <Route path='messages' element={<ConversationMessaging />} />
        </Route>

        <Route path="/" element={<NavigationLayout sx={{ widht: '100%' }}/>}>
          <Route path="/code" element={<CodingInterview/>}/>
        </Route>

      </Route>
      </Route>
    </Route>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
