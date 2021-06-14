import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {STATS_ANNOUNCES_URL} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function statsAnnounces() {
    let config = setAxiosConfig('GET', STATS_ANNOUNCES_URL, false);
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;
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
