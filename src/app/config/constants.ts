//const ROOT_URL = "http://127.0.0.1:8080"
const ROOT_URL = 'http://studapps.cg.helmo.be:5005/REST_GABER';
export const SOCKET_ENDPOINT = ROOT_URL + "/ws";
//User
export const USER_ENDPOINT = ROOT_URL + '/users';
export const LOGIN = USER_ENDPOINT + '/login';
export const LOGINWITH = USER_ENDPOINT + '/loginWith';
export const REGISTER = USER_ENDPOINT + '/register';

//Crypto list
export const CRYPTO_LIST_ENDPOINT = ROOT_URL + '/coinList';
export const CRYPTO_ENDPOINT = ROOT_URL + '/coin';
export const CRYPTO_HISTORY = `${ROOT_URL}/history`;

//Order
export const ODER_ENDPOINT = ROOT_URL + '/order';

//Mail
export const MAIL_ENDPOINT = ROOT_URL + '/mail';

//Ranking
export const PLAYER_ENDPOINT = ROOT_URL + '/players';

//Chat
export const GET_MESSAGES = ROOT_URL + "/chat";
export const SEND_MESSAGE = (cryptoId: string | undefined) => "/ws/app/send/" + cryptoId;
export const TRANSFER_URL = (cryptoId: string | null) => "/ws/transfer/" + cryptoId;

//Notification

export const NOTIFICATION = `${ROOT_URL}/notification`;
export const SEND_NOTIFICATIONS = `${NOTIFICATION}/send-message`

//Preference
export const PREFERENCES = `${ROOT_URL}/preference`;

