let API_SERVER_VAL = ''
let SOCKET_URL_VAL = ''

switch (process.env.NODE_ENV) {
  case 'development':
    API_SERVER_VAL = 'http://127.0.0.1:8000'
    SOCKET_URL_VAL = 'ws://127.0.0.1:8000'
    break
  case 'production':
    API_SERVER_VAL = 'polyglotten.com'
    SOCKET_URL_VAL = 'ws://127.0.0.1:8000'
    break
  default:
    API_SERVER_VAL = 'http://127.0.0.1:8000'
    SOCKET_URL_VAL = 'ws://127.0.0.1:8000'
    break
}

export const API_SERVER = API_SERVER_VAL
export const SOCKET_URL = SOCKET_URL_VAL
