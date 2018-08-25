import axios from '@/libs/api.request'

//免打扰管理API
class disturbsApi {
  getDisturbedList(params) {
    return axios.request({
      url: 'szyx-admin/disturbed/getDisturbedList',
      method: 'POST',
      data: params
    })
  }
  // 删除红/黑名单
  delDisturbed(params) {
    return axios.request({
      url: 'admin/disturbed',
      method: 'DELETE',
      data: params
    });
  }
  // 新增/编辑 红/黑名单
  editDisturbed(params) {
    return axios.request({
      url: 'admin/disturbed',
      method: 'POST',
      data: params
    })
  }
}
export default disturbsApi
