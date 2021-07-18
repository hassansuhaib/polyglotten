let API_SERVER_VAL = ''

switch (process.env.NODE_ENV) {
  case 'development':
    API_SERVER_VAL = 'http://127.0.0.1:8000'
    break
  case 'production':
    API_SERVER_VAL = 'polyglotten.com'
    break
  default:
    API_SERVER_VAL = 'http://127.0.0.1:8000'
    break
}

export const API_SERVER = API_SERVER_VAL
