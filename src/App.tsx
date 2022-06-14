import {FC, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import {useAppSelector} from "./hooks/store/useAppSelector";
import StartPage from "./pages/StartPage";

const App: FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path="/:id" element={<StartPage />} />
          </Route>
          <Route path="/kek" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
