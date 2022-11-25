import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './SingleComicsPage.scss';
import xMen from '../../resources/img/x-men.png';

const SingleComicsPage = () => {
  const { comicsId } = useParams();
  const [comics, setComics] = useState(null);

  const { loading, error, getComics, clearError } = useMarvelService();

  useEffect(() => {
    updateComics();
  }, [comicsId]);

  const updateComics = () => {
    clearError();

    getComics(comicsId).then(onComicsLoaded);

    // throw Error('Testing error boundary');
  };

  const onComicsLoaded = (comics) => {
    setComics(comics);
  };

  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;

  const content = !(loading || error || !comics) ? (
    <View comics={comics} />
  ) : null;

  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

const View = ({ comics }) => {
  const { title, description, pageCount, thumbnail, language, price } = comics;

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <Link to="/comics" className="single-comic__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicsPage;
