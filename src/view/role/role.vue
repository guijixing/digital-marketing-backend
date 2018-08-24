/*
 * @Author: tarn.tianrun 
 * @Date: 2018-08-24 16:30:03 
 * @Last Modified by: tarn.tianrun
 * @Last Modified time: 2018-08-24 16:30:25
 */

<style lang="less">
	.spin-icon-load {
		animation: ani-demo-spin 1s linear infinite;
	}
</style>
<template>
	<div>
		<Row>
			<Card>
				<Button @click="showAddNewRoleUserModal" class="margin-left-10" type="primary" icon="md-add">添加</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator @on-page-size-change="changePage" :total="pageTotal" :current="params.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
		<Modal v-model="showAddNewRoleUser" :title="title" @on-ok="addNewRoleUser" @on-cancel="cancelAdd">
			<Form ref="form" :model="form" :label-width="80">
				<FormItem label="角色名称：" prop="roleName">
					<Input v-model="form.roleName" placeholder="请输入角色名称"></Input>
				</FormItem>
				<FormItem label="角色标识：" prop="roleCode">
					<Input v-model="form.roleCode" placeholder="请输入角色名称"></Input>
				</FormItem>
				<FormItem label="角色描述：" prop="roleDesc">
					<Input v-model="form.roleDesc" placeholder="请输入角色名称"></Input>
				</FormItem>
			</Form>
		</Modal>
		<Modal v-model="showRoleUserTreeModal" title="分配权限" @on-ok="updateTreeNodeData">
			<Tree v-if="allTreeDataSelect" :data="allTreeDataSelect" show-checkbox @on-check-change="clickNode"></Tree>
			<Spin fix v-if="spinShow">
				<Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>
				<div>Loading</div>
			</Spin>
		</Modal>
	</div>
</template>
<script>
	import roleApi from '@/api/role'
	const api = new roleApi();

	export default {
		data() {
			return {
				loading: false,					//表格loading
				spinShow: false,				//loading
				showAddNewRoleUser: false,		//modal
				pageTotal: null,					//总页数
				showRoleUserTreeModal: false,	//控制权限树
				allTreeData: [],				//权限树
				allTreeDataSelect: [],			//选中的权限树
				treeNodeData: [],				//角色拥有的权限树
				title: '创建',					//默认标题
				isNew: true,					//是否新增
				params: {						//默认参数
					page: 1,
					limit: 10,
				},
				form: {							//Modal参数
					roleName: '',
					roleCode: '',
					roleDesc: '',
				},
				treeData: {
					roleId: '',
					menuIds: [],
				},
				resultValue: [],				//列表数据
				tableColumns: [  				//表头
					{
						title: 'ID',
						key: 'roleId',
						width: 80,
						align: 'center',
					},
					{
						title: '角色名称',
						key: 'roleName',
						align: 'center',
					},
					{
						title: '角色标识',
						key: 'roleCode',
						align: 'center',
					},

					{
						title: '角色描述',
						key: 'roleDesc',
						align: 'center',
					},
					{
						title: '创建时间',
						key: 'createTime',
						align: 'center',
					},
					{
						title: '操作',
						key: 'action',
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
											//显示单个角色数据
											this.showUpdateRoleUser(params.row.roleId)
										}
									}
								}, '编辑'),
								h('Poptip', {
									props: {
										confirm: true,
										title: '您确定要删除这条数据吗?',
										transfer: true
									},
									on: {
										'on-ok': () => {
											//删除数据
											this.removeRoleUser(params.row.roleId)
										}
									}
								}, [
										h('Button', {
											style: {
												marginRight: '5px'
											},
											props: {
												size: 'small',
												type: 'error',
												placement: 'top'
											}
										}, '删除')
									]),
								h('Button', {
									props: {
										type: 'warning',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											//显示权限
											this.showRoleUserTree(params.row.roleCode, params.row.roleId)
										}
									}
								}, '权限')
							]);
						}
					}
				],
			}
		},
		beforeMount() {
			//获取角色列表
			this.fetchList()
			this.loading = true
			//获取菜单树
			api.getMenuTreeData().then(res => {
				this.allTreeData = res.data
			})
		},
		watch: {
			isNew: function () {
				if (this.isNew) {
					this.title = '创建'
				} else {
					this.title = '更新'
				}
			}
		},
		methods: {
			//获取角色列表
			fetchList() {
				api.handleRoleUserList(this.params).then(res => {
					this.resultValue = res.data.records
					this.loading = false
				})
			},
			//分页
			changePage(pageNum) {
				this.loading = true
				this.params.page = pageNum
				this.fetchList()
			},
			//新增角色
			addNewRoleUser() {
				api.handleAddUpdateRoleUser(this.form, this.isNew).then(res => {
					if (res.data) {
						this.$Message.success(this.isNew ? '新增成功！' : '更新成功');
						this.fetchList()
						this.resetForm()
					}
				})
			},
			//删除角色
			removeRoleUser(id) {
				api.handleRemoveRoleUser(id).then(res => {
					if (res.data) {
						this.$Message.success('删除成功！');
						this.fetchList()
						this.resetForm()
					}
				})
			},
			//显示Modal
			showAddNewRoleUserModal() {
				this.showAddNewRoleUser = true
				this.isNew = true
			},
			//查询单个角色
			showUpdateRoleUser(id) {
				api.handleGetOneRoleUser(id).then(res => {
					this.isNew = false
					this.showAddNewRoleUser = true
					this.form = res.data
				})
			},
			//查询角色拥有的权限树
			showRoleUserTree(code, id) {
				this.treeData.roleId = id
				this.spinShow = true
				this.showRoleUserTreeModal = true
				api.handleRoleUserTree(code).then(res => {
					this.treeNodeData = res
					this.handleTreeData()
				})
			},
			//处理权限树的回填
			handleTreeData() {
				this.allTreeData.forEach(all => {
					this.$set(all, 'checked', false)
					if (all.children) {
						all.children.forEach(children => {
							this.$set(children, 'checked', false)
						});
					}
					this.treeNodeData.forEach(tree => {
						if (all.id == tree.menuId) {
							this.$set(all, 'checked', true)
						}
						if (all.children) {
							all.children.forEach(children => {
								if (children.id == tree.menuId) {
									this.$set(children, 'checked', true)
								}
							});
						}
					});
				});
				this.allTreeDataSelect = this.allTreeData
				this.spinShow = false
			},
			//取消Modal
			cancelAdd() {
				this.resetForm()
			},
			//更新
			updateTreeNodeData() {
				api.handleUpdataTreeNode(this.treeData).then(res => {
					if (res.data) {
						this.$Message.success('更新成功！');
						this.getMenuTreeData()
						this.resetForm()
					}
				})
			},
			clickNode(params) {
				this.treeData.menuIds = []
				var id = '', reg = /,$/gi;
				params.forEach(element => {
					this.treeData.menuIds.push(element.id)
				});
			},
			//重置form
			resetForm() {
				this.form = {
					roleName: '',
					roleCode: '',
					roleDesc: '',
				}
			}
		}
	}
</script>