<style lang="less">
	@import '../excel/common.less';
</style>
<template>
	<div>
		<Row>
			<Card>
				<span>用户编号：</span>
				<Input v-model="page.userNo" placeholder="请输入用户编号" clearable style="width: 150px"></Input>
				<span class="margin-left-10">手机号码：</span>
				<Input v-model="page.phoneNumber" placeholder="请输入手机号码" clearable style="width: 150px"></Input>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="ios-search">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-total :total="total" :current="page.current" @on-change="changePage"></Page>
					</div>
          <Button style="float: left;" @click="add" type="primary">添加记录</Button>
				</div>
			</Card>
		</Row>
    <Modal
      title="编辑记录"
      v-model='modalFlag'
      :closable="false"
      :mask-closable="false"
      footer-hide>
      <Form :model="model" :label-width="80">
          <FormItem label="用户编号">
              <Input v-model="model.userNo" style="width: 90%;" placeholder="请输入(最多输入6个汉字/12个字符)"></Input>
          </FormItem>
          <FormItem label="手机号码">
              <Input v-model="model.phoneNumber" style="width: 90%;" placeholder="请输入"></Input>
          </FormItem>
          <FormItem  label="备注">
             <Input v-model="model.remark" type="textarea" :rows="4" style="width: 90%;" placeholder="请输入"></Input>
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
	import disturbsApi from '@/api/disturbs'
  const api = new disturbsApi();
	export default {
		data() {
			return {
				resultValue: [], // 列表数据
				total: null, // 总页数

				page: {
					current: 1, // 当前页数
					size: 10, // 每页显示条数
					type: '1',
					userNo: '', // 用户编号
					phone: '' // 手机号码
				},
				loading: true, // 表格加载动画
        modalFlag:false,
        model:{
          userNo:null,
          phoneNumber:null,
          type:1,
          remark:null,
          manager:'1'
        },
        modelTemp:{
          userNo:null,
          phoneNumber:null,
          type:1,
          remark:null,
          manager:'1'
        },
				tableColumns: [ // 表头
					{
						title: '序号',
						type: 'index',
						width: 80,
						align: 'left'
					},
					{
						title: '用户编号',
						key: 'userNo',
						align: 'left'
					},
					{
						title: '手机号码',
						key: 'phoneNumber',
						align: 'left'
					},
					{
						title: '备注',
						key: 'remark',
						align: 'left'
					},
					{
						title: '操作',
						key: 'action',
						width: 150,
						align: 'left',
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
											 this.edit(params.row);
										}
									}
								}, '编辑'),
								h('Button', {
									props: {
										type: 'error',
										size: 'small'
									},
									style: {
										marginRight: '5px'
									},
									on: {
										click: () => {
											this.handleRemove(params.row.id)
										}
									}
								}, '删除')
							])
						}
					}
				]
			}
		},
		beforeMount() {
			this.fetchList()
		},
		methods: {
			// 获取数据
			fetchList() {
        this.loading = true
				api.getDisturbedList(this.page).then(res => {
          this.loading = false
          this.resultValue = res.data.records
			  	this.total = res.data.total
				})
			},
			// 分页
			changePage(pageNum) {
				this.page.current = pageNum
				this.fetchList()
      },

			// 删除资讯
			handleRemove(id) {
				var param = {
					idList: [id]
				}
				api.delDisturbed(param).then((res) => {
          if(res.data.success){
            this.Message.success('删除成功')
            this.fetchList()
            return;
          }
					this.Message.error('删除失败，请重试')
				})
      },
      add(){
        this.model = Object.assign(this.modelTemp);
        this.modalFlag = true;
      },
      edit(row){
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
        this.modalFlag = false;
      }
		}
	}
</script>
