import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { CenteredContent } from "./components/layout/CenteredContent";
import { NavigationLayout } from "./components/layout/NavigationLayout";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { SelectAccountType } from "./routes/signup/SelectAccountType";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>

      <Route path="/" element={<NavigationLayout/>}>
        <Route path="home" element={<Home/>}/>
      </Route>

      <Route path="/" element={<CenteredContent/>}>
        <Route path="login" element={<Login/>}/>
        <Route path="signup">
          <Route path="type" element={ <SelectAccountType/> }/>
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
