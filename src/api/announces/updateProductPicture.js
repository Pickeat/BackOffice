import setAxiosConfig from "../../helpers/setAxiosConfig";
import axios from "axios";
import {EDIT_ANNOUNCES_PICTURE} from '../../constants/apiEndpoints';
import Cookies from "js-cookie";

export default async function UpdateProductPicture(data, id) {
  const formData = new FormData();
  const endPoint = EDIT_ANNOUNCES_PICTURE + '/' + id
  let config = setAxiosConfig('POST', endPoint, true);
  let token = Cookies.get('jwt');

  config['headers']['Authorization'] = `Bearer ${token}`;
  formData.append('file', data);
  config['headers']['Content-Type'] = 'multipart/form-data';
  config['data'] = formData;
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
