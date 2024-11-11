import {Link} from 'react-router-dom';
import {AppRouter} from '../../routing/app-router.ts';

function NotFoundPage() {
  return (
    <body>
      <div>
        <h2>404 Not Found</h2>
        <Link to={AppRouter.Main} title={AppRouter.Main}>
          Go to MainPage
        </Link>
      </div>
    </body>
  );
}

export default NotFoundPage;
