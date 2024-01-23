import { useEffect, useState } from 'react';
import {ApiMetadata, Beer} from '../../types';
import { fetchData, getTotalPage } from './utils';
import { Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ListFilter from "../../components/ListFilter";
import Pagination from "../../components/Pagination";
import ListSort from "../../components/ListSort";
import styles from './BeerList.module.css';

const BeerList = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerListMetadata, setBeerListMetadata] = useState<ApiMetadata>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    fetchData({
      setData: ({list, metadata}) => {
        setBeerList(list);
        setBeerListMetadata(metadata)
      },
      params: {per_page: 10, ...params},
      setLoading,
    })
  }, [searchParams]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <ListFilter loading={loading}/>
        <div className={styles.beerSort}>
          <ListSort/>
        </div>
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItem key={beer.id} disablePadding>
                <ListItemButton onClick={onBeerClick.bind(this, beer.id)}>
                  <ListItemAvatar>
                    <Avatar>
                      <SportsBar/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={beer.name} secondary={beer.brewery_type}/>
                </ListItemButton>
              </ListItem>
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
export { BeerList as Component };
