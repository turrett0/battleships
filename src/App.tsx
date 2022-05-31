import {FC} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {localStorageWrapper} from "./api/storageAPI";

import Layout from "./components/Layout/Layout";
import StartPage from "./pages/StartPage";

const App: FC = () => {
  console.log(localStorageWrapper.getItem("hui"));

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
          </Route>
          <Route path="/:game" element={<Layout />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
