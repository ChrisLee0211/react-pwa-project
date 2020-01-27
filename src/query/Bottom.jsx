import React from 'react';
import PropType from 'prop-types';
import './Bottom.css';
import { ORDER_DEPART } from './constant';
import classnames from 'classnames';
export default function Bottom(props) {

    const {
        toggleHighSpeed,
        toggleIsFilterVisible,
        toggleOnlyTickets,
        toggleOrderType,
        highSpeed,
        orderType,
        onlyTickets,
        isFiltersVisible
    } = props

    return (
        <div className="bottom">
            <div className="bottom-filters">
                <span className="item" onClick={toggleOrderType}>
                    <i className="icon">&#xf065;</i>
                    {orderType === ORDER_DEPART?'出发 早➡️晚': '耗时 短➡️长'}
                </span>
                <span className={classnames('item',{'item-on':highSpeed})} onClick={toggleHighSpeed}>
                    <i className="icon">{highSpeed?'\uf43f':'\uf43e'}</i>
                    只看高铁动车
                </span>
                <span className={classnames('item',{'item-on':onlyTickets})} onClick={toggleOnlyTickets}>
                    <i className="icon">{onlyTickets?'\uf43d':'\uf43c'}</i>
                    只看有票
                </span>
                <span className={classnames('item',{'item-on':isFiltersVisible})} onClick={toggleIsFilterVisible}>
                    <i className="icon">{'\uf0f7'}</i>
                    综合筛选
                </span>
            </div>
        </div>
    )
}

Bottom.propTypes = {
    toggleHighSpeed:PropType.func.isRequired,
toggleIsFilterVisible:PropType.func.isRequired,
toggleOnlyTickets:PropType.func.isRequired,
toggleOrderType:PropType.func.isRequired,
highSpeed:PropType.bool.isRequired,
orderType:PropType.number.isRequired,
onlyTickets:PropType.bool.isRequired,
isFiltersVisible:PropType.bool.isRequired,
};