import React from "react";
import styles from './SavedList.module.css';
import { Button } from "@mui/material";
import { useSavedList } from "./SavedListProvider";
import HomeBeerList from "../HomeBeerList";

const BeerSaved = () => {
  const{ savedList, removeAllSaves } = useSavedList();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Saved items</h3>
        <Button variant='contained' size='small' onClick={() => removeAllSaves()}>
          Remove all items
        </Button>
      </div>
      <HomeBeerList list={savedList} />
    </div>
  );
};

export default React.memo(BeerSaved);
