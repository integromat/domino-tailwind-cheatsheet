import React, { Component } from 'react';
import Home from './home';
import { Provider } from 'react-redux';
import store, { history } from '../store';
import { ConnectedRouter } from 'connected-react-router';

class App extends Component {

    componentDidMount() {};

    render() {
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Home />
                </ConnectedRouter>
            </Provider>
        )
    }
}

export default App;
