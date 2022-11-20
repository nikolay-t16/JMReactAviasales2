import React, { useEffect } from "react";
import styles from "./App.module.scss";
import IndexPage from "../pages/IndexPage/IndexPage";
import { useAppDispatch } from "../../hooks/hooks";
import { getSearchIdFromApi } from "../../store/userSlice";
import "normalize.css";
function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSearchIdFromApi());
  }, [dispatch]);

  return (
    <div className={styles.root}>
      <img
        src={"./img/aviasales.svg"}
        className={styles.logo}
        alt={"Aviasales"}
      />
      <IndexPage />
    </div>
  );
}

export default App;
