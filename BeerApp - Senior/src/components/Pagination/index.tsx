import * as React from 'react';
import { Pagination, useMediaQuery } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { removeEmptyProperties } from "../../utils";

interface Props {
  count: number;
}

const BeerFilter = ({ count }: Props) => {
  const isMobile = useMediaQuery('(max-width:600px)');
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
    <Pagination
      count={count}
      page={Number(searchParams.get('page') ?? '1')}
      onChange={handleChange}
      variant="outlined"
      shape="rounded"
      siblingCount={isMobile ? 0 : 1}
    />
  );
};

export default BeerFilter;
