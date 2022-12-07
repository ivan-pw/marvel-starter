import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import TestComponent from '../testComponent/TestComponent';
import CharSearchForm from '../charSearchForm/CharSearchForm';

import decoration from '../../resources/img/vision.png';

import { useState } from 'react';

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelect = (id) => {
    setChar(id);
  };

  return (
    <>
      {/* <TestComponent /> */}
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelect={onCharSelect} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharSearchForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  );
};

export default MainPage;
