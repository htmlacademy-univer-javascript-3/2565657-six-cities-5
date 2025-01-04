export enum ActionRouter {
  ChangeCityAction = 'data/changeCity',
  ChangeFavoriteStatus = 'data/changeFavoriteStatus',
  ChangeOffer = 'data/changeOffer',
  LoadOffers = 'data/loadOffers',
  LoadFavorites = 'data/loadFavorites',
  ClearFavorites = 'data/clearFavorites',
  LoadNearbyOffers = 'data/loadNearbyOffers',
  LoadComments = 'data/loadComments',
  LoadDetailedOffer = 'data/loadDetailedOffer',
  LoadNewComment = 'data/loadNewComment',
  LoadOfferPageData = 'data/loadOfferPageData',
  RequireAuthorization = 'user/requireAuthorization',
  Login = 'user/login',
  Logout = 'user/logout',
  SetError = 'user/setError',
  ClearError = 'user/clearError',
  RedirectToRoute = 'user/redirectToRoute'
}
