const BASE_URL = process.env.REACT_APP_API_URL;

export const SIGN_IN_URL = BASE_URL + '/auth/login';
export const REGISTER_URL = BASE_URL + '/auth/register';
export const LIST_USERS_URL = BASE_URL + '/users/list';
export const EDIT_USERS_URL = BASE_URL + '/users/edit';
export const EDIT_USERS_PICTURE = BASE_URL + '/users/edit/user_picture';
export const LIST_ANNOUNCES_URL = BASE_URL + '/products/list';
export const EDIT_ANNOUNCES_URL = BASE_URL + '/products/edit';
export const EDIT_ANNOUNCES_PICTURE = BASE_URL + '/products/edit/product_picture';
export const STATS_USERS_URL = BASE_URL + '/stats/users';
export const STATS_ANNOUNCES_URL = BASE_URL + '/stats/announces';


