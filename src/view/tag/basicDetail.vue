<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
		<Row>
			<Card >
                <Form :model="model" :label-width="80">
                    <FormItem label="标题名称">
                        <Input v-model="obj.infoTitle" style="width:150px" placeholder="请输入标题名称"></Input>
                    </FormItem>
                    <FormItem label="标签类型">
                        <Select v-model="obj.type" clearable style="width:150px">
                            <Option v-for="item in fType" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="标签属性">
                        <Select v-model="obj.attribute" clearable style="width:150px">
                            <Option v-for="item in fAttribute" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="标签状态">
                        <Input v-model="obj.state" style="width:150px" placeholder="请输入标签状态"></Input>
                    </FormItem>
                    <FormItem label="标题排序">
                        <Input v-model="obj.sort" style="width:150px" placeholder="请输入标题排序"></Input>
                    </FormItem>
                    <FormItem label="ES列名">
                        <Input v-model="obj.es" style="width:150px" placeholder="请输入ES列名"></Input>
                    </FormItem>
                    <FormItem>
                        <Button v-if="labelShow"  @click="add" type="warning">添加标签值</Button>
                        <Button @click="save" type="primary">保存</Button>
                    </FormItem>
                </Form>
				<!-- <span>标题名称：</span>
				<Input v-model="obj.infoTitle" placeholder="请输入标题名称" clearable style="width: 150px"></Input>
				<span>标签类型：</span>
				<Select v-model="obj.type" clearable style="width:150px">
                    <Option v-for="item in fType" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
                <span>标签属性：</span>
				<Select v-model="obj.attribute" clearable style="width:150px">
                    <Option v-for="item in fAttribute" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
				 <span>标签状态：</span>
				<Select v-model="obj.state" clearable style="width:150px">
                <Option v-for="item in fState" :value="item.value" :key="item.value">{{ item.label }}</Option>
				</Select>
                <span>标题排序：</span>
                <Input v-model="obj.sort" placeholder="请输入标题排序" clearable style="width: 150px"></Input>
                <span>ES列名：</span>
				<Input v-model="obj.es" placeholder="请输入ES列名" clearable style="width: 150px"></Input>
                <Button v-if="labelShow" @click="add" class="margin-left-10" type="warning" >添加标签值</Button>
                <Button @click="save" class="margin-left-10" type="primary" >保存</Button> -->
			</Card>
		</Row>
		<Row v-if="labelShow">
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
			</Card>
		</Row>
        <Modal
            title="编辑标签值"
            v-model='labelFlag'
            :closable="false"
            :mask-closable="false"
            footer-hide>
            <Form :model="model" :label-width="80">
                <FormItem label="标题名称">
                    <Input v-model="model.infoTitle" placeholder="请输入标题名称"></Input>
                </FormItem>
                <FormItem label="ES列名">
                    <Input v-model="model.es" placeholder="请输入ES列名"></Input>
                </FormItem>
                <FormItem label="标题排序">
                    <Input v-model="model.sort" placeholder="请输入标题排序"></Input>
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
export default {
  data () {
    return {
      // resultValue: [],//列表数据
      obj: {
        infoTitle: '', // 标题名称
        attribute: '', // 标签属性
        type: '', // 标签类型
        state: '', // 标签状态
        sort: '', // 排序
        es: '' // ES列名
      },
      loading: true, // 表格加载动画
      labelShow: false, // 是否显示标签值
      labelFlag: false, // 是否显示标签编辑
      model: {
        infoTitle: '',
        es: '',
        sort: ''
      },
      fType: [
        // 标签类型
        {
          value: '1',
          label: '常用标签'
        },
        {
          value: '0',
          label: '非常用标签'
        }
      ],
      fAttribute: [
        // 标签属性
        {
          value: '1',
          label: '复选按钮'
        },
        {
          value: '2',
          label: '省市级联选择'
        },
        {
          value: '3',
          label: '市区级联选择'
        }
      ],
      fState: [
        // 标签状态
        {
          value: '1',
          label: '已上架'
        },
        {
          value: '0',
          label: '未上架'
        }
      ],
      tableColumns: [
        // 表头
        {
          title: '序号',
          key: 'index',
          width: 80,
          align: 'left'
        },
        {
          title: '标签值名称',
          key: 'infoTitle',
          align: 'left'
        },
        {
          title: 'ES字段名',
          key: 'es',
          align: 'left'
        },
        {
          title: '排序',
          key: 'sort',
          align: 'left'
        },
        {
          title: '操作',
          key: 'action',
          width: 150,
          align: 'left',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
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
                },
                '编辑'
              ),
              h(
                'Button',
                {
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
                },
                '删除'
              )
            ])
          }
        }
      ],
      resultValue: [
        {
          index: 1,
          infoTitle: '男性',
          es: 'mail',
          sort: 1
        },
        {
          index: 2,
          infoTitle: '女性',
          es: 'femail',
          sort: 2
        }
      ]
    }
  },
  watch: {
    'obj.attribute': function () {
      this.sCategory = []
      if (this.obj.attribute === '1') {
        this.labelShow = true
      } else {
        this.labelShow = false
      }
    }
  },
  beforeMount () {
    // this.fetchList()
    this.loading = false
  },
  methods: {
    // 获取数据
    fetchList () {
    },
    editState (obj) {
      this.labelFlag = true
      this.model = Object.assign(obj)
    },
    cancel () {
      this.labelFlag = false
      this.model = {}
    },
    saveLabel () {},
    handleRemove (id) {},
    add () {
      this.labelFlag = true
    },
    save () {}
  }
}
</script>
