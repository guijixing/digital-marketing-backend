<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
        <Row>
            <Card class="seach-condition">
                <span>标题名称：</span>
                <Input v-model="page.infoTitle" placeholder="请输入标题名称" clearable style="width: 150px"></Input>
                <span>标签状态：</span>
                <Select v-model="page.state" clearable style="width:150px">
                    <Option v-for="item in fState" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <span>所属行业：</span>
                <Input v-model="page.industry" placeholder="请输入所属行业" clearable style="width: 150px"></Input>
                <Button @click="fetchList" class="margin-left-10" type="primary" icon="search">筛选</Button>
            </Card>
            <Card>
                <Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
				<div style="margin: 10px;overflow: hidden">
					<div style="float: right;">
						<Page show-elevator show-sizer @on-page-size-change="changePage" :total="pages" :current="page.current" @on-change="changePage"></Page>
					</div>
				</div>
            </Card>
        </Row>
        <Modal
            width="900"
            title="编辑标签"
            v-model='labelFlag'
            :closable="false"
            :mask-closable="false"
            footer-hide>
            <Form :model="model" :label-width="80">
                <FormItem label="标题名称">
                    <Input v-model="model.infoTitle" placeholder="请输入标题名称"></Input>
                </FormItem>
                <FormItem label="编码">
                    <Input v-model="model.code" placeholder="请输入编码"></Input>
                </FormItem>
                <FormItem label="附件条件">
                    <can-edit-table :hover-show="hoverShow" :loading="labelLoading" @on-change="handleChangeLabel" @on-delete="handleLabelRemove" v-model="model.additional" :columns-list="labelTableColumns"></can-edit-table>
                    <Button @click="addLabel" class="margin-top-10"  type="primary">添加记录</Button>
                </FormItem>
                <div class="center width-100">
                    <Button @click="cancel" type="default">取消</Button>
                    <Button @click="saveLabel" type="primary">保存</Button>
                </div>
            </Form>
        </Modal>
    </div>
</template>
<script>
import canEditTable from './canEditTable'
export default {
  props: ['tabName'],
  components: {
    canEditTable
  },
  data () {
    return {
      tab: 'app',
      loading: true,
      labelFlag: false, // 是否显示标签编辑
      labelLoading: false, // 标签编辑附加条件列表
      hoverShow: true,
      pages: null, // 总页数
      page: {
        current: 1, // 当前页数
        size: 10, // 每页显示条数
        infoTitle: '', // 标题名称
        state: '', // 标签状态
        industry: '', // 所属行业
        type: this.tabName
      },
      loading: true, // 表格加载动画
      model: {
        infoTitle: '',
        code: '',
        additional: []
      },
      modelTemp: {
        infoTitle: '',
        code: '',
        additional: []
      },
      additionalObj: {
        key: '',
        condition: '',
        value: '',
        remark: ''
      },

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
          title: '编码',
          key: 'code',
          align: 'left'
        },
        {
          title: '附加条件',
          key: 'remark',
          align: 'left'
        },
        {
          title: '状态',
          key: 'type',
          align: 'left'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
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
                    this.edit(params.row)
                  }
                }
              }, '编辑'),
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
                    this.editState(params.row)
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
      ],
      resultValue: [
        {
          index: 1,
          infoTitle: '汽车之家',
          code: 'w1092291',
          remark: '日访问大于30次，时长大于30分钟',
          type: '已上架',
          additional: [
            {
              key: '1111',
              condition: '1',
              value: '30',
              remark: '日访问大于30次'
            },
            {
              key: '2222',
              condition: '2',
              value: '30',
              remark: '时长大于30分钟'
            },
            {
              key: '1111',
              condition: '1',
              value: '30',
              remark: '日访问大于30次'
            },
            {
              key: '2222',
              condition: '2',
              value: '30',
              remark: '日访问大于30次'
            },
            {
              key: '1111',
              condition: '1',
              value: '30',
              remark: '日访问大于30次'
            },
            {
              key: '2222',
              condition: '2',
              value: '30',
              remark: '日访问大于30次'
            }
          ]
        },
        {
          index: 2,
          infoTitle: '优信二手车',
          code: 'w0291922',
          remark: '无',
          type: '已上架'
        },
        {
          index: 3,
          infoTitle: '弹个车',
          code: 'w0291923',
          remark: '无',
          type: '已上架'
        }
      ],
      labelTableColumns: [
        {

          title: 'KEY（必填）',
          key: 'key',
          width: 150,
          align: 'left',
          editable: true
        },
        {
          title: '条件（必填）',
          key: 'condition',
          width: 150,
          align: 'left',
          editable: true
        },
        {
          title: 'value（必填）',
          key: 'value',
          width: 150,
          align: 'left',
          editable: true
        },
        {
          title: '备注（必填）',
          key: 'remark',
          align: 'left',
          editable: true
        },
        {
          title: ' ',
          key: 'action',
          width: 140,
          handle: ['edit', 'delete']
        }

      ]

    }
  },
  beforeMount () {
    this.loading = false
    // this.fetchList();
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
    },
    // 编辑标签
    edit (obj) {
      this.labelFlag = true
      this.model = Object.assign(obj)
    },
    // 上架 下架
    editState (obj) {
      this.labelFlag = true
      this.model = Object.assign(obj)
    },
    cancel () {
      this.labelFlag = false
      this.model = Object.assign(this.modelTemp)
    },
    // 保存标签
    saveLabel () {},
    // 删除标签
    handleRemove (id) {},
    // 新增标签
    add () {
      this.labelFlag = true
    },
    addLabel () {
      this.model.additional.push(Object.assign(this.additionalObj))
    },
    handleChangeLabel (obj) {

    },
    handleLabelRemove (id) {

    }

  }

}
</script>
