import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(220);
  const [charEnded, setCharEnded] = useState(false);

  const { loading, error, getAllCharacters } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const focusOnItem = (id) => {
    // console.log(id);
    itemsRefs.current.forEach((item) => {
      item.classList.remove('char__item_selected');
    });

    itemsRefs.current[id].classList.add('char__item_selected');
    itemsRefs.current[id].focus();
  };

  const onCharListLoaded = (newCharList) => {
    // console.log(newChars);

    let ended = false;

    if (newCharList.lenght < 9) {
      ended = true;
    }

    setCharList((charList) => [...charList, ...newCharList]);
    setNewItemsLoading((newItemsLoading) => false);
    setOffset((offset) => offset + 9);
    setCharEnded((charEnded) => ended);
  };

  console.log('CharList');

  const itemsRefs = useRef([]);

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      // console.log(item);
      return (
        <li
          ref={(el) => (itemsRefs.current[i] = el)}
          className="char__item"
          key={item.id}
          tabIndex={0}
          onClick={(el) => {
            props.onCharSelect(item.id);
            focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelect(item.id);
              focusOnItem(i);
            }
          }}
        >
          <img
            src={item.thumbnail}
            alt={item.name}
            className={
              item.thumbnail.indexOf('image_not_available') > -1
                ? ' not_found'
                : null
            }
          />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);

  const spinner = loading && !newItemsLoading ? <Spinner></Spinner> : null;
  const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;

  // if (loading) {
  //   import('./someFunc')
  //     .then((obj) => obj.default())
  //     .catch();
  // }

  return (
    <div className="char__list">
      <ul className="char__grid">
        {spinner}
        {errorMessage}
        {items}
      </ul>
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        style={{ display: charEnded ? 'none' : 'block' }}
        disabled={newItemsLoading}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelect: PropTypes.func.isRequired,
};

export default CharList;
