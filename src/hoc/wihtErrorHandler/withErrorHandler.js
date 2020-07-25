import React,{Component} from 'react';
import Aux from '../Auxil/Auxil';
import Modal from '../../Components/UI/Modal/Modal';

const withErrorHandler =(WrappedComponent,Axios) =>{
    return class extends Component{
        state={
            error: null
        }
        componentWillMount(){
            this.reqIntercepter= Axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.respIntercepter= Axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error});
            });
        }
        errorHandlerclosed=()=>{
            this.setState({error:null})
        }
        componentWillUnmount(){
            Axios.interceptors.request.eject(this.reqIntercepter);
            Axios.interceptors.response.eject(this.respIntercepter);
        }
        render(){
            return <Aux>
                <Modal 
                show={this.state.error}
                modalclosed={this.errorHandlerclosed}
                >
                {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Aux>
        }
    }
}
export default withErrorHandler;
