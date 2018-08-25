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

  saveUser(params) {
		return axios.request({
			url: 'admin/user',
			method: 'PUT',
			data: params
		})
  }

  // 获取一级行业列表
  getTradeList(){
    return axios.request({
			url: 'admin/trade/list',
			method: 'GET'
		})
  }
}
export default usersApi
