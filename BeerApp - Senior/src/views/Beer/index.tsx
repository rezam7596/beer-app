import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import styles from './Beer.module.css';
import BeerPageAnimatedBeer from "../../components/BeerPageAnimatedBeer";
import BeerPageHeader, { BeerImagePreloader } from "../../components/BeerPageHeader";
import BeerPageInfo from "../../components/BeerPageInfo";

const Beer = () => {
  const {id} = useParams();
  const [beer, setBeer] = useState<IBeer>();

  useEffect(() => {
    fetchData(setBeer, id)
  }, [id]);

  return (
    <article className={styles.container}>
      <div className={`${styles.innerContainer} ${!beer ? styles.loading : ''}`}>
        {beer && (
          <>
            <BeerPageHeader beer={beer} />
            <BeerPageInfo beer={beer} />
          </>
        )}
        <div className={styles.bottomSection}>
          <p className={styles.bottomText}>KEEP CALM <span>AND</span> DRINK BEER</p>
          <BeerPageAnimatedBeer />
        </div>
      </div>
      <BeerImagePreloader />
    </article>
  );
};

export default Beer;
