import axios from '@/libs/api.request'

//用户管理API
class usersApi {
	handleUsersList(params) {
		return axios.request({
			url: 'user/userPage',
			method: 'POST',
			data: params
		})
	}
}
export default usersApi 