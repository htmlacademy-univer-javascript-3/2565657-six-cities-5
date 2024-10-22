import {Link} from 'react-router-dom';

function NotFoundPage() {
  return (
    <body>
      <div>
        <h2>404 Not Found</h2>
        <Link to={'/'} title={'/'}>
          Go to MainPage
        </Link>
      </div>
    </body>
  );
}

export default NotFoundPage;
