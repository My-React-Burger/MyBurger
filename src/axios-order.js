import Axios from 'axios';
const instances=Axios.create({
    baseURL:'https://react-my-burger-a7764.firebaseio.com/'
});
export default instances;