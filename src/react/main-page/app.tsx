import MainPage from './components/main-page.tsx';

function App(props: { offerCount: number }) {
  return (
    <MainPage offerCount={ props.offerCount } />
  );
}

export default App;
