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
				<Table stripe border :loading="loading" :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-total :total="total" :current="params.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
    <Modal
      title="编辑标签值"
      v-model='modalFlag'
      :closable="false"
      :mask-closable="false"
      footer-hide>
      <Form :model="model" :label-width="120">
          <FormItem label="所属行业（多选）">
              <Select v-model="model.tradList" multiple style="width: 350px" clearable>
                <Option v-for="(option, index) in status" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
          </FormItem>
          <FormItem label="个性化折扣">
              <Input v-model="model.sale" style="width: 350px" placeholder="请输入（0.01-1）"></Input>
          </FormItem>
          <FormItem ng-if="model.type==='1'" label="用户角色">
              <Select v-model="model.role" style="width: 350px" clearable>
                <Option v-for="(option, index) in roles" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
          </FormItem>
          <div class="center width-100">
              <Button @click="cancelModal" type="default">取消</Button>
              <Button @click="saveModal" type="primary">保存</Button>
          </div>
      </Form>
  </Modal>
	</div>
</template>
<script>
	import userApi from '@/api/users'
	const api = new userApi();
	export default {
		data() {
			return {
        total:null,
        loading:true,
        modalFlag:false,
				params : {
					page:1,
					limit:10,
					username:'',
					name:'',
					type:'',
        },
        model:{
          tradList:[],
          sale:null,
          role:null
        },
        modelTemp:{
          tradList:[],
          sale:null,
          role:null
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
        roles: [
					{
						value: '1',
						label: '超级管理员'
					},
					{
						value: '2',
						label: '数据管理员'
					},
					{
						value: '3',
						label: '管理员'
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
                      this.editUser(params.row);
										}
									}
								}, '编辑')
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
        this.loading=true;
				api.handleUsersList(this.params).then(res => {
          this.loading = false;
					this.total = res.data.total;
					this.resultValue = res.data.records
				});
      },
      changePage(pageNum){
        this.params.page  = pageNum;
        this.fetchList();
      },
      editUser(row){
        this.model = Object.assign(row);
        this.modalFlag = true;
      },
      saveModal(){
          api.saveUser(this.model).then(res=>{
              if(!res.data.success){
                this.Message.error('编辑失败，请重试');
                return;
              }
              this.model = Object.assign(this.modelTemp);
              this.modalFlag = false;
              this.fetchList();
          })
      },
      cancelModal(){
        this.model = Object.assign(this.modelTemp);
        this.modalFlag = false;
      }
		}
	}
</script>
