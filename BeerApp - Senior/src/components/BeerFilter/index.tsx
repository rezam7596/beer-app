import * as React from 'react';
import styles from './BeerFilter.module.css';
import {
  Button, TextField, Select, MenuItem, SelectChangeEvent, FormControl, InputLabel,
} from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { beerTypes } from "./constants";
import { capitalizeFirstLetter, removeEmptyProperties } from "../../utils";
import { useSearchParams } from "react-router-dom";

const BeerFilter = () => {
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
        <TextField name="by_name" label='Name' value={state.by_name} onChange={handleChange} sx={{ minWidth: 200 }}/>
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
      <Button variant='contained' onClick={applySearch}>Search</Button>
    </div>
  );
};

export default BeerFilter;
