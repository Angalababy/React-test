import React, {Component} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom'
import ProductList from './productList'
import SaveUpdate from './saveupdate'


class Product extends Component {
  render () {
    return (
   <Switch>
     <Route path="/product/saveupdate" component={SaveUpdate}/>
     <Route path="/product/index" component={ProductList}/>
     <Redirect to="/product/index"/>
   </Switch>
    )
  }
}

export default Product;