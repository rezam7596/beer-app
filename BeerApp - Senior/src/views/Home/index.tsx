import React, { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Paper, TextField } from '@mui/material';
import styles from './Home.module.css';
import SavedList from "../../components/SavedList";
import { SavedListProvider } from "../../components/SavedList/SavedListProvider";
import HomeBeerItem from "../../components/HomeBeerItem";

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  useEffect(() => {
    fetchData(setBeerList, '')
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchData(setBeerList, event.target.value)
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div>
                <TextField label='Filter...' variant='outlined' onChange={handleSearch} />
              </div>
              <ul className={styles.list}>
                {beerList.map(beer => <HomeBeerItem key={beer.id} beer={beer} />)}
              </ul>
            </div>
          </Paper>

          <Paper>
            <SavedList />
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default () => (<SavedListProvider><Home /></SavedListProvider>);
