import axios from '@/libs/api.request'

export const getMenuTreeData = () => {
  return axios.request({
    url: 'get_menutree_data',
    method: 'get'
  })
}
