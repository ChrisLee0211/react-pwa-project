import React, { memo, useState, useCallback, useMemo, useReducer } from 'react';
import PropType from 'prop-types';
import './Bottom.css';
import { ORDER_DEPART } from './constant';
import classnames from 'classnames';
import Slider from './Slider'

function checkedReducer(state,action){
    const {type,payload} = action;
    switch(type){
        case 'toggle':
            const newState = {...state};
            if(payload in newState) {
                delete newState[payload];
            }else{
                newState[payload] = true;
            }
            return newState
        case 'reset':
            return {};
        default:
    }
    return state
}

const Filter = memo(function Filter(props) {

    const {
        name,
        checked,
        value,
        dispatch
    } = props

    return (
        <li className={classnames({ checked })} onClick={() => dispatch({payload:value,type:'toggle'})}>
            {name}
        </li>
    )
})

Filter.propTypes = {
    name: PropType.string.isRequired,
    checked: PropType.bool.isRequired,
    value: PropType.string.isRequired,
    dispatch: PropType.func.isRequired,
}

const Option = memo(function Option(props) {
    const {
        title,
        options,
        checkedMap,
        dispatch
    } = props;

    return (
        <div className="option">
            <h3>{title}</h3>
            <ul>
                {
                    options.map(option => {
                        return <Filter
                            key={option.value}
                            {...option}
                            value={option.value}
                            checked={option.value in checkedMap}
                            dispatch={dispatch} />
                    })
                }
            </ul>
        </div>
    )
})

Option.propTypes = {
    title: PropType.string.isRequired,
    options: PropType.array.isRequired,
    checkedMap: PropType.object.isRequired,
    dispatch: PropType.func.isRequired,
}

const ButtomModal = memo(function BottomModal(props) {

    const {
        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,
        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeEnd,
        setDepartTimeStart,
        setArriveTimeEnd,
        setArriveTimeStart,
        toggleIsFilterVisible,
    } = props;

    const [localCheckedTicketTypes, LocalCheckedTicketTypesDispatch] = useReducer(
        checkedReducer,
        checkedTicketTypes,
        checkedTicketTypes => {
            return { ...checkedTicketTypes }
        });

    const [localCheckedTrainTypes, LocalCheckedTrainTypesDispatch] = useReducer(
        checkedReducer,
        checkedTrainTypes,
        checkedTrainTypes => { return { ...checkedTrainTypes } });

    const [localCheckedDepartStations, LocalCheckedDepartStationsDispatch] = useReducer(
        checkedReducer,
        checkedDepartStations,
        (checkedDepartStations) => { return { ...checkedDepartStations } });

    const [localCheckedArriveStations, LocalCheckedArriveStationsDispatch] = useReducer(
        checkedReducer,
        checkedArriveStations,
        checkedArriveStations => { return { ...checkedArriveStations } });

    const [localDepartTimeStart, setLocalDepartTimeStart] = useState(departTimeStart);
    const [localDepartTimeEnd, setLocalDepartTimeEnd] = useState(departTimeEnd);
    const [localArriveTimeStart, setLocalArriveTimeStart] = useState(arriveTimeStart);
    const [localArriveTimeEnd, setLocalArriveTimeEnd] = useState(arriveTimeEnd);

    const optionGroup = [
        {
            title: '坐席类型',
            options: ticketTypes,
            checkedMap: localCheckedTicketTypes,
            dispatch: LocalCheckedTicketTypesDispatch
        },
        {
            title: '车次类型',
            options: trainTypes,
            checkedMap: localCheckedTrainTypes,
            dispatch: LocalCheckedTrainTypesDispatch
        },
        {
            title: '出发车站',
            options: departStations,
            checkedMap: localCheckedDepartStations,
            dispatch: LocalCheckedDepartStationsDispatch
        },
        {
            title: '到达车站',
            options: arriveStations,
            checkedMap: localCheckedArriveStations,
            dispatch: LocalCheckedArriveStationsDispatch
        }
    ]

    function sure() {
        setCheckedTicketTypes(localCheckedTicketTypes);
        setCheckedTrainTypes(localCheckedTrainTypes);
        setCheckedDepartStations(localCheckedDepartStations);
        setCheckedArriveStations(localCheckedArriveStations);

        setDepartTimeStart(localDepartTimeStart);
        setDepartTimeEnd(localDepartTimeEnd);

        setArriveTimeStart(localArriveTimeStart);
        setArriveTimeEnd(localArriveTimeEnd);

        toggleIsFilterVisible()
    }

    const isResetDisabled = useMemo(() => {
        return Object.keys(localCheckedTicketTypes).length === 0
            && Object.keys(localCheckedTrainTypes).length === 0
            && Object.keys(localCheckedDepartStations).length === 0
            && Object.keys(localCheckedArriveStations).length === 0
            && localDepartTimeStart === 0
            && localDepartTimeEnd === 24
            && localArriveTimeStart === 0
            && localArriveTimeEnd === 24
    }, [localCheckedTicketTypes,
            localCheckedTrainTypes,
            localCheckedDepartStations,
            localCheckedArriveStations,
            localDepartTimeStart,
            localDepartTimeEnd,
            localArriveTimeStart,
            localArriveTimeEnd])

    function reset() {
        if (isResetDisabled) return
        LocalCheckedTicketTypesDispatch({type:'reset'});
        LocalCheckedTrainTypesDispatch({type:'reset'});
        LocalCheckedDepartStationsDispatch({type:'reset'});
        LocalCheckedArriveStationsDispatch({type:'reset'});

        setLocalDepartTimeStart(0);
        setLocalDepartTimeEnd(24);
        setLocalArriveTimeStart(0);
        setLocalArriveTimeEnd(24)
    }

    return (
        <div className="bottom-modal">
            <div className="bottom-dialog">
                <div className="bottom-dialog-content">
                    <div className="title">
                        <span className={classnames('reset', { disabled: isResetDisabled })} onClick={reset}>
                            重置
                        </span>
                        <span className="ok" onClick={sure}>
                            确定
                        </span>
                    </div>
                    <div className="options">
                        {
                            optionGroup.map(group => (<Option {...group} key={group.title} />))
                        }
                        <Slider
                            title="出发时间"
                            currentStartHours={localDepartTimeStart}
                            currentEndHours={localDepartTimeEnd}
                            onStartChanged={setLocalDepartTimeStart}
                            onEndChanged={setLocalDepartTimeEnd}
                        />
                        <Slider
                            title="到达时间"
                            currentStartHours={localArriveTimeStart}
                            currentEndHours={localArriveTimeEnd}
                            onStartChanged={setLocalArriveTimeStart}
                            onEndChanged={setLocalArriveTimeEnd}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
})

ButtomModal.propTypes = {
    toggleIsFilterVisible: PropType.func.isRequired,
    ticketTypes: PropType.array.isRequired,
    trainTypes: PropType.array.isRequired,
    departStations: PropType.array.isRequired,
    arriveStations: PropType.array.isRequired,
    checkedTicketTypes: PropType.object.isRequired,
    checkedTrainTypes: PropType.object.isRequired,
    checkedDepartStations: PropType.object.isRequired,
    checkedArriveStations: PropType.object.isRequired,
    departTimeStart: PropType.number.isRequired,
    departTimeEnd: PropType.number.isRequired,
    arriveTimeStart: PropType.number.isRequired,
    arriveTimeEnd: PropType.number.isRequired,

    setCheckedTicketTypes: PropType.func.isRequired,
    setCheckedTrainTypes: PropType.func.isRequired,
    setCheckedDepartStations: PropType.func.isRequired,
    setCheckedArriveStations: PropType.func.isRequired,
    setDepartTimeEnd: PropType.func.isRequired,
    setDepartTimeStart: PropType.func.isRequired,
    setArriveTimeEnd: PropType.func.isRequired,
    setArriveTimeStart: PropType.func.isRequired,
}

export default function Bottom(props) {

    const {
        toggleHighSpeed,
        toggleIsFilterVisible,
        toggleOnlyTickets,
        toggleOrderType,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible,

        ticketTypes,
        trainTypes,
        departStations,
        arriveStations,
        checkedTicketTypes,
        checkedTrainTypes,
        checkedDepartStations,
        checkedArriveStations,
        departTimeStart,
        departTimeEnd,
        arriveTimeStart,
        arriveTimeEnd,

        setCheckedTicketTypes,
        setCheckedTrainTypes,
        setCheckedDepartStations,
        setCheckedArriveStations,
        setDepartTimeEnd,
        setDepartTimeStart,
        setArriveTimeEnd,
        setArriveTimeStart
    } = props

    const noChecked = useMemo(() => {
        return Object.keys(checkedTicketTypes).length === 0
            && Object.keys(checkedTrainTypes).length === 0
            && Object.keys(checkedDepartStations).length === 0
            && Object.keys(checkedArriveStations).length === 0
            && departTimeStart === 0
            && departTimeEnd === 24
            && arriveTimeStart === 0
            && arriveTimeEnd === 24
    }, [checkedTicketTypes,
            checkedTrainTypes,
            checkedDepartStations,
            checkedArriveStations,
            departTimeStart,
            departTimeEnd,
            arriveTimeStart,
            arriveTimeEnd])

    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART ? '出发 早➡晚' : '耗时 短➡长'}
                </span>
                <span className={classnames('item', { 'item-on': highSpeed })} onClick={toggleHighSpeed}>
                    <i className="icon">{highSpeed ? '\uf43f' : '\uf43e'}</i>
                    只看高铁动车
                </span>
                <span className={classnames('item', { 'item-on': onlyTickets })} onClick={toggleOnlyTickets}>
                    <i className="icon">{onlyTickets ? '\uf43d' : '\uf43c'}</i>
                    只看有票
                </span>
                <span className={classnames('item', { 'item-on': isFiltersVisible || !noChecked })} onClick={toggleIsFilterVisible}>
                    <i className="icon">{noChecked ? '\uf0f7' : '\uf446  '}</i>
                    综合筛选
                </span>
            </div>
            {
                isFiltersVisible && (
                    <ButtomModal
                        ticketTypes={ticketTypes}
                        trainTypes={trainTypes}
                        departStations={departStations}
                        arriveStations={arriveStations}
                        checkedTicketTypes={checkedTicketTypes}
                        checkedTrainTypes={checkedTrainTypes}
                        checkedDepartStations={checkedDepartStations}
                        checkedArriveStations={checkedArriveStations}
                        departTimeStart={departTimeStart}
                        departTimeEnd={departTimeEnd}
                        arriveTimeStart={arriveTimeStart}
                        arriveTimeEnd={arriveTimeEnd}
                        setCheckedTicketTypes={setCheckedTicketTypes}
                        setCheckedTrainTypes={setCheckedTrainTypes}
                        setCheckedDepartStations={setCheckedDepartStations}
                        setCheckedArriveStations={setCheckedArriveStations}
                        setDepartTimeEnd={setDepartTimeEnd}
                        setDepartTimeStart={setDepartTimeStart}
                        setArriveTimeEnd={setArriveTimeEnd}
                        setArriveTimeStart={setArriveTimeStart}
                        toggleIsFilterVisible={toggleIsFilterVisible}
                    />
                )
            }
        </div>
    )
}

Bottom.propTypes = {
    toggleHighSpeed: PropType.func.isRequired,
    toggleIsFilterVisible: PropType.func.isRequired,
    toggleOnlyTickets: PropType.func.isRequired,
    toggleOrderType: PropType.func.isRequired,
    highSpeed: PropType.bool.isRequired,
    orderType: PropType.number.isRequired,
    onlyTickets: PropType.bool.isRequired,
    isFiltersVisible: PropType.bool.isRequired,
    ticketTypes: PropType.array.isRequired,
    trainTypes: PropType.array.isRequired,
    departStations: PropType.array.isRequired,
    arriveStations: PropType.array.isRequired,
    checkedTicketTypes: PropType.object.isRequired,
    checkedTrainTypes: PropType.object.isRequired,
    checkedDepartStations: PropType.object.isRequired,
    checkedArriveStations: PropType.object.isRequired,
    departTimeStart: PropType.number.isRequired,
    departTimeEnd: PropType.number.isRequired,
    arriveTimeStart: PropType.number.isRequired,
    arriveTimeEnd: PropType.number.isRequired,

    setCheckedTicketTypes: PropType.func.isRequired,
    setCheckedTrainTypes: PropType.func.isRequired,
    setCheckedDepartStations: PropType.func.isRequired,
    setCheckedArriveStations: PropType.func.isRequired,
    setDepartTimeEnd: PropType.func.isRequired,
    setDepartTimeStart: PropType.func.isRequired,
    setArriveTimeEnd: PropType.func.isRequired,
    setArriveTimeStart: PropType.func.isRequired,
};