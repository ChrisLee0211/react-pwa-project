import React,{memo} from 'react';
import PropTypes from 'prop-types';
import './Passengers.css';

const Passenger = memo(function Passenger(props){
    return (
        <li>{props.id}</li>
    )
})

Passenger.propTypes = {

}

const Passengers = memo(function Passengers(props){
    const {
        passengers,
        createChild,
        createAdult
    } = props

    return (
        <div className="passengers">
            <ul>
                {
                    passengers.map(passenger => {
                        return <Passenger {...passenger} key={passenger.id} />
                    })
                }
            </ul>
            <section className="add">
                <div className="adult" onClick={()=>createAdult()}>添加成人</div>
                <div className="child" onClick={()=>createChild()}>添加儿童</div>
            </section>
        </div>
    )
});

Passengers.propTypes = {
    passengers:PropTypes.array.isRequired,
    createChild:PropTypes.func.isRequired,
createAdult:PropTypes.func.isRequired,
};

export default Passengers