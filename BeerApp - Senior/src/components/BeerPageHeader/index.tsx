import React from "react";
import { Beer } from "../../types";
import styles from "./BeerPageHeader.module.css";
import beerGlassImage from "./beer-glass.png";

interface Props {
  beer?: Beer;
}
const BeerPageHeader = ({ beer }: Props) => {
  React.useEffect(() => {
    window.addEventListener('scroll', function () {
      const winTop = window.scrollY || document.documentElement.scrollTop;
      if (winTop >= 30) {
        document.getElementById(styles.header)?.classList.add(styles.hide);
      } else {
        document.getElementById(styles.header)?.classList.remove(styles.hide);
      }
    });
  }, []);

  return (
    <div id={styles.header}>
      <img alt="Beer" src={beerGlassImage}/>
      <h1>{beer?.name}</h1>
    </div>
  );
};

export function BeerImagePreloader() {
  return <link rel="preload" as="image" href={beerGlassImage}/>
}

export default BeerPageHeader;
