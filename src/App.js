import React  from 'react'
import { Provider } from 'mobx-react'
import { Router, Route, Switch } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import NoticePage from './pages/NoticePage'
import TransactionPage from './pages/TransactionPage'
import LoginPage from './pages/LoginPage'
import createBrowserHistory from 'history/createBrowserHistory'
import { stores } from './stores'
import { create } from "mobx-persist"
import HelpPage from './pages/HelpPage';
import DeveloerPage from './pages/DeveloperPage';
import SchedulePage from './pages/SchedulePage';
import MemberPage from './pages/MemberPage';

const history = createBrowserHistory()

class App extends React.PureComponent {
  async componentWillMount() {
    const hydrate = create()

    await hydrate("User", stores.userStore)
      .then(() => {
        if(stores.userStore.isAuthenticated === null) {
          stores.userStore.isAuthenticated = false
        }
      })
  }
  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={DashboardPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/notice" component={NoticePage} />
            <Route exact path="/transaction" component={TransactionPage} />
            <Route exact path="/members" component={MemberPage} />
            <Route exact path="/schedule" component={SchedulePage} />
            <Route exact path="/help" component={HelpPage} />
            <Route exact path="/developer" component={DeveloerPage} />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App
