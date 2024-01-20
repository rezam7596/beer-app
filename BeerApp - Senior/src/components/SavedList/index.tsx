import React from "react";
import styles from './SavedList.module.css';
import { Button } from "@mui/material";
import { useSavedList } from "./SavedListProvider";
import HomeBeerItem from "../HomeBeerItem";

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
      <ul className={styles.list}>
        {savedList.map((beer) => <HomeBeerItem key={beer.id} beer={beer} />)}
        {!savedList.length && <p>No saved items</p>}
      </ul>
    </div>
  );
};

export default BeerSaved;
