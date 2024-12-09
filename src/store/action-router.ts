export enum ActionRouter {
  ChangeCityAction = 'cities/changeCity',
  FillCityOffersListAction = 'cities/fillCityOffersList',
  FillSortedOffersListAction = 'cities/fillSortedOffersList',
  LoadOffers = 'data/loadOffers',
  SetOffersDataLoadingStatus = 'data/setOffersDataLoadingStatus',
  RequireAuthorization = 'user/requireAuthorization',
  Login = 'user/login',
  Logout = 'user/logout',
  SetError = 'game/setError',
  ClearError = 'game/clearError',
  RedirectToRoute = 'game/redirectToRoute'
}
