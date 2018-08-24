import axios from '@/libs/api.request'

//用户管理API
class roleApi {
	//获取菜单树
	getMenuTreeData() {
		return axios.request({
			url: 'menu/allTree',
			method: 'GET'
		})
	}
	//获取角色列表
	handleRoleUserList(params) {
		return axios.request({
			url: 'role/rolePage',
			method: 'POST',
			data: params
		})
	}
	//增加角色
	handleAddUpdateRoleUser(params, isNew) {
		return axios.request({
			url: 'role',
			method: isNew ? 'POST' : 'PUT',
			data: params
		})
	}
	//删除角色
	handleRemoveRoleUser(id) {
		return axios.request({
			url: `role/${id}`,
			method: 'DELETE',
		})
	}
	//根据code获取权限树
	handleRoleUserTree(code) {
		return axios.request({
			url: `menu/findMenuByRole/${code}`,
			method: 'GET',
		})
	}
	//获取某个角色信息
	handleGetOneRoleUser(id) {
		return axios.request({
			url: `role/${id}`,
			method: 'GET',
		})
	}
	handleUpdataTreeNode(params) {
		return axios.request({
			url: 'role/roleMenuUpde',
			method: 'PUT',
			data: params
		})
	}
}
export default roleApi 