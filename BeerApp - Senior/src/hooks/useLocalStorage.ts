/*
 useLocalStorage synchronizes a component's state with local storage, automatically handling
 updating local storage on state changes, and staying in sync with changes made in other tabs or windows.

 read more: https://usehooks.com/uselocalstorage
*/
import React from "react";
import { useIsFirstRender } from "./useIsFirstRender";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const isFirstRender = useIsFirstRender();

  if (isFirstRender) {
    if (getLocalStorageItem(key) === null && initialValue !== undefined) {
      setLocalStorageItem(key, initialValue);
    }
  }

  const state = React.useSyncExternalStore(subscribeLocalStorage, () => getLocalStorageItem(key));

  // preserve the reference to the setState function during lifecycle of the hook
  const setState = React.useCallback(
    (newValue: any) => {
      try {
        const nextState = typeof newValue === "function" ? newValue(JSON.parse(state as string)) : newValue;
        if (nextState === undefined) {
          removeLocalStorageItem(key);
        } else {
          setLocalStorageItem(key, nextState);
        }
      } catch (e) {
        console.warn(e);
      }
    },
    [key, state]
  );

  return [JSON.parse(state as string), setState] as [T, (value: T | ((prevState: T) => T)) => void];
}

function setLocalStorageItem(key: string, value: any) {
  const stringifiedValue = JSON.stringify(value);
  window.localStorage.setItem(key, stringifiedValue);
  // storage event won't work on the same page that is making the changes, so dispatch it manually
  dispatchStorageEvent(key, stringifiedValue);
}

function removeLocalStorageItem(key: string) {
  window.localStorage.removeItem(key);
  dispatchStorageEvent(key, null);
}

function getLocalStorageItem(key: string) {
  return window.localStorage.getItem(key);
}

function subscribeLocalStorage(callback: (this: Window, ev: StorageEvent) => any) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function dispatchStorageEvent(key: string, newValue: any) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}