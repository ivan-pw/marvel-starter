import { Helmet } from 'react-helmet';

import ErrorMessage from '../errorMessage/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';

const Page404 = () => {
  let navigate = useNavigate();

  return (
    <div>
      <Helmet>
        <meta name="description" content="Error 404 - page not found" />
        <title>Page not found</title>
      </Helmet>
      <ErrorMessage />
      <p style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '24px' }}>
        Page doesn't exist
      </p>
      <Link
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '30px',
        }}
        to="/"
      >
        Back to main page
      </Link>
      <a
        onClick={() => navigate(-1)}
        href="#"
        style={{
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '24px',
          marginTop: '30px',
        }}
      >
        Go back
      </a>
    </div>
  );
};

export default Page404;
