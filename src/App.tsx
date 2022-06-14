import {FC} from "react";
import {Routes, Route, HashRouter} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import StartPage from "./pages/StartPage";

const App: FC = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
            <Route path="/:id" element={<StartPage />} />
          </Route>
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
