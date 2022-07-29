import './App.css';
import { Redirect, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { Home } from './components/Home';
import { DetailsScreen } from './components/DetailsScreen';
import { CreateScreen } from './components/CreateScreen';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage />
        </Route>
        <Route exact path='/home'>
          <Home />
        </Route>
        <Route exact path='/videogame/:id'>
          <DetailsScreen />
        </Route>
        <Route exact path='/createVideogame'>
          <CreateScreen />
        </Route>
        <Redirect to='/home' />
      </Switch>
    </div>
  );
}

export default App;

