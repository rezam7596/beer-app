import { useEffect, useState } from 'react';
import {ApiMetadata, Beer} from '../../types';
import { fetchData, getTotalPage } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BeerFilter from "../../components/BeerFilter";
import Pagination from "../../components/Pagination";

const BeerList = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [beerListMetadata, setBeerListMetadata] = useState<ApiMetadata>();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    fetchData(({ list, metadata }) => {
      setBeerList(list);
      setBeerListMetadata(metadata)
    }, params)
  }, [searchParams]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  return (
    <article>
      <section>
        <header>
          <h1>BeerList page</h1>
        </header>
        <BeerFilter />
        <main>
          <List>
            {beerList.map((beer) => (
              <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                <ListItemAvatar>
                  <Avatar>
                    <SportsBar />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={beer.name} secondary={beer.brewery_type} />
              </ListItemButton>
            ))}
          </List>
        </main>
        <Pagination count={getTotalPage(beerListMetadata)} />
      </section>
    </article>
  );
};

export default BeerList;
