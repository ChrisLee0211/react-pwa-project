import React from 'react';
import { connect } from 'react-redux';

import Nav from '../common/Nav';
import List from './List';
import Bottom from './Bottom'

import './App.css';

function App(props){
  return (
    <div>
      <Nav />
      <List />
      <Bottom />
    </div>
  )
}

const mapStateToProps = (state) => {
    return state
}
const mapDispatchToProps = (dispatch) => {
  return {dispatch}
}

export default connect(
  mapStateToProps,mapDispatchToProps
)(App)