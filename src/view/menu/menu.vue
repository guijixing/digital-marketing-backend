<template>
	<div>
		<Row>
			<Card>
				<ButtonGroup>
					<Button type="primary">添加</Button>
					<Button type="primary">编辑</Button>
					<Button type="primary">删除</Button>
				</ButtonGroup>
			</Card>
		</Row>
		<Row>
			<Col span="6">
			<Card>
				<Tree :data="treeData"></Tree>
			</Card>
			</Col>
			<Col span="18">
			<Card>
				<Form ref="formValidate" :model="formValidate" :label-width="80">
					<FormItem label="父级节点" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入父级节点"></Input>
					</FormItem>
					<FormItem label="节点ID" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入节点ID"></Input>
					</FormItem>
					<FormItem label="标题" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入标题"></Input>
					</FormItem>
					<FormItem label="权限标识" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入权限标识"></Input>
					</FormItem>
					<FormItem label="图标" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入图标"></Input>
					</FormItem>
					<FormItem label="排序" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入排序"></Input>
					</FormItem>
					<FormItem label="前端地址" prop="name">
						<Input v-model="formValidate.name" placeholder="请输入前端地址"></Input>
					</FormItem>
				</Form>
			</Card>
			</Col>
		</Row>
	</div>
</template>
<script>
	import { getMenuTreeData } from '@/api/menu'

	export default {
		data() {
			return {
				data1: [
					{
						title: 'parent 1',
						expand: true,
						children: [
							{
								title: 'parent 1-1',
								expand: true,
								children: [
									{
										title: 'leaf 1-1-1'
									},
									{
										title: 'leaf 1-1-2'
									}
								]
							},
							{
								title: 'parent 1-2',
								expand: true,
								children: [
									{
										title: 'leaf 1-2-1'
									},
									{
										title: 'leaf 1-2-1'
									}
								]
							}
						]
					}
				],
				formValidate: {
					name: '',
				},
				treeData: [],
			}
		},
		beforeMount() {
			getMenuTreeData().then(res => {
				this.treeData = res.data
			}).catch(err => {
				reject(err)
			})
		},
	}
</script>