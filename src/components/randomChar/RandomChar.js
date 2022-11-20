import { useState, useEffect } from 'react';
import Spinner from '../spinner/Spinner';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {
  const [char, setChar] = useState(null);

  const { loading, error, getCharacter, clearError } = useMarvelService();

  useEffect(() => {
    updateChar();

    // const timerId = setInterval(updateChar, 60000);

    return () => {
      // clearInterval(timerId);
    };
  }, []);

  const onCharLoaded = (charObj) => {
    // console.log(charObj);
    // short desc
    charObj.description =
      charObj.description === undefined || charObj.description.length === 0
        ? 'Data not found'
        : charObj.description.substr(
            0,
            charObj.description.lastIndexOf(' ', 100)
          ) + '...';

    setChar((char) => charObj);
  };

  const updateChar = () => {
    clearError();
    // console.log('Update');
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    // console.log(id);

    getCharacter(id).then((data) => {
      // console.log(data);
      onCharLoaded(data);
    });
  };

  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;
  const spinner = loading ? <Spinner></Spinner> : null;
  // console.log(loading);
  // console.log(error);
  // console.log(char);
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {errorMessage}
      {spinner}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main">
          <div className="inner" onClick={updateChar}>
            try it
          </div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  // console.log(char);

  const { name, description, thumbnail, homepage, wiki } = char;

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className={
          thumbnail.indexOf('image_not_available') > -1
            ? 'randomchar__img not_found'
            : 'randomchar__img'
        }
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
