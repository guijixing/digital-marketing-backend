<template>
	<div>
		<Row>
			<Card>
				<span>用户编号：</span>
				<Input v-model="page.userNo" placeholder="请输入用户编号" clearable style="width: 150px"></Input>
				<span>手机号码：</span>
				 <Input v-model="page.phoneNumber" placeholder="请输入手机号码" clearable style="width: 150px"></Input>
				<Button @click="fetchList" class="margin-left-10" type="primary" icon="search">查询</Button>
			</Card>
		</Row>
		<Row>
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pageTotal" :current="page.page" @on-change="changePage"></Page>
					</div>
				</div>
			</Card>
		</Row>
	</div>
</template>
<script>
import {getDisturbedList} from '../../mock/mdr.js'
import Cookies from 'js-cookie'

export default {
  data () {
    return {
      resultValue: [], // 列表数据
      initResultValue: [], // 列表数据
      pageTotal: null, // 总页数
      category: [], // 全部类型
      page: {
        current: 1, // 当前页数
        size: 10, // 每页显示条数
        type: '1',
        userId: '', // 用户编号
        phone: '' // 手机号码
      },
      loading: true, // 表格加载动画
      loading1: false,
      userList: [],
      tableColumns: [ // 表头
        {
          title: '序号',
          key: 'indexId',
          width: 80,
          align: 'center'
        },
        {
          title: '用户编号',
          key: 'userId',
          align: 'center'
        },
        {
          title: '手机号码',
          key: 'phone',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
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
                    let argu = { information_id: params.row.userId }
                    this.$router.push({
                      name: 'information-info',
                      params: argu
                    })
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
                    this.handleRemove(params.row.userId)
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
      getDisturbedList(this.page).then(res => {
        this.loading = false
        this.resultValue = res.records
        this.pageTotal = res.total
      })
    },

    // 分页
    changePage (pageNum) {
      this.loading = true
      this.page.current = pageNum
      this.fetchList()
    },
    // 删除资讯
    handleRemove (infoId) {
      var param = {
        infoId: infoId
      }
      this.removeInfo(param).then(() => {
        this.fetchList()
      })
    }
  }
}
</script>
