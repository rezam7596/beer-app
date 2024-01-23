import React, { createContext, useCallback, useContext } from 'react';
import { Beer } from "../../types";
import { useLocalStorage } from "../../hooks";

interface ISavedContext {
  savedList: Array<Beer>,
  toggleBeerSave: (beer: Beer) => void,
  removeAllSaves: () => void,
  getIsBeerSaved: (beer: Beer) => boolean,
}
const SavedContext = createContext<ISavedContext>({
  savedList: [],
  toggleBeerSave: () => {},
  removeAllSaves: () => {},
  getIsBeerSaved: () => false,
});

interface Props {
  children: React.ReactNode;
}
export function SavedListProvider({ children }: Props) {
  const [savedList, setSavedList] = useLocalStorage<Array<Beer>>('savedBeers', [])

  const toggleBeerSave = useCallback((beer: Beer) => {
    setSavedList(sl => {
      if (sl.some(item => item.id === beer.id)) {
        return sl.filter(item => item.id !== beer.id)
      } else {
        return [...sl, beer]
      }
    })
  }, [setSavedList])

  const removeAllSaves = useCallback(() => {
    setSavedList([])
  }, [setSavedList])

  const getIsBeerSaved = useCallback((beer: Beer) => savedList.some(item => item.id === beer.id), [savedList])

  const contextValue = React.useMemo(() => ({
    savedList, toggleBeerSave, removeAllSaves, getIsBeerSaved
  }), [savedList, toggleBeerSave, removeAllSaves, getIsBeerSaved])

  return (
    <SavedContext.Provider value={contextValue}>
      {children}
    </SavedContext.Provider>
  );
}

export function useSavedList() {
  return useContext(SavedContext);
}
