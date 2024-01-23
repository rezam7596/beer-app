import React, { createContext, useContext } from 'react';
import { Beer } from "../../types";
import { useLocalStorage } from "../../hooks";

interface ISavedContext {
  savedList: Array<Beer>,
  toggleBeerSave: (beer: Beer) => void,
  removeAllSaves: () => void,
}
const SavedContext = createContext<ISavedContext>({
  savedList: [],
  toggleBeerSave: () => {},
  removeAllSaves: () => {}
});

interface Props {
  children: React.ReactNode;
}
export function SavedListProvider({ children }: Props) {
  const [savedList, setSavedList] = useLocalStorage<Array<Beer>>('savedBeers', [])

  function toggleBeerSave(beer: Beer) {
    if (savedList.some(item => item.id === beer.id)) {
      setSavedList(savedList => savedList.filter(item => item.id !== beer.id))
    } else {
      setSavedList(savedList => [...savedList, beer])
    }
  }

  function removeAllSaves() {
    setSavedList([])
  }

  return (
    <SavedContext.Provider value={{ savedList, toggleBeerSave, removeAllSaves }}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedList() {
  return useContext(SavedContext);
}
