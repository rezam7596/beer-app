import React, { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import {CircularProgress, InputAdornment, Paper, TextField} from '@mui/material';
import styles from './Home.module.css';
import SavedList from "../../components/SavedList";
import { SavedListProvider } from "../../components/SavedList/SavedListProvider";
import HomeBeerList from "../../components/HomeBeerList";

const HomeComponent = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData({ setData: setBeerList, query: '', setLoading })
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    fetchData({ setData: setBeerList, query: event.target.value, setLoading })
  }

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div>
                <TextField
                  label='Filter...'
                  variant='outlined'
                  onChange={handleSearch}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ visibility: loading ? 'visible': 'hidden' }}>
                        <CircularProgress size={25} />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
              <HomeBeerList list={beerList} />
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

export default function Home() {
  return (
    <SavedListProvider>
      <HomeComponent />
    </SavedListProvider>
  )
}

export { Home as Component };
