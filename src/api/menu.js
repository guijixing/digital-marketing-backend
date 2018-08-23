import axios from '@/libs/api.request'

//菜单管理API
class menuTreeApi {
	getMenuTreeData() {
		return axios.request({
			url: 'menu/allTree',
			method: 'GET'
		})
	}

	handleAddTreeNodeApi(params) {
		return axios.request({
			url: 'menu',
			method: 'POST',
			data: params,
		})
	}

	handleDeleteTreeNodeApi(id) {
		return axios.request({
			url: `menu/${id}`,
			method: 'DELETE',
		})
	}

	handleUpdateTreeNodeApi(params) {
		return axios.request({
			url: 'menu',
			method: 'PUT',
			data:params,
		})
	}
}
export default menuTreeApi 