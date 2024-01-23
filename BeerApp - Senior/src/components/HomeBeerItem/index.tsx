import { Checkbox, Link } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { Beer } from "../../types";

interface Props {
  beer: Beer;
  isSaved: boolean;
  toggleBeerSave: (beer: Beer) => void;
}
const HomeBeerItem = ({ beer, isSaved, toggleBeerSave }: Props) => {
  return (
    <li key={beer.id}>
      <Checkbox
        checked={isSaved}
        onChange={() => toggleBeerSave(beer)}
        icon={<FavoriteBorder/>}
        checkedIcon={<Favorite sx={{ color: 'red' }} />}
        inputProps={{ 'aria-label': beer.name }}
      />
      <Link component={RouterLink} to={`/beer/${beer.id}`}>
        {beer.name}
      </Link>
    </li>
  );
};

export default React.memo(HomeBeerItem, (prevProps, nextProps) => {
  return (Object.keys(prevProps) as Array<keyof Props>).reduce((isEqual, key) => {
    if (key === 'beer') {
      return isEqual && prevProps[key].id === nextProps[key].id
    }
    return isEqual && Object.is(prevProps[key], nextProps[key])
  }, true)
});
