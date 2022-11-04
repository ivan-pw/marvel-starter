import img from './error.gif';

const ErrorMessage = () => {
  //   return <img src={process.env.public_URL + 'error.gif'} alt="Error" />; // как вариант грузить из паблика
  return (
    <img
      src={img}
      style={{
        display: 'block',
        width: '250px',
        height: '250px',
        objectFit: 'contain',
        margin: '0 auto',
      }}
      alt="Error"
    />
  );
};

export default ErrorMessage;
