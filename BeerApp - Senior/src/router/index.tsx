import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout/>}>
      <Route index lazy={() => import('../views/Home')}/>
      <Route path='beer'>
        <Route index lazy={() => import('../views/BeerList')}/>
        <Route path=':id' lazy={() => import('../views/Beer')}/>
      </Route>
      <Route path='*' lazy={() => import('../views/404')}/>
    </Route>
  )
)

export default function Router() {
  return <RouterProvider router={router}/>;
}
