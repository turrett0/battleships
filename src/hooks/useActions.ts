import {bindActionCreators} from "@reduxjs/toolkit";
import {useAppDispatch} from "../hooks/store/useAppDispatch";
import {storeActions} from "../store";

const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(storeActions, dispatch);
};

export default useActions;
