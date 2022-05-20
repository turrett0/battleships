import {bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks/store/useAppDispatch";
import {boardActions} from "../store/slices/boardSlice";

const allActions = {
  ...boardActions,
};

const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(allActions, dispatch);
};

export default useActions;
