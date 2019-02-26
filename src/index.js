/**
 * Created by lenovo on 2019/2/26.
 */
import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import  './assets/less/index.less'
import {BrowserRouter as Router} from 'react-router-dom'



ReactDOM.render(
  <Router><App/></Router>,
  document.getElementById('root'))