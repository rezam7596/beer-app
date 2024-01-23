import * as React from 'react';
import styles from './ListFilter.module.css';
import {
  Button, TextField, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel, CircularProgress,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { beerTypes } from "./constants";
import { capitalizeFirstLetter, removeEmptyProperties } from "../../utils";
import { useSearchParams } from "react-router-dom";

const ListFilter = ({ loading }: { loading: boolean }) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const [state, setState] = React.useState({
    by_name: searchParams.get('by_name') ?? '',
    by_type: searchParams.get('by_type') ?? '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    setState({
      ...state,
      [event.target.name]: event.target.value as string,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      applySearch();
    }
  }

  const applySearch = () => {
    setSearchParams(
      removeEmptyProperties({
        ...Object.fromEntries(searchParams.entries()),
        ...state
      })
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputs}>
        <TextField
          name="by_name"
          label='Name'
          value={state.by_name}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          sx={{ minWidth: 200 }}
        />
        <FormControl fullWidth >
          <InputLabel id="type-select-label">Type</InputLabel>
          <Select
            labelId="type-select-label"
            name="by_type"
            value={state.by_type}
            label="Type"
            onChange={handleSelectChange}
            sx={{ minWidth: 200 }}
          >
            <MenuItem value={''}><em>None</em></MenuItem>
            {beerTypes.map(type => (<MenuItem key={type} value={type}>{capitalizeFirstLetter(type)}</MenuItem>))}
          </Select>
        </FormControl>
      </div>
      <Button variant='contained' className={styles.button} disabled={loading} onClick={applySearch}>
        <span>Search</span>
        {loading ? <CircularProgress size={25} color="inherit"/> : <SearchIcon /> }
      </Button>
    </div>
  );
};

export default ListFilter;
