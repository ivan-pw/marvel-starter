// import { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AppHeader from '../appHeader/AppHeader';
// import RandomChar from '../randomChar/RandomChar';
// import CharList from '../charList/CharList';
// import CharInfo from '../charInfo/CharInfo';
// import ErrorBoundary from '../errorBoundary/ErrorBoundary';

// import AppBanner from '../appBanner/AppBanner';
// import ComicsList from '../comicsList/ComicsList';

// import MainPage from '../pages/MainPage';
// import ComicsPage from '../pages/ComicsPage';
import { MainPage, ComicsPage } from '../pages';

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/comics">
              <ComicsPage />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;
