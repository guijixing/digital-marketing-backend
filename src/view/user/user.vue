/* * @Author: tarn.tianrun * @Date: 2018-08-23 09:32:11 * @Last Modified by: tarn.tianrun * @Last Modified time: 2018-08-23
09:37:37 */
<style lang="less">
@import "../excel/common.less";
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
					<Option v-for="(option, index) in cType" :value="option.value" :key="index">{{option.label}}</Option>
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
      <Form ref="model" :rules="rulesInline" :model="model" :label-width="120">
          <FormItem prop="tradList" label="所属行业（多选）">
              <Select v-model="model.tradList" multiple style="width: 350px" clearable>
                <Option v-for="(option, index) in uTrade" :value="option.tradeId" :key="index">{{option.tradeName}}</Option>
              </Select>
          </FormItem>
          <FormItem prop="sale" label="个性化折扣">
              <Input v-model="model.sale" style="width: 350px" placeholder="请输入（0.01-1）"></Input>
          </FormItem>
          <FormItem ng-if="model.type==='1'" label="用户角色">
              <Select v-model="model.role" style="width: 350px" clearable>
                <Option v-for="(option, index) in roles" :value="option.value" :key="index">{{option.label}}</Option>
              </Select>
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
import userApi from "@/api/users";
import fSale from "@/filters/fSale";
const api = new userApi();
export default {
  data() {
    return {
      cType: this.$constants.cType,
      uTrade: null,
      total: 0,
      loading: true,
      modalFlag: false,
      params: {
        page: 1,
        limit: 10,
        username: "",
        name: "",
        type: ""
      },
      model: {
        tradList: [],
        sale: null,
        role: null
      },
      modelTemp: {
        tradList: [],
        sale: null,
        role: null
      },
      rulesInline: {
        tradList: [
          { required: true, message: "请选择所属行业", trigger: "blur" }
        ],
        sale: [
          {
            pattern:this.$constants.saleReg,
            message: "请输入（0.01-1）",
            trigger: "blur"
          }
        ]
      },
      roles: [
        {
          value: "1",
          label: "超级管理员"
        },
        {
          value: "2",
          label: "数据管理员"
        },
        {
          value: "3",
          label: "管理员"
        }
      ],
      resultValue: [],
      tableColumns: [
        //表头
        {
          title: "ID",
          key: "userId",
          width: 80,
          align: "left"
        },
        {
          title: "用户名称",
          key: "name",
          align: "left"
        },
        {
          title: "用户账号",
          key: "username",
          align: "left"
        },
        {
          title: "创建时间",
          key: "gmtCreate",
          align: "left",
          render: (h, params) => {
            return h(
              "span",
              this.$moment(params.row.gmtCreate).format("YYYY-MM-DD HH:mm:ss")
            );
          }
        },
        {
          title: "所属行业",
          key: "typePName",
          align: "left"
        },
        {
          title: "用户角色",
          key: "typeName",
          align: "left"
        },
        {
          title: "用户类型",
          key: "type",
          align: "left",
          render: (h, params) => {
            return h(
              "span",
              this.$options.filters.fDict(params.row.type, this.cType)
            );
          }
        },
        {
          title: "个性化折扣",
          key: "sale",
          align: "left",
          render: (h, params) => {
            return h("span", fSale(params.row.sale));
          }
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
                      this.editUser(params.row);
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        }
      ]
    };
  },
  beforeMount() {
    this.fetchList();
    this.getTradeList();
  },
  methods: {
    fetchList() {
      this.loading = true;
      api
        .handleUsersList(this.params)
        .then(res => {
          this.loading = false;
          this.total = res.data.total||0;
          this.resultValue = res.data.records||[];
        })
        .catch(err => {
          this.loading = false;
        });
    },
    getTradeList() {
      api.getTradeList().then(res => {
        this.uTrade = res.data;
      });
    },
    changePage(pageNum) {
      this.params.page = pageNum;
      this.fetchList();
    },
    editUser(row) {
      this.model = Object.assign(row);
      this.modalFlag = true;
    },
    saveModal(name) {
      let _self = this;
      _self.$refs[name].validate(valid => {
        if (valid) {
          api.saveUser(_self.model).then(res => {
            if (!res.success) {
              _self.$Message.error("编辑失败，请重试");
              return;
            }
            _self.cancelModal();
            _self.fetchList();
          });
        }
      });
    },
    cancelModal() {
      this.model = Object.assign(this.modelTemp);
      this.modalFlag = false;
    }
  }
};
</script>
