import React from 'react';
import classnames from 'classnames';
import './CitySelector.css';

export default function CitySelector(props) {
    const{show,
        cityData,
        isLoading} = props
    return (
        <div className={classnames('city-selector',{hidden:!show})}>
            
        </div>
    )
}