import { useState } from 'react';

import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';

import TestComponent from '../testComponent/TestComponent';

import decoration from '../../resources/img/vision.png';

import AppBanner from '../appBanner/AppBanner';
import ComicsList from '../comicsList/ComicsList';

const App = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelect = (id) => {
    setChar(id);
  };

  return (
    <div className="app">
      <AppHeader />
      <main>
        <TestComponent />
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        <div className="char__content">
          <ErrorBoundary>
            <CharList onCharSelect={onCharSelect} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
        </div>

        {/* <AppBanner />
        <ComicsList /> */}

        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  );
};

export default App;
