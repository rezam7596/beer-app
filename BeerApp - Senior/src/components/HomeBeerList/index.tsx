import React from "react";
import styles from './HomeBeerList.module.css';
import HomeBeerItem from "../HomeBeerItem";
import { useSavedList } from "../SavedList/SavedListProvider";
import { Beer } from "../../types";

const HomeBeerList = ({ list }: { list: Array<Beer>}) => {
  const { toggleBeerSave, getIsBeerSaved } = useSavedList();

  return (
    <ul className={styles.list}>
      {list.map((beer) => (
        <HomeBeerItem
          key={beer.id}
          beer={beer}
          isSaved={getIsBeerSaved(beer)}
          toggleBeerSave={toggleBeerSave}
        />
      ))}
      {!list.length && <li data-testid="no-item">No items</li>}
    </ul>
  );
};

export default React.memo(HomeBeerList);
