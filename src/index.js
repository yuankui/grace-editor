import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/index.less';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {commandMiddleware, enhanceCommandReducer} from "redux-commands";
import {history, initReducer} from "./redux/utils";
import {ReloadPostsCommand} from "./redux/commands/ReloadPostsCommand";
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';
import ReloadSettingsCommand from "./redux/commands/ReloadSettingsCommand";
import {InitBackendCommand} from "./redux/commands/InitBackendCommand";
import GitSetupCommand from "./redux/commands/git/GitSetupCommand";
import PostSelectAction from "./redux/actions/PostSelectAction";
import {push} from 'connected-react-router';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(enhanceCommandReducer(initReducer),
    composeEnhancers(applyMiddleware(
        commandMiddleware,
        routerMiddleware(history),
    )));

store.dispatch(new ReloadSettingsCommand());

console.log(store.getState());
store.dispatch(new InitBackendCommand());
store.dispatch(new GitSetupCommand());
store.dispatch(new ReloadPostsCommand());
store.dispatch(PostSelectAction());

store.dispatch(push('/test'));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
