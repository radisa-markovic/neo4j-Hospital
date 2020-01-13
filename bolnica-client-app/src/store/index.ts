import { DoktorStanje } from "./doktori/reducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import DoktorReducer from './doktori/reducer';//Petkoviceva fora sa export default

import { all } from "redux-saga/effects";
import createSagaMiddleware, { SagaMiddleware } from '@redux-saga/core';
import { rootSagaZaDoktore } from "./doktori/saga";
import { composeWithDevTools } from 'redux-devtools-extension'

export interface RootStanje
{
    doktorDetalji: DoktorStanje
}

const rootReducer = combineReducers({
    doktorDetalji: DoktorReducer
});

function* rootSaga()
{
    yield all([
        rootSagaZaDoktore()
    ]);
}

export default function konfigurisiStore()
{
    const sagaMiddleware: SagaMiddleware = createSagaMiddleware();
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(sagaMiddleware))
    );
    sagaMiddleware.run(rootSaga);

    return store;
}