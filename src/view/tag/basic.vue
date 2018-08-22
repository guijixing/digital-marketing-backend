<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
		<Row>
			<Card class="seach-condition">
				<span>标题名称：</span>
				<Input v-model="page.infoTitle" placeholder="请输入标题名称" clearable style="width: 150px"></Input>
				<span>标签类型：</span>
				<Select v-model="page.type" clearable style="width:150px">
						<Option v-for="item in fType" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				 <span>标签状态：</span>
				<Select v-model="page.state" clearable style="width:150px">
						<Option v-for="item in fState" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">筛选</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pages" :current="page.current" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>

<script>
export default {

  data () {
    return {
      resultValue: [], // 列表数据
      pages: null, // 总页数
      page: {
        current: 1, // 当前页数
        size: 10, // 每页显示条数
        infoTitle: '', // 标题名称
        type: '', // 标签类型
        state: ''// 标签状态
      },
      loading: true, // 表格加载动画
      fType: [// 标签类型
        {
          value: '1',
          label: '常用标签'
        },
        {
          value: '0',
          label: '非常用标签'
        }
      ],
      fState: [// 标签状态
        {
          value: '1',
          label: '已上架'
        },
        {
          value: '0',
          label: '未上架'
        }
      ],
      tableColumns: [ // 表头
        {
          title: '序号',
          key: 'index',
          width: 80,
          align: 'left'
        },
        {
          title: '标签名称',
          key: 'infoTitle',
          align: 'left'
        },
        {
          title: 'ES列名',
          key: 'es',
          align: 'left'
        },
        {
          title: '类型',
          key: 'type',
          align: 'left'
        },
        {
          title: '属性',
          key: 'attribute',
          align: 'left'
        },
          	{
          title: '状态',
          key: 'state',
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
                    this.editState(params.row.id)
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
      this.getInformationList(this.page).then(res => {
        this.loading = false
        this.resultValue = res.records
        this.pages = new Number(res.pages)
      })
    },
    // 分页
    changePage (pageNum) {
      this.loading = true
      this.page.current = pageNum
      this.fetchList()
    }

  }
}
</script>
