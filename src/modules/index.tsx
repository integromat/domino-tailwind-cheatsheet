import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

function func(history: History) {
    return combineReducers({
        router: connectRouter(history),
    });
}

export default func;
