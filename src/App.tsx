import {FC} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  useLocation,
} from "react-router-dom";

import Layout from "./components/Layout/Layout";
import StartPage from "./pages/StartPage";

const App: FC = () => {
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
