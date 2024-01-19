import { useEffect, useState } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BeerFilter from "../../components/BeerFilter";

const BeerList = () => {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries())
    fetchData(setBeerList, params)
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
      </section>
    </article>
  );
};

export default BeerList;
