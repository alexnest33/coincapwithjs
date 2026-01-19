import { Route, Routes } from "react-router";
import CoinDetailsPage from "./pages/CoinDetailsPage";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="coin/:slug" element={<CoinDetailsPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
