import React,{Component} from 'react';
import Order from '../../Components/order/Order';
import Axios from '../../axios-order';
import withErrorHandler from '../../hoc/wihtErrorHandler/withErrorHandler';
import * as actions from '../../Store/action/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';

class Orders extends Component{

  componentDidMount(){
    this.props.onFetchorders(this.props.token,this.props.userId);
  }
render(){
  let orders = <Spinner />
  if(!this.props.loading){
    orders = this.props.orders.map(order =>{
      return <Order
      key={order.id}
      ingredients={order.ingredients} 
      price={order.price} />
    })
  }
    return(
        <div>
          {orders}
        </div>
    )
}
}
const mapToState =(state) =>{
  return{
    orders: state.order.order,
    loading: state.order.loading,
    token: state.auth.TokenID,
    userId: state.auth.UserID
  }
}
const mapToDispatch = (dispatch) =>{
  return {
    onFetchorders: (token,userId) => dispatch(actions.fetchorders(token,userId))
  }
}
export default connect(mapToState,mapToDispatch)(withErrorHandler(Orders,Axios));