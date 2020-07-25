import React,{Component} from 'react';
import Aux from '../Auxil/Auxil';
import classes from './Layout.module.css'
import {connect} from 'react-redux';
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../Components/Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component{
    state={
        Sidevisible: false
    }
    Resetsidedrawer=()=>{
        this.setState({Sidevisible: false})
    }
    Opensidedrawer=()=>{
        this.setState((prev)=>{
            return {Sidevisible: !prev.Sidevisible};
        })
    }
    render(){
        return(
            <Aux>
        <Sidedrawer 
        show={this.state.Sidevisible} 
        closed={this.Resetsidedrawer}
        open={this.Opensidedrawer}
        IsAuth={this.props.IsAuthenticated}/>
    <Toolbar change={this.Opensidedrawer} IsAuth={this.props.IsAuthenticated}/>
    <main className={classes.Content}>
        {this.props.children}
    </main>
    </Aux>
        )
    }
}
   const mapStateToProps =(state) =>{
       return{
           IsAuthenticated: state.auth.TokenID!==null
       }
   }
export default connect(mapStateToProps)(Layout);