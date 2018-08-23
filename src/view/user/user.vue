/* * @Author: tarn.tianrun * @Date: 2018-08-23 09:32:11 * @Last Modified by: tarn.tianrun * @Last Modified time: 2018-08-23
09:37:37 */
<style lang="less">
	@import '../excel/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span class="margin-left-10">用户名称：</span>
				<Input placeholder="请输入用户名称" v-model="params.username" clearable style="width: 150px"></Input>
				<span class="margin-left-10">用户账号：</span>
				<Input placeholder="请输入用户账号" v-model="params.name" clearable style="width: 150px"></Input>
				<span class="margin-left-10">用户类型：</span>
				<Select v-model="params.type" style="width: 150px" clearable>
					<Option v-for="(option, index) in status" :value="option.value" :key="index">{{option.label}}</Option>
				</Select>
				<Button class="margin-left-10" type="primary" icon="ios-search" @click="fetchList">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table stripe border :columns="tableColumns" :data="resultValue"></Table>
				<!-- <div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="page.page" @on-change="changePage"></Page>
					</div>
				</div> -->
			</Card>
		</Row>
	</div>
</template>
<script>
	import userApi from '@/api/users'
	const api = new userApi();
	export default {
		data() {
			return {
				params : {
					page:1,
					limit:10,
					username:'',
					name:'',
					type:'',
				},
				status: [
					{
						value: '1',
						label: '待开课'
					},
					{
						value: '2',
						label: '开课中'
					},
					{
						value: '3',
						label: '已完成'
					},
				],
				resultValue:[],
				tableColumns: [  //表头
					{
						title: 'ID',
						key: 'userId',
						width: 80,
						align: 'center',
					},
					{
						title: '用户名称',
						key: 'name',
						align: 'center',
					},
					{
						title: '用户账号',
						key: 'username',
						align: 'center',
					},
					{
						title: '创建时间',
						key: 'gmtCreate',
						align: 'center',
					},
					{
						title: '所属行业',
						key: 'typePName',
						align: 'center',
					},
					{
						title: '用户角色',
						key: 'typeName',
						align: 'center',
					},
					{
						title: '用户类型',
						key: 'type',
						align: 'center',
						render: (h, params) => {
							return h('span', params.row.type == 0 ? '1' : '2')
						}
					},
					{
						title: '用户状态',
						key: 'status',
						align: 'center',
						render: (h, params) => {
							return h('span', params.row.status == 0 ? '启用' : '禁用')
						}
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Button', {
									props: {
										type: 'primary',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											
										}
									}
								}, '编辑'),
								// h('Button', {
								// 	props: {
								// 		type: 'error',
								// 		size: 'small'
								// 	},
								// 	style: {
								// 		marginRight: '5px'
								// 	},
								// 	on: {
								// 		click: () => {
											
								// 		}
								// 	}
								// }, '删除')
							]);
						}
					}
				],
			}
		},
		beforeMount() {
			this.fetchList()
		},
		methods:{
			fetchList(){
				api.handleUsersList(this.params).then(res => {
					console.log(res.data,'res')
					this.resultValue = res.data.records
				})
			}
		}
	}
</script>