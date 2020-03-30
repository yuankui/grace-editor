import React from 'react';
import * as ReactDOM from 'react-dom';
import './styles/index.less';
import {App} from './app/App';
import * as serviceWorker from './serviceWorker';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import {commandMiddleware, enhanceCommandReducer} from "redux-commands";
import {history, initReducer} from "./redux/utils";
import {ConnectedRouter, routerMiddleware} from 'connected-react-router';
import {AppInitCommand} from "./redux/commands/app/AppInitCommand";
import {CheckRemoteCommand} from "./redux/commands/app/CheckRemoteCommand";
import {lazyExecute} from "./utils/lazyExecute";
import {RecoveryStateCommand} from './redux/commands/recovery/RecoveryStateCommand';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */
const store = createStore(enhanceCommandReducer(initReducer),
    composeEnhancers(applyMiddleware(
        commandMiddleware,
        routerMiddleware(history),
    )));


// init app
store.dispatch(new AppInitCommand())
    .then(() => {
        ReactDOM.render(<Provider store={store}>
            <ConnectedRouter history={history}>
                <App/>
            </ConnectedRouter>
        </Provider>, document.getElementById('root'));

        store.dispatch(new RecoveryStateCommand());
    });


// check git remote
store.dispatch(new CheckRemoteCommand());

// save AppState async
const lazySave = lazyExecute(() => {
    localStorage.setItem('app-state', JSON.stringify(store.getState()));
}, 500);
store.subscribe(lazySave);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
