import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { NavigationLayout } from "./components/layout/NavigationLayout";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./routes/Home";
import { Login } from "./routes/Login";
import { Signup } from "./routes/Signup";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route path="/" element={<NavigationLayout/>}>
        <Route path="home" element={<Home/>}/>
      </Route>
      <Route path="/">
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
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
