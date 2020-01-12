import { DoktorStanje } from "./doktori/reducer";
import { combineReducers } from "redux";
import DoktorReducer from './doktori/reducer';//Petkoviceva fora sa export default

export interface RootStanje
{
    doktorDetalji: DoktorStanje
}

const rootReducer = combineReducers({
    doktorDetalji: DoktorReducer
});