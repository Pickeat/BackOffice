import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {EDIT_USERS_URL} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function edit(data) {
    console.log(data)
    const endPoint = EDIT_USERS_URL + '/' + data._id
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
