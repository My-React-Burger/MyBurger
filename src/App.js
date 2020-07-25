import React,{Component} from 'react';
import './App.css';
import {Route,Switch,withRouter, Redirect} from 'react-router-dom';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Checkout from './Container/Checkout/Checkout';
import Orders from './Container/Orders/Orders';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './Store/action/index';

class App extends Component{
   componentDidMount(){
     this.props.onTryAutoSignUp()
   }
  render(){
    let routes =(
             <Switch>
           <Route path="/auth" component={Auth} />
           <Route path="/" exact component={BurgerBuilder} />
           <Redirect to="/" />
             </Switch>
    );
    if(this.props.isAuth){
      routes=  <Switch>
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/logout" component={Logout} />
      <Route path="/auth" component={Auth} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
      </Switch>
    }
  return (
    <div>
      <Layout>
       {routes}
      </Layout>
    </div>
  )
}
}
const mapStateToprops = (state) =>{
  return {
    isAuth: state.auth.TokenID !== null
  }
}
const mapToDispatch =(dispatch) =>{
 return{
   onTryAutoSignUp : () => dispatch(actions.authCheckState())
 }
}
export default withRouter(connect(mapStateToprops, mapToDispatch)(App));
