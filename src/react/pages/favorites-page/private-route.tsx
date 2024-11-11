import {Navigate} from 'react-router-dom';
import {AppRouter} from '../../routing/app-router.ts';

type PrivateRouteProps = {
  children: JSX.Element;
};
function PrivateRoute({children}: PrivateRouteProps) {
  const hasAccess = false;
  return hasAccess ? children : <Navigate to={AppRouter.Login} />;
}

export default PrivateRoute;
