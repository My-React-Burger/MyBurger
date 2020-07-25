import Axios from 'axios';
const instances=Axios.create({
    baseURL:'ThisUrlwillbeaddedbyyou'
});
export default instances;
