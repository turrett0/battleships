import {FC} from "react";
import Dock from "./components/Dock/Dock";

import styles from "./styles/GlobalStyles.module.scss";
import UserBoardComponent from "./components/Boards/UserBoardComponent/UserBoardComponent";

const App: FC = () => {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <UserBoardComponent />
      </div>

      <Dock />
    </div>
  );
};

export default App;
