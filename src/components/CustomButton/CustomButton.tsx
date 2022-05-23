import {FC} from "react";
import styles from "./CustomButton.module.scss";

interface Props {
  children: string;
  callback: Function;
  disabled?: boolean;
}

const CustomButton: FC<Props> = ({children, callback, disabled}) => {
  return (
    <button
      disabled={disabled}
      onClick={() => callback()}
      className={styles.button}
    >
      {children}
    </button>
  );
};

export default CustomButton;
