import { useState, useEffect, memo } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();

    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => {
        setProcess('confirmed');
      });

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

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = memo(({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;

  // console.log('CharInfo View');

  // console.log(char);
  return (
    <>
      <div className="char__basics">
        <img
          src={thumbnail}
          alt={name}
          className={
            thumbnail.indexOf('image_not_available') > -1 ? ' not_found' : null
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
