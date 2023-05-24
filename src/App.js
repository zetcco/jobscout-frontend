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
import Blog from "./components/blog/Blog";
import BlogPost from "./routes/blog/BlogPost";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Messaging } from "./components/profile/Message/Messaging";
import { JoinRequestList } from "routes/profile/organization/JoinRequestList";
import ConversationMessaging from "components/profile/Message/ConversationMessaging";
import CreateBlogPostForm from "components/blog/CreateBlogPostForm";
import BlogPostContent from "components/blog/BlogPostContent";
import RecommendationRequestsPage from "routes/recommendations/RecommendationRequests";
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
import AddRecommendationForm from "components/recommendation/AddRecommendationForm";
import { Meet } from "components/meeting/Meet";
import { Questionaries } from "components/authentication/user/job_seeker/questionaries/Questionaries";
import { QuestionDetail } from "components/authentication/user/job_seeker/questionaries/QuestionDetail";
import { AddQuestionary } from "components/authentication/user/job_seeker/questionaries/AddQuestionary";
import { EditQuestionary } from "components/authentication/user/job_seeker/questionaries/EditQuestionary";
import { FindPeople } from "routes/profile/FindPeople";
import { ManageJobPosts } from "components/job_postings/ManageJobPosts";
import { JobApplications } from "routes/profile/job_seeker/JobApplications";
import { ProfilePosts } from "routes/profile/job_creator/ProfilePosts";
import { BlogPostEdit } from "components/blog/BlogPostEdit";
import ManageJobPost from "routes/feed/ManageJobPost";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
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
                <Route path="experiences" element={ <PastExperiencesForm/> }/>
                <Route path="intro" element={ <Intro/> }/>
              </Route>
            </Route>
            <Route path="creator">
              <Route path="account" element={ <CreatorSignup/> }/>
              <Route path="profile">
                <Route path="company" element={ <AddCompany/> }/>
              </Route>
            </Route>
          </Route>
          <Route path="Test">
            <Route path="hello" element={ <Test/> }/>
          </Route>
        </Route>
      </Route>

      <Route path="/" element={<ProtectedRoute/>}>

        <Route path="/" element={<NavigationLayout/>}>
          <Route path="home" element={<Home/>}/>

          <Route path="posts" element={<JobPosts/>}/>
          <Route path="posts">
            <Route path=":postId" element={<JobPost/>}/>
            <Route path=":postId/manage" element={<ManageJobPost/>}/>
            <Route path="create" element={<CreateJobPost/>}/>
            <Route path="manage" element={<ManageJobPosts/>}/>
          </Route>

          <Route path="organizations">
            <Route path=":organizationId" element={<OrgJobPosts/>}/>
          </Route>

          <Route path="join-requests" element={<JoinRequestList/>} />

          <Route path="manage">
            <Route path="recommendation" element={<RecommendationRequestsPage />} />
            <Route path="recommendation">
              <Route path=":requesterId" element={<AddRecommendationForm/>}/>
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<NavigationLayout/>}>
          <Route path="blog" element={<Blog/>}/>
          <Route path="blog">
            <Route path="add" element={<CreateBlogPostForm/>}/>
            <Route path="post" element={<BlogPost/>}>
              <Route path=":postId" element={<BlogPostContent/>}/>
            </Route> 
            <Route path="edit">
              <Route path=":postId" element={<BlogPostEdit/>}/>
            </Route>
          </Route>
        </Route>

        <Route path="/" element={<NavigationLayout/>}>
          <Route path="people" element={<FindPeople/>}/>
        </Route>

        <Route path="/" element={<NavigationLayout noRouteAnimation/>}>
          <Route path="users">
            <Route path="applications" element={<JobApplications/>}/>
            <Route path=":userId" element={<Profile/>}>
              <Route index element={<ProfileAbout/>}/>
              <Route path="skills" element={<ProfileSkills/>}/>
              <Route path="recommendations" element={<ProfileRecommendations/>}/>
              <Route path="qualifications" element={<ProfileQualifications/>}/>
              <Route path="experiences" element={<ProfileExperiences/>}/>
              <Route path="posts" element={<ProfilePosts/>}/>
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

        <Route path="/questionaries" element={ <ProtectedRoute role={"ROLE_JOB_SEEKER"} redirect={"/home"} /> }>
          <Route element={<NavigationLayout />}>
            <Route index element={<Questionaries/>}/>
            <Route path="add" element={<AddQuestionary/>}/>
            <Route path=":questionaryId/edit" element={<EditQuestionary/>}/>
            <Route path=":questionaryId" element={<QuestionDetail/>}/>
          </Route>
        </Route>

        <Route path="/protected" element={ <ProtectedRoute role={"ROLE_JOB_CREATOR"} redirect={"/home"} /> }>
          <Route path="/protected" element={<CreateJobPost/>}/>
        </Route>

        <Route path="/" element={<NavigationLayout sx={{ widht: '100%' }}/>}>
          <Route path="/code" element={<CodingInterview/>}/>
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

