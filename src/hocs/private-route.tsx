import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../components/enums/authorization-status.ts';
import {AppRouter} from '../components/app-router/app-router.ts';

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};
function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRouter.Login} />
  );
}

export default PrivateRoute;
