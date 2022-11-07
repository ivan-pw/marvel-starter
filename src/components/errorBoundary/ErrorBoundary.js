import { Component } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';

class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  componentDidCatch(err, info) {
    console.log(err, info);
    this.setState({
      error: true,
    });
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return <ErrorMessage></ErrorMessage>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
