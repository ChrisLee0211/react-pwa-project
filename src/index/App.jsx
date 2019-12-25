import { connect } from 'react-redux';
import React from 'react';
import './App.css';

import Header from '../common/Header';
import DepartDate from './DepartDate';
import HighSpeed from './HighSpeed';
import Journey from './Journey';
import Submit from './Submit'

function App(props){
  return(
    <div>
      <Header/>
      <Journey/>
      <DepartDate/>
      <HighSpeed/>
      <Submit/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (state) => {
  return{}
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App)