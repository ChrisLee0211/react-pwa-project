import { connect } from 'react-redux';
import React,{useCallback,useMemo} from 'react';
import {bindActionCreators} from 'redux'
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit'
import CitySelector from '../common/CitySelector';
import {exchangeFromTo,showCitySelector} from './actions'

function App(props){
  const {from, isCitySelectorVisible, cityData , isLoadingCityData ,to,dispatch} = props
  const onBack = useCallback(() => {
    window.history.back();
  },[])
  const cbs = useMemo(()=>{
    return bindActionCreators({
      exchangeFromTo,showCitySelector,
    },dispatch)
  })
  return(
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/>
      </div>
      <form className="form">
        <Journey 
        from={from} 
        to={to}
        {...cbs}
        />
        <DepartDate/>
        <HighSpeed/>
        <Submit/>
      </form>
      <CitySelector show={isCitySelectorVisible} cityData={cityData} isLoading={isLoadingCityData}/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state
}
const mapDispatchToProps = (dispatch) => {
  return{dispatch}
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App)