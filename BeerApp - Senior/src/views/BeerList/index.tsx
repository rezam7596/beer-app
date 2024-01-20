import { useEffect, useState } from 'react';
import {ApiMetadata, Beer} from '../../types';
import { fetchData, getTotalPage } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BeerFilter from "../../components/BeerFilter";
import Pagination from "../../components/Pagination";
import BeerSort from "../../components/BeerSort";
import styles from './BeerList.module.css';

const BeerList = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerListMetadata, setBeerListMetadata] = useState<ApiMetadata>();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    fetchData(({list, metadata}) => {
      setBeerList(list);
      setBeerListMetadata(metadata)
    }, {per_page: 10, ...params})
  }, [searchParams]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <BeerFilter/>
        <div className={styles.beerSort}>
          <BeerSort/>
        </div>
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type}/>
              </ListItemButton>
            ))}
          </List>
        </main>
        <div className={styles.pagination}>
          <Pagination count={getTotalPage(beerListMetadata)}/>
        </div>
      </section>
    </article>
  );
};

export default BeerList;
