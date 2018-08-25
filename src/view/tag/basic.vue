<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
		<Row>
			<Card class="seach-condition">
				<span>标题名称：</span>
				<Input v-model="page.name" placeholder="请输入标题名称" clearable style="width: 150px"></Input>
				<span>标签类型：</span>
				<Select v-model="page.kind" clearable style="width:150px">
						<Option v-for="item in cKind" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				 <span>标签状态：</span>
				<Select v-model="page.status" clearable style="width:150px">
						<Option v-for="item in cStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="ios-search">筛选</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-total :total="total" :current="page.current" @on-change="changePage"></Page>
					</div>
          <Button to="basic-detail" type="warning" >添加新标签</Button>
				</div>
			</Card>
		</Row>
	</div>
</template>

<script>
import tagsApi from '@/api/tags'
const api = new tagsApi
export default {
  data () {
    return {
      cKind:this.$constants.cKind,
      cStatus:this.$constants.cStatus,
      resultValue: [], // 列表数据
      total: null, // 总页数
      page: {
        current: 1, // 当前页数
        size: 10, // 每页显示条数
        name: '', // 标题名称
        kind: '', // 标签类型
        status: ''// 标签状态
      },
      loading: true, // 表格加载动画
      tableColumns: [ // 表头
        {
          title: '序号',
          type: 'index',
          width: 80,
          align: 'left'
        },
        {
          title: '标签名称',
          key: 'name',
          align: 'left'
        },
        {
          title: 'ES列名',
          key: 'esField',
          align: 'left'
        },
        {
          title: '类型',
          key: 'kind',
          align: 'left'
        },
        {
          title: '属性',
          key: 'property',
          align: 'left'
        },
          	{
          title: '状态',
          key: 'status',
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
                    this.show(params.row.id)
                  }
                }
              }, '查看详情'),
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
                    this.$router.push({
												name: 'basic-detail',
												params: params.row.id
											});
                  }
                }
              }, '下架'),
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
  beforeMount () {
    this.fetchList()
  },
  methods: {
    // 获取数据
    fetchList () {
      this.loading = true
      api.getBaseList(this.page).then(res => {
        this.loading = false
        this.resultValue = res.data.records
        this.total = res.data.total
      }).catch(error=>{
        this.loading = false
      })
    },
    // 分页
    changePage (pageNum) {
      this.page.current = pageNum
      this.fetchList()
    },
    handleRemove(id) {
				var param = {
					idList: [id]
				}
				api.delBaseTag(param).then((res) => {
          if(res.success){
            this.$Message.success('删除成功')
            this.fetchList()
            return;
          }
					this.$Message.error('删除失败，请重试')
				})
      },


  }
}
</script>
