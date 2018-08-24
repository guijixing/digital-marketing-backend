/*
 * @Author: tarn.tianrun 
 * @Date: 2018-08-24 16:19:11 
 * @Last Modified by:   tarn.tianrun 
 * @Last Modified time: 2018-08-24 16:19:11 
 */
<template>
	<div>
		<Row>
			<Card>
				<ButtonGroup>
					<Button type="primary" @click="addTreeNode">添加</Button>
					<Button type="primary" @click="updateTreeNode">编辑</Button>
					<Button type="primary" @click="deleteTreeNode">删除</Button>
				</ButtonGroup>
			</Card>
		</Row>
		<Row>
			<Col span="6">
			<Card>
				<Tree :data="treeData" @on-select-change="changeTree"></Tree>
			</Card>
			</Col>
			<Col span="18">
			<Card>
				<Form ref="formValidate" :model="formValidate" :label-width="80">
					<FormItem label="父级节点" prop="parentId">
						<Input v-model="formValidate.parentId" disabled placeholder="请输入父级节点"></Input>
					</FormItem>
					<FormItem label="节点ID" prop="id">
						<Input v-model="formValidate.id" :disabled="disabledItem" placeholder="请输入节点ID"></Input>
					</FormItem>
					<FormItem label="标题" prop="title">
						<Input v-model="formValidate.title" :disabled="disabledItem" placeholder="请输入标题"></Input>
					</FormItem>
					<FormItem label="权限标识" prop="code">
						<Input v-model="formValidate.code" :disabled="disabledItem" placeholder="请输入权限标识"></Input>
					</FormItem>
					<FormItem label="图标" prop="icon">
						<Input v-model="formValidate.icon" :disabled="disabledItem" placeholder="请输入图标"></Input>
					</FormItem>
					<FormItem label="排序" prop="sort">
						<Input v-model="formValidate.sort" :disabled="disabledItem" placeholder="请输入排序"></Input>
					</FormItem>
					<FormItem label="前端地址" prop="path">
						<Input v-model="formValidate.path" :disabled="disabledItem" placeholder="请输入前端地址"></Input>
					</FormItem>
					<FormItem>
						<Button v-if="!disabledItem && isNew" type="primary" @click="handleAddTreeMenuNode">保存</Button>
						<Button v-if="!disabledItem && !isNew" type="primary" @click="handleUpdateTreeMenuNode">更新</Button>
						<Button v-if="!disabledItem" style="margin-left: 8px">取消</Button>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import menuApi from '@/api/menu'
	const api = new menuApi();

	export default {
		data() {
			return {
				disabledItem: true, //是否禁用formitem
				formValidate: { 	//formItem
					parentId: '',
					id: '',
					title: '',
					code: '',
					icon: '',
					sort: '',
					path: ''
				},
				treeData: [], 		//菜单树
				isNew: true,
			}
		},
		beforeMount() {
			//获取菜单树
			this.getMenuTreeData()
		},
		methods: {
			//获取菜单树
			getMenuTreeData() {
				api.getMenuTreeData().then(res => {
					this.treeData = res.data
				}).catch(err => {

				})
			},
			//点击菜单树
			changeTree(treeNode) {
				this.isNew = false
				if (treeNode[0]) {
					this.formValidate = treeNode[0]
				}
			},
			//新增菜单树
			addTreeNode() {
				this.isNew = true
				this.disabledItem = false
				if (!this.formValidate.parentId) {
					this.formValidate.parentId = '-1'
				} else {
					this.formValidate.parentId = this.formValidate.id
					this.resetFormNoP()
				}
			},
			//确认增加
			handleAddTreeMenuNode() {
				var params = {
					menuId: this.formValidate.id,
					name: this.formValidate.title,
					permission: this.formValidate.code,
					parentId: this.formValidate.parentId,
					icon: this.formValidate.icon,
					sort: this.formValidate.sort,
					type: 0,
					path: this.formValidate.path,
				}
				api.handleAddTreeNodeApi(params).then(res => {
					if (res.data) {
						this.$Message.success('新增成功！');
						this.getMenuTreeData()
						this.resetForm()
					}
				}).catch(err => {

				})
			},
			//删除菜单树
			deleteTreeNode() {
				this.$Modal.confirm({
					title: '提示',
					content: '<p>此操作将永久删除, 是否继续?</p>',
					onOk: () => {
						api.handleDeleteTreeNodeApi(this.formValidate.id).then(res => {
							this.$Message.success('删除成功！');
							this.getMenuTreeData()
							this.resetForm()
						}).catch(err => {

						})
					}
				});
			},
			//更新菜单树
			updateTreeNode() {
				this.isNew = false
				this.disabledItem = false
			},
			//更新菜单树
			handleUpdateTreeMenuNode() {
				var params = {
					menuId: this.formValidate.id,
					name: this.formValidate.title,
					permission: this.formValidate.code,
					parentId: this.formValidate.parentId,
					icon: this.formValidate.icon,
					sort: this.formValidate.sort,
					type: 0,
					path: this.formValidate.path,
				}
				api.handleUpdateTreeNodeApi(params).then(res => {
					if (res.data) {
						this.$Message.success('更新成功！');
						this.getMenuTreeData()
						this.resetForm()
					}
				}).catch(err => {

				})
			},
			//重置formItem——不包含parentId
			resetFormNoP() {
				var parentId = this.formValidate.parentId
				this.formValidate = {
					parentId: parentId,
					id: '',
					title: '',
					code: '',
					icon: '',
					sort: '',
					path: ''
				}
			},
			//重置formItem
			resetForm() {
				this.formValidate = {
					parentId: '',
					id: '',
					title: '',
					code: '',
					icon: '',
					sort: '',
					path: ''
				}
			}
		}
	}
</script>