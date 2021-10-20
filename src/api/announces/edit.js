import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {EDIT_ANNOUNCES_URL} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function editAnnouce(data, id) {
    const endPoint = EDIT_ANNOUNCES_URL + '/' + id
    let config = setAxiosConfig('POST', endPoint, true);
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;
    config['data'] = data;
    return await axios(config).then((response) => {
        if (response.status === 200) {
            return {success: response.data};
        } else {
            return {warning: response.data.message}
        }
    }).catch((error) => {
        throw error;
    });
}
