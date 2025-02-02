import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { HomeLayout } from "./pages/HomeLayout";
import { Home } from "./pages/Home";
import { Team } from "./pages/Team";
import { Tutorial } from "./pages/Tutorial";
import { Battle } from "./pages/Battle";
import LifemonConsultation from "./pages/LifemonConsultation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="battle/:opponentId" element={<Battle />} />
        <Route element={<HomeLayout />}>
          <Route index path="home" element={<Home />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="team" index element={<Team />} />
        </Route>
        <Route path="/lifemonConsultation/:name" element={<LifemonConsultation />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
