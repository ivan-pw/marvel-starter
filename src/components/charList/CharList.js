import { Component } from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';

class CharList extends Component {
  state = {
    chars: null,
    loading: true,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onUpdateChars();
  }

  onCharsLoaded = (chars) => {
    // console.log(chars);
    this.setState({ chars, loading: false });
  };

  onError = () => {
    this.setState({ error: true });
  };

  onUpdateChars = () => {
    this.marvelService
      .getAllCharacters()
      .then(this.onCharsLoaded)
      .catch(this.onError);
  };

  render() {
    const { loading, error, chars } = this.state;

    const spinner = loading ? <Spinner></Spinner> : null;
    const errorMessage = error ? <ErrorMessage></ErrorMessage> : null;

    const content = !loading && !error ? <View chars={chars} /> : null;

    return (
      <div className="char__list">
        <ul className="char__grid">
          {spinner}
          {errorMessage}
          {content}
          {/* <li className="char__item char__item_selected">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li>
          <li className="char__item">
            <img src={abyss} alt="abyss" />
            <div className="char__name">Abyss</div>
          </li> */}
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

const View = ({ chars }) => {
  console.log(chars);
  const charsList = chars.map((char) => {
    return (
      // char__item_selected
      <li className="char__item" key={char.id}>
        <img src={char.thumbnail} alt="abyss" />
        <div className="char__name">{char.name}</div>
      </li>
    );
  });

  return charsList;
};

export default CharList;
