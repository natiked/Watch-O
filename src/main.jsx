import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home'
import {createBrowserRouter, createRoutesFromElements, RouterProvider, Route, NavLink} from 'react-router-dom';
import Movie from './pages/Movie';

const router = createBrowserRouter(
  createRoutesFromElements (
    <>
      <Route path="/" element={<Home />}/>
      <Route path="/movie/:id" element={<Movie />}></Route>
    </>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
