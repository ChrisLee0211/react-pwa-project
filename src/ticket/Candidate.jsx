import React,{memo} from 'react';
import PropTypes from 'prop-types';
import './Candidate.css';

const Seat = memo(function Seat(props){
    const {
        type,
        priceMsg,
        ticketsLeft,
        channels
    } = props;
    return (
        <li>
            <div className="bar">
                <span className="seat">{type}</span>
                <span className="price">
                    <i>¥</i>
                    {priceMsg}
                </span>
                <span className="btn">收起</span>
                <span className="num">{ticketsLeft}</span>
            </div>
            <div className="channels"></div>
        </li>
    )
})

Seat.propTypes = {
    type:PropTypes.string.isRequired,
priceMsg:PropTypes.string.isRequired,
ticketsLeft:PropTypes.string.isRequired,
channels:PropTypes.array.isRequired,
}

const Candidate = memo(
    function Candidate(props) {

        const {
            tickets
        } = props

        return (
            <div className="candidate">
                <ul>
                    {
                        tickets.map((ticket,idx)=>{
                            return <Seat {...ticket} key={ticket.type} />
                        })
                    }
                </ul>
            </div>
        )
    }
)

export default Candidate

Candidate.propTypes = {
    tickets:PropTypes.array.isRequired
}