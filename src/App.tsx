import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { HomeLayout } from "./pages/HomeLayout";
import { Home } from "./pages/Home";
import { TeamBuilderLayout } from "./pages/TeamBuilderLayout";
import { Team } from "./pages/Team";
import { LifemonList } from "./pages/LifemonList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<HomeLayout />}>
          <Route index path="home" element={<Home />} />
          <Route path="/team-builder" element={<TeamBuilderLayout />}>
            <Route path="team" index element={<Team />} />
            <Route path="lifemon" element={<LifemonList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
