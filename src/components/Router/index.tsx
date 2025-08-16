/**
 * src\components\Router\index.tsx
 */
import React, {useEffect} from 'react';
import { createBrowserRouter, RouterProvider } from "react-router";
import {useSelector, useDispatch} from "react-redux";
import {setCurrentMeta} from "reduxToolkit/features/pagestate/pageSlice";
import { RegisterFC } from "src/pages/components/Register";
import { PageMeta } from '@interfeces';
import { RootState } from 'reduxToolkit/store';
import { MainFC } from 'src/pages/components/Main';
import AppGoogleMapsFC from 'src/pages/components/Maps';

// 'pageMeta' - Data from redux
const router_ = (pageMeta: PageMeta) => createBrowserRouter([
    {
        path: "/",
        element: <MainFC />
    },
  {
    path: "/login",
    element: <RegisterFC {...pageMeta}/>
  },
  {
    path: "/register",
    element: <RegisterFC {...pageMeta}/>
  },
  {
    path: "/raport",
    element: <AppGoogleMapsFC/>
    }  
],
);
export const MetaListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const pathname =  window.location.pathname.toLowerCase().trim();
    const pageName =
      pathname.includes("register") ? "Registration" :
      pathname.includes("login") ? "Authorisation" : "Main page";

    const state: PageMeta = {
      page: {
        title: pageName,
        pathName: pathname,
        description: "",
        keywords: [],
      },
    };

    dispatch(setCurrentMeta(state));
  }, [location.pathname, dispatch]);

  return null;
};

export function PagesRouter() {
  const currantMeta:PageMeta = useSelector((state: RootState) => state.metapage);
  return (
    <>
      <MetaListener /> 
      <RouterProvider router={router_(currantMeta)} />
    </>
  );
};
