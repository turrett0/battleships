import {FC} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {requireServerPing} from "./api/socketIO/actions";
import Layout from "./components/Layout/Layout";
import StartPage from "./pages/StartPage";

requireServerPing(1);
const App: FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<StartPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
