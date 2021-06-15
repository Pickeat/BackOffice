import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {REGISTER_URL} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function createUser(name, email, password) {
    let body = {
        'name': name,
        'email': email,
        'password': password
    };
    let config = setAxiosConfig('POST', REGISTER_URL, false);
    let token = Cookies.get('jwt');

    config['headers']['Authorization'] = `Bearer ${token}`;
    config['data'] = body;
    if (!email || !password || !name) {
        return {warning: "Un ou plusieurs champ(s) est/sont vide(s)"};
    }
    console.log(body)
    return await axios(config).then((response) => {
        console.log(response);
        if (response.status === 201) {
            return {success: response.data};
        } else {
            return {warning: response.data.message}
        }
    }).catch((error) => {
        throw error;
    });
}
