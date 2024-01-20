import { Checkbox, Link } from "@mui/material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { Beer } from "../../types";
import { useSavedList } from "../SavedList/SavedListProvider";

interface Props {
  beer: Beer;
}
const HomeBeerItem = ({ beer }: Props) => {
  const { savedList, toggleBeerSave } = useSavedList();

  return (
    <li key={beer.id}>
      <Checkbox
        checked={savedList.some(item => item.id === beer.id)}
        onChange={() => toggleBeerSave(beer)}
        icon={<FavoriteBorder/>}
        checkedIcon={<Favorite sx={{ color: 'red' }} />}
      />
      <Link component={RouterLink} to={`/beer/${beer.id}`}>
        {beer.name}
      </Link>
    </li>
  );
};

export default HomeBeerItem;
