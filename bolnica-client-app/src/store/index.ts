import { DoktorStanje } from "./doktori/reducer";
import { combineReducers, createStore, applyMiddleware } from "redux";
import DoktorReducer from './doktori/reducer';//Petkoviceva fora sa export default
import IzvestajReducer from './izvestaji/reducer';
import OdeljenjaReducer from './odeljenja/reducer';

import { all } from "redux-saga/effects";
import createSagaMiddleware, { SagaMiddleware } from '@redux-saga/core';
import { rootSagaZaDoktore } from "./doktori/saga";
import { composeWithDevTools } from 'redux-devtools-extension'
import { StanjeIzvestaja } from "./izvestaji/reducer";
import { StanjeOdeljenja } from "./odeljenja/reducer";
import { rootSagaZaIzvestaje } from "./izvestaji/saga";
import { rootSagaZaOdeljenja } from "./odeljenja/saga";

export interface RootStanje
{
    doktorDetalji: DoktorStanje,
    izvestajDetalji: StanjeIzvestaja,
    odeljenjaDetalji: StanjeOdeljenja
}

const rootReducer = combineReducers({
    doktorDetalji: DoktorReducer,
    izvestajDetalji: IzvestajReducer,
    odeljenjaDetalji: OdeljenjaReducer
});

function* rootSaga()
{
    yield all([
        rootSagaZaDoktore(),
        rootSagaZaIzvestaje(),
        rootSagaZaOdeljenja()
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