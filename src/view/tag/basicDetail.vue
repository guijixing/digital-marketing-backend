<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
		<Row>
			<Card >
        <Form ref="obj" :model="obj" :rules="rules" :label-width="80">
          <Row>
              <Col span="6">
                  <FormItem prop="name" label="标题名称">
                    <Input v-model="obj.name" style="width:150px" placeholder="请输入标题名称"></Input>
                  </FormItem>
              </Col>
              <Col span="6">
                <FormItem prop="kind" label="标签类型">
                  <Select v-model="obj.kind" clearable style="width:150px">
                      <Option v-for="item in cKind" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem prop="property" label="标签属性">
                  <Select v-model="obj.property" clearable style="width:150px">
                      <Option v-for="item in cProperty" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="6">
                &nbsp;
              </Col>
            </Row>
          <Row>
            <Col span="6">
              <FormItem prop="status" label="标签状态">
                <Input v-model="obj.status" style="width:150px" placeholder="请输入标签状态"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="sort" label="标题排序">
                <Input  v-model="obj.sort" style="width:150px" placeholder="请输入标题排序"></Input>
              </FormItem>
            </Col>
            <Col span="6">
              <FormItem prop="esField" label="ES列名">
                <Input v-model="obj.esField" style="width:150px" placeholder="请输入ES列名"></Input>
              </FormItem>
            </Col>
            <Col span="6">
                &nbsp;
              </Col>
          </Row>
          <FormItem>
            <Button v-if="labelShow"  @click="openModel" type="warning">添加标签值</Button>
            <Button @click="save('obj')" type="primary">保存</Button>
          </FormItem>
        </Form>
			</Card>
		</Row>
		<Row v-if="labelShow">
			<Card>
				<Table :loading="loading" stripe border :columns="tableColumns" :data="obj.tagOptionList"></Table>
			</Card>
		</Row>
        <Modal
            title="编辑标签值"
            v-model='modalFlag'
            :closable="false"
            :mask-closable="false"
            footer-hide>
            <Form ref="model" :model="model"  :rules="rulesInline" :label-width="100">
                <FormItem prop="name" label="标题名称">
                    <Input v-model="model.name" style="width:300px" placeholder="请输入标题名称"></Input>
                </FormItem>
                <FormItem prop="logic" label="选项逻辑关系">
                    <Select v-model="model.logic" clearable style="width:300px">
                    <Option v-for="item in cLogic" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </FormItem>
                <FormItem prop="esValue" label="ES字段名">
                    <Input v-model="model.esValue" style="width:300px" placeholder="请输入ES字段名"></Input>
                </FormItem>
                <FormItem v-if="model.logic==='1'" label="ES字段结束值">
                    <Input v-model="model.esEnd" style="width:300px" placeholder="请输入ES字段结束值"></Input>
                </FormItem>
                <FormItem prop="sort" label="标题排序">
                    <Input v-model="model.sort" style="width:300px" placeholder="请输入标题排序"></Input>
                </FormItem>
                <div class="center width-100">
                    <Button @click="cancelModal" type="default">取消</Button>
                    <Button @click="saveModal('model')" type="primary">保存</Button>
                </div>
            </Form>
        </Modal>
	</div>
</template>

<script>
import tagsApi from "@/api/tags";
import fEsValue from "@/filters/fEsValue"
const api = new tagsApi();
export default {
  data() {
    return {
      // resultValue: [],//列表数据
      cKind: this.$constants.cKind,
      cProperty: this.$constants.cProperty,
      cLogic: this.$constants.cLogic,
      obj: {
        id: this.$route.params.id,
        name: "", // 标题名称
        property: "", // 标签属性
        kind: "", // 标签类型
        status: "", // 标签状态
        sort: "", // 排序
        esField: "", // ES列名
        tagOptionList: [
          {
            id: 111,
            tagId: "1",
            name: "2",
            logic: "1",
            esValue: "3",
            sort: "4",
            esEnd: "5"
          }
        ] //基础标签的选项信息
      },
      rules: {
        name: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        kind: [{ required: true, message: "请选择标签类型", trigger: "blur" }],
        property: [
          { required: true, message: "请选择标签属性", trigger: "blur" }
        ],
        status: [
          { required: true, message: "请选择标签状态", trigger: "blur" }
        ],
        sort: [
          { required: true, message: "请选择标题排序", trigger: "blur" },
          {
            pattern: this.$constants.sortReg,
            message: "请输入数字",
            trigger: "blur"
          }
        ],
        esField: [{ required: true, message: "请输入ES列名", trigger: "blur" }]
      },
      rulesInline: {
        name: [{ required: true, message: "请输入标题名称", trigger: "blur" }],
        logic: [{ required: true, message: "请选择逻辑关系", trigger: "blur" }],
        esValue: [{ required: true, message: "请输入ES字段名", trigger: "blur" }],
        esEnd: [{ required: true, message: "请输入ES字段结束值", trigger: "blur" }],
        sort: [
          { required: true, message: "请选择标题排序", trigger: "blur" },
          {
            pattern: this.$constants.sortReg,
            message: "请输入数字",
            trigger: "blur"
          }
        ]
      },
      loading: false, // 表格加载动画
      labelShow: false, // 是否显示标签值
      modalFlag: false, // 是否显示标签编辑
      model: {
        tagId: '',
        name: '',
        logic: '',
        esValue: '',
        sort: '',
        esEnd: ''
      },
      modelTemp: {
        tagId: '',
        name: '',
        logic: '',
        esValue: '',
        sort: '',
        esEnd: ''
      },
      tableColumns: [
        // 表头
        {
          title: "序号",
          type: "index",
          width: 80,
          align: "left"
        },
        {
          title: "标签值名称",
          key: "name",
          align: "left"
        },
        {
          title: "ES字段名",
          key: "esValue",
          align: "left",
          render: (h, params) => {
            return h("span", fEsValue(params.row));
          }
        },
        {
          title: "排序",
          key: "sort",
          align: "left"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "left",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.editState(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handleRemove(params.row.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  watch: {
    "obj.property": function() {
      if (this.obj.property === "0") {
        this.labelShow = true;
      } else {
        this.labelShow = false;
      }
    },
    model:{
      handler(newVal, oldVal) {
        if(this.modalFlag){
          if(this.model.logic==='0'){
            this.rulesInline.esValue[0].required=true;
            this.rulesInline.esEnd[0].required=false;
          }else if(this.model.logic==='1'){
            this.rulesInline.esValue[0].required = this.model.esEnd==null||this.model.esEnd==='';
            this.rulesInline.esEnd[0].required = this.model.esValue==null||this.model.esValue==='';
          }
          this.$forceUpdate();
        }
      },
      immediate: true,
      deep : true

    }
  },
  beforeMount() {
    if (this.obj.id != null) {
      this.loading = true;
      api
        .getBaseById(this.obj.id)
        .then(res => {
          this.obj = res.data;
          this.loading = false;
        })
        .catch(err => {
          this.loading = false;
        });
    }
  },
  methods: {
    // 修改标签值 打开弹框
    editState(row) {
      this.modalFlag = true;
      this.model = Object.assign(row);
    },
    // 添加标签值 打开弹框
    openModel() {
      this.modalFlag = true;
      this.model = Object.assign(this.modelTemp);
    },
    // 删除标签值 数组删除
    handleRemove(index) {
      this.obj.tagOptionList.splice(index, 1);
    },
    // 添加标签值 保存
    saveModal(name) {
      let _self = this;
      _self.$refs[name].validate(valid => {
        if (valid) {
          if (_self.model.id != null) {
            _self.obj.tagOptionList.splice(
              _self.model.index,
              1,
              Object.assign(_self.model)
            );
          } else {
            _self.obj.tagOptionList.push(Object.assign(_self.model));
          }
          _self.cancelModal();
        }
      });
    },
    //保存基础标签
    save(name) {
      let _self = this;
      _self.$refs[name].validate(valid => {
        if (valid) {
          let axios = null;
          if (_self.obj.id !== null) {
            axios = api.editBaseTag(_self.obj);
          } else {
            axios = api.addBaseTag(_self.obj);
          }
          axios.then(res => {
            if (!res.success) {
              _self.$Message.error("编辑失败，请重试");
              return;
            }
            _self.$Message.success("编辑成功");
            _self.$router.push({
              name: "basic"
            });
          });
        }
      });
    },
    // 关闭添加标签值
    cancelModal() {
      this.modalFlag = false;
      this.model = Object.assign(this.modelTemp);
    }
  }
};
</script>
