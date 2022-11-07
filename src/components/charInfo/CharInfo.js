import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  updateChar = () => {
    const { charId } = this.props;
    if (!charId) {
      return;
    }

    this.marvelService
      .getCharacter(charId)
      .then(this.onCharLoaded)
      .catch(this.onError);

    // throw Error('Testing error boundary');
  };

  componentWillUnmount() {
    // clearInterval(this.timerId);
  }

  //   componentDidCatch(err, info) {
  //     // for older versions
  //     // console.log(err, info);
  //     // this.setState({
  //     //   error: true,
  //     // });
  //   }

  onCharLoaded = (char) => {
    // short desc
    char.description =
      char.description === undefined || char.description.length === 0
        ? 'Data not found'
        : char.description;

    this.setState({
      char,
      loading: false,
    }); // == {char: char}
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { char, loading, error } = this.state;

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
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

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
        {comics.slice(0, 5).map((item, i) => {
          return (
            <li className="char__comics-item" key={i}>
              {item.name}
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
};

export default CharInfo;
