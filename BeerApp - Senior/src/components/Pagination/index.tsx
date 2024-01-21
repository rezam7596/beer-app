import * as React from 'react';
import { Pagination } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { removeEmptyProperties } from "../../utils";

interface Props {
  count: number;
}

const BeerFilter = ({ count }: Props) => {
  let [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setSearchParams(
      removeEmptyProperties({
        ...Object.fromEntries(searchParams.entries()),
        page: value,
      })
    )
  }

  return (
    <Pagination count={count} page={Number(searchParams.get('page') ?? '1')} onChange={handleChange} variant="outlined" shape="rounded" />
  );
};

export default BeerFilter;
