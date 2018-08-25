<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
		<Row>
			<Card >
        <Form :model="model" :label-width="80">
            <FormItem label="标题名称">
                <Input v-model="obj.name" style="width:150px" placeholder="请输入标题名称"></Input>
            </FormItem>
            <FormItem label="标签类型">
                <Select v-model="obj.kind" clearable style="width:150px">
                    <Option v-for="item in fKind" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="标签属性">
                <Select v-model="obj.property" clearable style="width:150px">
                    <Option v-for="item in fProperty" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="标签状态">
                <Input v-model="obj.states" style="width:150px" placeholder="请输入标签状态"></Input>
            </FormItem>
            <FormItem label="标题排序">
                <Input v-model="obj.sort" style="width:150px" placeholder="请输入标题排序"></Input>
            </FormItem>
            <FormItem label="ES列名">
                <Input v-model="obj.esField" style="width:150px" placeholder="请输入ES列名"></Input>
            </FormItem>
            <FormItem>
                <Button v-if="labelShow"  @click="openModel" type="warning">添加标签值</Button>
                <Button @click="save" type="primary">保存</Button>
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
            <Form :model="model" :label-width="100">
                <FormItem label="标题名称">
                    <Input v-model="model.name" style="width:300px" placeholder="请输入标题名称"></Input>
                </FormItem>
                <FormItem label="选项逻辑关系">
                    <Select v-model="model.logic" clearable style="width:300px">
                    <Option v-for="item in fLogic" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                </FormItem>
                <FormItem label="标签值">
                    <Input v-model="model.esValue" style="width:300px" placeholder="请输入标签值"></Input>
                </FormItem>
                <FormItem v-if="model.logic==='1'" label="标签结束值">
                    <Input v-model="model.esEnd" style="width:300px" placeholder="请输入标签结束值"></Input>
                </FormItem>
                <FormItem label="标题排序">
                    <Input v-model="model.sort" style="width:300px" placeholder="请输入标题排序"></Input>
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
import tagsApi from "@/api/tags";
const api = new tagsApi();
export default {
  data() {
    return {
      // resultValue: [],//列表数据
      obj: {
        id: this.$route.params.id,
        name: "", // 标题名称
        property: "", // 标签属性
        kind: "", // 标签类型
        states: "", // 标签状态
        sort: "", // 排序
        esField: "", // ES列名
        tagOptionList: [
          {
            id: 111,
            tagId: "1",
            name: "2",
            logic: "3",
            esValue: "3",
            sort: "4",
            esEnd: "3"
          }
        ] //基础标签的选项信息
      },
      loading: false, // 表格加载动画
      labelShow: false, // 是否显示标签值
      modalFlag: false, // 是否显示标签编辑
      model: {
        tagId: "",
        name: "",
        logic: "",
        esValue: "",
        sort: "",
        esEnd: ""
      },
      modelTemp: {
        tagId: "",
        name: "",
        logic: "",
        esValue: "",
        sort: "",
        esEnd: ""
      },
      fKind: [
        // 标签类型
        {
          value: "1",
          label: "常用标签"
        },
        {
          value: "0",
          label: "非常用标签"
        }
      ],
      fProperty: [
        // 标签属性
        {
          value: "1",
          label: "复选按钮"
        },
        {
          value: "2",
          label: "省市级联选择"
        },
        {
          value: "3",
          label: "市区级联选择"
        }
      ],
      fState: [
        // 标签状态
        {
          value: "1",
          label: "已上架"
        },
        {
          value: "0",
          label: "未上架"
        }
      ],
      fLogic: [
        //逻辑关系
        {
          value: "0",
          label: "值"
        },
        {
          value: "1",
          label: "区间"
        }
      ],
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
          align: "left"
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
      if (this.obj.property === "1") {
        this.labelShow = true;
      } else {
        this.labelShow = false;
      }
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
    saveModal() {
      if (this.model.id != null) {
        this.obj.tagOptionList.splice(
          this.model.index,
          1,
          Object.assign(this.model)
        );
      } else {
        this.obj.tagOptionList.push(Object.assign(this.model));
      }
      this.cancelModal();
    },
    //保存基础标签
    save() {
      let _self = this;
      let axios = Promise.reject();
      if (_self.obj.id !== null) {
        axios = api.editBaseTag(_self.obj);
      } else {
        axios = api.addBaseTag(_self.obj);
      }
      axios.then(res => {
        if (!res.success) {
          this.Message.error("编辑失败，请重试");
          return;
        }
        this.Message.success("编辑成功");
        this.$router.push({
          name: "basic"
        });
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
