import * as React from 'react';
import {useSearchParams} from "react-router-dom";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import styles from './ListSort.module.css';
import { sortFields, sortOrders } from "./constants";
import { capitalizeFirstLetter, removeEmptyProperties } from "../../utils";
import { getSort, getSortFieldsAndOrder } from "./utils";
import { SORT } from "../../types";

const ListSort = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  const searchParamsData = getSortFieldsAndOrder(searchParams.get('sort') || '')
  const [state, setState] = React.useState({
    sortOrder: searchParamsData.order,
    sortFields: searchParamsData.fields,
  });

  const handleFieldChange = (event: React.MouseEvent<HTMLElement>, newFields: string[]) => {
    const newState = {...state, sortFields: newFields};
    setState(newState);
    applySort(newState);
  };

  const handleOrderChange = (event: React.MouseEvent<HTMLElement>, newOrder: SORT | null) => {
    const newState = {...state, sortOrder: newOrder};
    setState(newState);
    applySort(newState)
  };

  const applySort = (newState: typeof state) => {
    setSearchParams(
      removeEmptyProperties({
        ...Object.fromEntries(searchParams.entries()),
        sort: getSort(newState.sortOrder, newState.sortFields)
      })
    )
  }

  return (
    <div className={styles.container}>
      <p>Sort by</p>
      <ToggleButtonGroup
        value={state.sortFields}
        onChange={handleFieldChange}
        aria-label="sort order"
      >
        {sortFields.map(field => (
          <ToggleButton key={field} value={field}>
            {capitalizeFirstLetter(field)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      <p>Order</p>
      <ToggleButtonGroup
        exclusive
        value={state.sortOrder}
        onChange={handleOrderChange}
        aria-label="sort order"
      >
        {sortOrders.map(order => (
          <ToggleButton key={order} aria-label={order} value={order}>
            {order === 'asc' ? <ArrowUpwardIcon/> : <ArrowDownwardIcon/>}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </div>
  );
};

export default ListSort;
