import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
  state = {
    chars: null,
    loading: true,
    error: false,
    newItemsLoading: false,
    offset: 220,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    // throw Error('test');
    this.onRequest();
  }

  onCharListLoading = () => {
    this.setState({
      newItemsLoading: true,
    });
  };

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  onCharsLoaded = (newChars) => {
    // console.log(newChars);
    let ended = false;

    if (newChars.lenght < 9) {
      ended = true;
    }

    this.setState(({ offset, chars }) => {
      return {
        chars: chars !== null ? [...chars, ...newChars] : [...newChars],
        loading: false,
        newItemsLoading: false,
        offset: offset + 9,
        ended: ended,
      };
    });
  };

  onError = () => {
    this.setState({ error: true });
  };

  // onUpdateChars = () => {
  //   this.marvelService
  //     .getAllCharacters()
  //     .then(this.onCharsLoaded)
  //     .catch(this.onError);
  // };

  render() {
    const { loading, error, chars, offset, newItemsLoading, charEnded } =
      this.state;

    const spinner = loading ? <Spinner></Spinner> : null;
    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;

    const content =
      !loading && !error ? (
        <View chars={chars} onCharSelect={this.props.onCharSelect} />
      ) : null;

    // console.log(newItemsLoading);
    return (
      <div className="char__list">
        <ul className="char__grid">
          {spinner}
          {errorMessage}
          {content}
        </ul>
        <button
          className="button button__main button__long"
          onClick={() => this.onRequest(offset)}
          style={{ display: charEnded ? 'none' : 'block' }}
          disabled={newItemsLoading}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ chars, onCharSelect }) => {
  // console.log(chars);
  const charsList = chars.map((char) => {
    // console.log(char);
    return (
      // char__item_selected
      <li
        className="char__item"
        key={char.id}
        onClick={() => onCharSelect(char.id)}
      >
        <img
          src={char.thumbnail}
          alt={char.name}
          className={
            char.thumbnail.indexOf('image_not_available') > -1
              ? ' not_found'
              : null
          }
        />
        <div className="char__name">{char.name}</div>
      </li>
    );
  });

  return charsList;
};

CharList.propTypes = {
  onCharSelect: PropTypes.func.isRequired,
};

export default CharList;
