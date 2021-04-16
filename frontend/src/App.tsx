import React from 'react';
import './App.css';
import 'reactjs-popup/dist/index.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Menu } from './components/menu/Menu';
import { Portfolio } from './pages/Portfolio';
import { Fiat } from './pages/Fiat';

function App() {
    return (
        <div>
            <Router>
                <Menu />
                <div>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/portfolio">
                            <Portfolio />
                        </Route>
                        <Route path="/fiat">
                            <Fiat />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}

export default App;
