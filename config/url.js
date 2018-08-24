import env from './env'

// const DEV_URL = 'https://www.easy-mock.com/mock/5add9213ce4d0e69998a6f51/iview-admin/'
// const DEV_URL = 'http://192.168.10.141:4000/admin/'
const DEV_URL = 'http://39.107.126.201:4000/'

const PRO_URL = 'https://produce.com'

export default env === 'development' ? DEV_URL : PRO_URL
