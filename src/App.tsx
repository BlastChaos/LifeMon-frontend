import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { HomeLayout } from "./pages/HomeLayout";
import { Home } from "./pages/Home";
import { Team } from "./pages/Team";
import { Tutorial } from "./pages/Tutorial";
import { Battle } from "./pages/Battle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="battle/:opponentId" element={<Battle />} />
        <Route element={<HomeLayout />}>
          <Route index path="home" element={<Home />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="team" index element={<Team />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
