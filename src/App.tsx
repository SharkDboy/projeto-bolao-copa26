import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import EnterNamePage from "./pages/EnterNamePage";
import MatchesPage from "./pages/MatchesPage";
import RankingPage from "./pages/RankingPage";

export default function App() {
  return (
    <Routes>
      <Route path="/entrar" element={<EnterNamePage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/partidas" element={<MatchesPage />} />
          <Route path="/ranking" element={<RankingPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/entrar" replace />} />
    </Routes>
  );
}
