import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useAppDispatch} from '../../../components/store';
import {fetchFavoritesAction, loginAction} from '../../../components/store/actions/api-actions.ts';
import {AppRouter} from '../../../components/app-router/app-router.ts';
import {changeCity} from '../../../components/store/actions/app-actions.ts';
import {AuthData} from '../../../components/store/auth-data.ts';

function LoginPage() {
  const [formData, setFormData] = useState<AuthData>({
    login: '',
    password: ''
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  const dispatch = useAppDispatch();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;

    const newFormData: AuthData = {
      ...formData,
      [name]: e.target.value
    };

    if (newFormData.password.length && newFormData.login.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }

    setFormData(newFormData);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(loginAction(formData)).finally(() => {
      dispatch(fetchFavoritesAction());
    });
  };

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Link className="header__logo-link" to={AppRouter.Main}>
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"></img>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleFormSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input onChange={handleFormChange} className="login__input form__input" type="email" name="login" placeholder="Email" required></input>
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input onChange={handleFormChange} className="login__input form__input" type="password" name="password" placeholder="Password" required></input>
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
                disabled={isDisabled}
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link
                onClick={() => dispatch(changeCity('Paris'))}
                className="locations__item-link"
                to={AppRouter.Main}
              >
                <span>Paris</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
