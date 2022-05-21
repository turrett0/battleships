import {FC} from "react";
import Dock from "./components/Dock/Dock";

import styles from "./styles/GlobalStyles.module.scss";
import UserBoardComponent from "./components/Boards/UserBoardComponent/UserBoardComponent";

const App: FC = () => {
  // document.addEventListener("mousemove", updateMouseCoords);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Dock />
        <UserBoardComponent />
      </div>

      {/* <ShipsHealthBox /> */}
    </div>
  );
};

export default App;
