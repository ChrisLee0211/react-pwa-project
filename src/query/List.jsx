import React, { memo, useMemo } from 'react';
import PropType from 'prop-types';
import URI from 'urijs';
import './List.css';

const ListItem = memo(function ListItem(props) {
    const {
        dTime,
        aTime,
        dStation,
        aStation,
        trainNumber,
        date,
        time,
        priceMsg,
        dayAfter
    } = props;

    const url = useMemo(() => {
        return new URI('ticket.html')
            .setSearch('aStation', aStation)
            .setSearch('dStation', dStation)
            .setSearch('trainNumber', trainNumber)
            .setSearch('date', date)
            .toString();
    }, [
            dStation,
            aStation,
            trainNumber,
            date
        ])

    return (
        <li className="list-item">
            <a href={url}>
                <span className="item-time">
                    <em>{dTime}</em>
                    <br />
                    <em className="em-light">{aTime}<i className="time-after">{dayAfter}</i></em>
                </span>
                <span className="item-stations">
                    <em>
                        <i className="train-station train-start">始</i>
                        {dStation}
                    </em>
                    <br />
                    <em className="em-light">
                        <i className="train-station train-end">终</i>
                        {aStation}
                    </em>
                </span>
                <span className="item-train">
                    <em>{trainNumber}</em>
                    <br />
                    <em className="em-light">{time}</em>
                </span>
                <span className="item-ticket">
                    <em>{priceMsg}</em>
                    <br />
                    <em className="em-light-orange">可抢票 </em>
                </span>
            </a>
        </li>
    )
})

ListItem.propTypes = {
    dTime: PropType.string.isRequired,
    aTime: PropType.string.isRequired,
    dStation: PropType.string.isRequired,
    aStation: PropType.string.isRequired,
    trainNumber: PropType.string.isRequired,
    date: PropType.string.isRequired,
    time: PropType.string.isRequired,
    priceMsg: PropType.string.isRequired,
    dayAfter: PropType.string.isRequired
}

const List = memo(
    function List(props) {
        const {
            list,
        } = props

        return (
            <ul className="list">
                {
                    list.map(item => <ListItem {...item} key={item.trainNumber} />)
                }
            </ul>
        )
    }
)

export default List

List.propTypes = {
    list: PropType.array.isRequired
};