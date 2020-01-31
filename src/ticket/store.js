import { createStore,combineReducers,applyMiddleware } from 'redux'
import {h0} from '../common/fp'
import reducers from './reducers';
import thunk from 'redux-thunk';


export default createStore(
    combineReducers(reducers),
    {
        departDate:Date.now(),
        arriveDate:Date.now(),
        departTimeStr:null,
        arriveTimeStr:null,
        departStation:null,
        arriveStation:null,
        trainNumber:null,
        durationStr:null,
        tickets:[],
        isScheduleVisable:false,
        searchParsed:false
    },
    applyMiddleware(thunk)
)