import axios from '@/libs/api.request'

//标签管理
class tagsApi {

  //#region  基础标签
  getBaseList(params) {
    return axios.request({
      url: 'query/tag/base/listPage',
      method: 'POST',
      data: params
    })
  }

  // 通过id查询单条基础标签信息
  getBaseById(id) {
    return axios.request({
      url: `query/tag/base/${id}`,
      method: 'GET'
    })
  }
  // 上下架
  editStatus(params) {
    return axios.request({
      url: 'query/tag/base/status',
      method: 'PUT',
      data: params
    })
  }

  // 新增基础标签
  addBaseTag(params) {
    return axios.request({
      url: 'query/tag/base',
      method: 'POST',
      data: params
    })
  }

  // 编辑基础标签
  editBaseTag(params) {
    return axios.request({
      url: 'query/tag/base',
      method: 'PUT',
      data: params
    })
  }

  // 删除基础标签
  delBaseTag(params) {
    return axios.request({
      url: 'query/tag/base',
      method: 'DELETE',
      data: params
    })
  }
  //#endregion

  //#region  行业标签
  // 获取行为类型列表
  getOperationList() {
    return axios.request({
      url: 'query/tag/operation/list',
      method: 'GET'
    })
  }
  // 根据行为类型tab分页查询行业标签
  getTradeList(params) {
    return axios.request({
      url: 'query/trade/tag/listPage',
      method: 'POST',
      data: params
    })
  }

  // 根据id获得行业标签详细信息
  getTradeTagById(id) {
    return axios.request({
      url: `query/trade/tag/{id}`,
      method: 'GET'
    })
  }

  // 上下架
  editStatus(params) {
    return axios.request({
      url: 'query/trade/tag/status',
      method: 'PUT',
      data: params
    })
  }

  // 新增行业标签
  addTradeTag(params) {
    return axios.request({
      url: 'query/trade/tag',
      method: 'POST',
      data: params
    })
  }
  // 编辑行业标签
  editTradeTag(params) {
    return axios.request({
      url: 'query/trade/tag',
      method: 'PUT',
      data: params
    })
  }

  // 删除行业标签
  delTradeTag(params) {
    return axios.request({
      url: 'query/trade/tag',
      method: 'DELETE',
      data: params
    })
  }
  //#endregion

}
export default tagsApi
