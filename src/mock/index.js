import Mock from 'mockjs'
import { login, logout, getUserInfo } from './login'
import { getMenuTreeData } from './menu'
import { getTableData } from './data'

// 登录相关和获取用户信息
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_table_data/, getTableData)

//菜单数据
Mock.mock(/\/get_menutree_data/, getMenuTreeData)

export default Mock
