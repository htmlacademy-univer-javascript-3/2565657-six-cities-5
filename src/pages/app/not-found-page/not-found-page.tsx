import {Link} from 'react-router-dom';
import {AppRouter} from '../../../components/app-router/app-router.ts';
import '../../../components/css/not-found-page.css';

function NotFoundPage() {
  return (
    <div className="not-found-container">
      <h2 className="not-found-title">404 Not Found</h2>
      <Link to={AppRouter.Main} title={AppRouter.Main} className="not-found-link">
        Go to MainPage
      </Link>
    </div>
  );
}

export default NotFoundPage;
