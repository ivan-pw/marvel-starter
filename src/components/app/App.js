import { lazy, StrictMode, Suspense } from 'react';

// import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import AppHeader from '../appHeader/AppHeader';
import Spinner from '../spinner/Spinner';
// import RandomChar from '../randomChar/RandomChar';
// import CharList from '../charList/CharList';
// import CharInfo from '../charInfo/CharInfo';
// import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// import AppBanner from '../appBanner/AppBanner';
// import ComicsList from '../comicsList/ComicsList';

// import MainPage from '../pages/MainPage';
// import ComicsPage from '../pages/ComicsPage';
// import {  ComicsPage, SingleComicsPage } from '../pages';
// import Page404 from '../pages/404';
const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import('../pages/MainPage'));
const ComicsPage = lazy(() => import('../pages/ComicsPage'));

const SingleComicLayout = lazy(() =>
  import('../pages/singleComicLayout/SingleComicLayout')
);
const SingleCharacterLayout = lazy(() =>
  import('../pages/singleCharacterLayout/SingleCharacterLayout')
);
const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
  return (
    // <StrictMode>
    <Router>
      <Helmet>
        <meta
          name="description"
          content="All info about Marvel comics and character"
        />
        <title>Marvel portal</title>
      </Helmet>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<MainPage />}></Route>
              <Route path="/comics" element={<ComicsPage />}></Route>
              <Route
                path="/comics/:id"
                element={
                  <SinglePage Component={SingleComicLayout} dataType="comic" />
                }
              ></Route>
              <Route
                path="/characters/:id"
                element={
                  <SinglePage
                    Component={SingleCharacterLayout}
                    dataType="character"
                  />
                }
              ></Route>
              <Route path="*" element={<Page404 />}></Route>
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
    // </StrictMode>
  );
};

export default App;
