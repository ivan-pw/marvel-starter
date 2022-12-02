import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();

    getCharacter(charId).then(onCharLoaded);

    // throw Error('Testing error boundary');
  };

  const onCharLoaded = (char) => {
    // short desc
    char.description =
      char.description === undefined || char.description.length === 0
        ? 'Data not found'
        : char.description;

    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton></Skeleton>;

  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;

  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = memo(({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics, id } = char;

  console.log('CharInfo View');

  // console.log(char);
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          className={
            char.thumbnail.indexOf('image_not_available') > -1
              ? ' not_found'
              : null
          }
        />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      {comics.length > 0 ? <div className="char__comics">Comics:</div> : null}
      <ul className="char__comics-list">
        {comics.slice(0, 10).map((item, i) => {
          const comicsId = item.resourceURI.slice(
            item.resourceURI.lastIndexOf('/') + 1,
            item.resourceURI.length
          );
          return (
            <li className="char__comics-item" key={i}>
              <Link to={`/comics/${comicsId}`}>{item.name}</Link>
            </li>
          );
        })}
        {comics.length > 5 ? (
          <div>
            <br />
            <p>And more...</p>
          </div>
        ) : null}
      </ul>
    </>
  );
});

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
