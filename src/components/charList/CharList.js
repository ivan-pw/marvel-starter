import { useState, useEffect, useRef } from 'react';

import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

// import setContent from '../../utils/setContent';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './charList.scss';

const setContent = (process, Component, newItemsLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemsLoading ? <Component /> : <Spinner />;
    case 'confirmed':
      return <Component />;
    case 'error':
      return <ErrorMessage />;

    default:
      throw new Error('Unexpected process state');
  }
};

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(false);
  const [offset, setOffset] = useState(220);
  const [charEnded, setCharEnded] = useState(false);

  const { getAllCharacters, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemsLoading(false) : setNewItemsLoading(true);
    getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => {
        setProcess('confirmed');
      });
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
        <CSSTransition key={item.id} timeout={500} classNames="char__item">
          <li
            ref={(el) => (itemsRefs.current[i] = el)}
            className="char__item"
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
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  // if (loading) {
  //   import('./someFunc')
  //     .then((obj) => obj.default())
  //     .catch();
  // }

  return (
    <div className="char__list">
      <ul className="char__grid">
        {setContent(process, () => renderItems(charList), newItemsLoading)}
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
