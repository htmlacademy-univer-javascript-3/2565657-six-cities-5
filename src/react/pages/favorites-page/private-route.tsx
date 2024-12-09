import {Navigate} from 'react-router-dom';
import {AppRouter} from '../../app-router.ts';
import {AuthorizationStatus} from "./authorization-status.ts";

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
