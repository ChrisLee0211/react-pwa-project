import {
    ACTION_SET_ARRIVEDATE,
    ACTION_SET_ARRIVESTATION,
    ACTION_SET_ARRIVETIMESTR,
    ACTION_SET_DEPARTDATE,
    ACTION_SET_DEPARTSTATION,
    ACTION_SET_DEPARTTIMESTR,
    ACTION_SET_DURATIONSTR,
    ACTION_SET_ISSCHEDULEVISABLE,
    ACTION_SET_SEARCHPARSED,
    ACTION_SET_TICKETS,
    ACTION_SET_TRAINNUMBER,
} from './actions';

export default {
    departDate(state=Date.now(),action){
        const {type,payload} = action;
        switch(type){
            case ACTION_SET_DEPARTDATE:
                return payload;
            default:
        }
        return state
    },
arriveDate(state=Date.now(),action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_ARRIVEDATE:
            return payload;
        default:
    }
    return state
},
departTimeStr(state=null,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_DEPARTTIMESTR:
            return payload;
        default:
    }
    return state
},
arriveTimeStr(state=null,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_ARRIVETIMESTR:
            return payload;
        default:
    }
    return state
},
departStation(state=null,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_DEPARTSTATION:
            return payload;
        default:
    }
    return state
},
arriveStation(state=null,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_ARRIVESTATION:
            return payload;
        default:
    }
    return state
},
trainNumber(state=null,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_TRAINNUMBER:
            return payload;
        default:
    }
    return state
},
durationStr(state=null,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_DURATIONSTR:
            return payload;
        default:
    }
    return state
},
tickets(state=[],action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_TICKETS:
            return payload;
        default:
    }
    return state
},
isScheduleVisable(state=false,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_ISSCHEDULEVISABLE:
            return payload;
        default:
    }
    return state
},
searchParsed(state=false,action){
    const {type,payload} = action;
    switch(type){
        case ACTION_SET_SEARCHPARSED:
            return payload;
        default:
    }
    return state
},
}