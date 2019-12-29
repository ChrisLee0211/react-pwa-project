import { connect } from 'react-redux';
import React,{useCallback} from 'react';
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit'
import {exchangeFromTo,showCitySelector} from './actions'

function App(props){
  const {from,to,dispatch} = props
  const onBack = useCallback(() => {
    window.history.back();
  },[])
  const doExchangeFromTo = useCallback(()=>{
    dispatch(exchangeFromTo())
  },[])
  const doShowCitySelector = useCallback((m)=>{
    dispatch(showCitySelector(m))
  },[])
  return(
    <div>
      <div className="header-wrapper">
        <Header title="火车票" onBack={onBack}/>
      </div>
      <Journey 
      from={from} 
      to={to}
      exchangeFromTo={doExchangeFromTo}
      showCitySelector={doShowCitySelector}
      />
      <DepartDate/>
      <HighSpeed/>
      <Submit/>
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