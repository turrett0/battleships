import {nanoid} from "nanoid";
import React, {FC} from "react";
import styles from "./LetterBlock.module.scss";

interface Props {
  content: Array<string> | Array<number>;
  role: "vertical" | "horizontal";
}

const LetterBlock: FC<Props> = ({content, role}) => {
  return (
    <div className={styles[role]}>
      {content.map((block) => (
        <span key={nanoid()}>{block}</span> //sets every render
      ))}
    </div>
  );
};

export default LetterBlock;
