import React from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import UserProvider from './UserContext';
import ThemeProvider from './ThemeContext';

import App from './App';
import Register from './routes/Register';
import Calendars from './routes/Calendars';
import Settings from './routes/Settings';
import ErrorPage from './routes/error_page'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
  },
  {
    path: "/calendars",
    element: <Calendars/>,
  },
  {
    path: "/settings",
    element: <Settings/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <UserProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </UserProvider>
  </React.StrictMode>
);


