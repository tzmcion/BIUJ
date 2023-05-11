import React from 'react';
import Home from './Pages/Home/Home'
import SubPage from './Pages/SubPage/SubPage';
import { createBrowserRouter } from 'react-router-dom';

const App = createBrowserRouter([
  {
    path:"/",
    element: <Home/>,
    errorElement: <div><p>Error</p></div>,
  },
  {
    path:"/subject/:id",
    element: <SubPage />
  }
])

export default App;
