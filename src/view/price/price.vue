<style lang="less">
@import "../excel/common.less";
</style>
<template>
	<div>
        <Card class="price-class">
            <Row>
                <Col span="6">区间起始数量</Col>
                <Col span="6">区间结束数量</Col>
                <Col span="6">单位价格（X元/个）</Col>
                <Col span="6"><Button @click="savePrice" type="primary" >保存</Button></Col>
            </Row>
            <Row>
                <Col span="6"><span v-text='obj.start0'></span></Col>
                <Col span="6"><Input v-model="obj.end0" placeholder="123"  clearable style="width: 150px"></Input></Col>
                <Col span="6"><Input v-model="obj.price0" placeholder="2"  clearable style="width: 150px"></Input></Col>
                <Col span="6">&nbsp;</Col>
            </Row>
            <Row>
                <Col span="6"><span v-text="obj.start1"></span></Col>
                <Col span="6"><Input v-model="obj.end1" placeholder="1000"  clearable style="width: 150px"></Input></Col>
                <Col span="6"><Input v-model="obj.price1" placeholder="1.8"  clearable style="width: 150px"></Input></Col>
                <Col span="6">&nbsp;</Col>
            </Row>
            <Row>
                <Col span="6"><span v-text="obj.start2"></span></Col>
                <Col span="6"><Input v-model="obj.end2" placeholder="2000"  clearable style="width: 150px"></Input></Col>
                <Col span="6"><Input v-model="obj.price2" placeholder="1.5"  clearable style="width: 150px"></Input></Col>
                <Col span="6">&nbsp;</Col>
            </Row>
            <Row>
                <Col span="6"><span v-text="obj.start3"></span></Col>
                <Col span="6">&nbsp;</Col>
                <Col span="6"><Input v-model="obj.price3" placeholder="1"  clearable style="width: 150px"></Input></Col>
                <Col span="6">&nbsp;</Col>
            </Row>
        </Card>
        <Card>
          <Table :loading="loading" stripe border :columns="tableColumns" :data="resultValue"></Table>
          <div style="margin: 10px;margin-left:0px;overflow: hidden">
            <div style="float: right;">
              <Page show-total :total="total" :current="page.current" @on-change="changePage"></Page>
            </div>
            <Button style="float: left;" @click="addDiscount" type="primary" >添加全局折扣</Button>
          </div>
        </Card>
        <Modal
            title="编辑记录"
            v-model='modalFlag'
            :closable="false"
            :mask-closable="false"
            footer-hide>
            <Form :model="model" :label-width="80">
                <FormItem label="折扣名称">
                    <Input v-model="model.infoTitle" placeholder="请输入(最多输入6个汉字/12个字符)"></Input>
                </FormItem>
                <FormItem label="生效时间">
                    <Row>
                      <Col span="11">
                          <DatePicker type="date" v-model="model.startTime"></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                          <DatePicker type="date"  v-model="model.endTime"></DatePicker>
                      </Col>
                    </Row>
                </FormItem>
                <FormItem label="折扣度">
                    <Input v-model="model.discount" placeholder="请输入（0.01-1）"></Input>
                </FormItem>
                <div class="center width-100">
                    <Button @click="cancel" type="default">取消</Button>
                    <Button @click="saveDiscount" type="primary">确定</Button>
                </div>
            </Form>
        </Modal>
	</div>
</template>
<script>
export default {
  data(){
    return {
      loading:false,
      resultValue: [], // 列表数据
      total: null, // 总页数
      page: {
        current: 1, // 当前页数
        size: 10, // 每页显示条数
      },
      obj:{
        start0:1,
        start1:124,
        start2:1001,
        start3:2000,
        end0:null,
        end1:null,
        end2:null,
        price0:null,
        price1:null,
        price2:null,
        price3:null
      },
      modalFlag:false,
      model:{
          infoTitle:null,
          startTime:null,
          endTime:null,
          discount:null
      },
      tableColumns: [ // 表头
        {
          title: '序号',
          key: 'index',
          width: 80,
          align: 'left'
        },
        {
          title: '折扣名称',
          key: 'infoTitle',
          align: 'left'
        },
        {
          title: '折扣开始时间',
          key: 'startTime',
          align: 'left'
        },
        {
          title: '折扣结束时间',
          key: 'endTime',
          align: 'left'
        },
        {
          title: '折扣度',
          key: 'discount',
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
      resultValue:[
        {
          index:1,
          infoTitle:"双十一折扣",
          startTime:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
          endTime:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
          discount:"5折"
        },
        {
          index:2,
          infoTitle:"618折扣",
          startTime:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
          endTime:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
          discount:"4折"
        },
        {
          index:3,
          infoTitle:"元旦折扣",
          startTime:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
          endTime:this.$moment().format("YYYY-MM-DD HH:mm:ss"),
          discount:"6折"
        }
      ]
    }
  },

  watch:{
    'obj.end0': function () {
      if (this.obj.end0 == null) {
        this.obj.start1 = 124
      } else {
        this.obj.start1 = this.obj.start0 + this.obj.end0;
      }
    },
    'obj.end1': function () {
      if (this.obj.end1 == null) {
        this.obj.start2 = 1001
      } else {
        this.obj.start2 = this.obj.start1 + this.obj.end1;
      }
    },
    'obj.end2': function () {
      if (this.obj.end2 == null) {
        this.obj.start3 = 2000
      } else {
        this.obj.start3 = this.obj.start2 + this.obj.end2;
      }
    }
  },
  beforeMount () {
    this.getPrice();
    this.fetchList();
  },
  methods:{
      getPrice(){
        console.log(11111);
        // this.getPrice().then(res => {
        // this.loading = false
        // this.obj = res.records;
        // })
      },
      savePrice(){

      },
      // 获取数据
      fetchList() {
        this.getInformationList(this.page).then(res => {
          this.loading = false
          this.resultValue = res.records
          this.total = new Number(res.total)
        })
      },
      // 分页
      changePage(pageNum) {
        this.loading = true
        this.page.current = pageNum
        this.fetchList()
      },
      handleRemove(id){

      },
      addDiscount(){
          this.modalFlag = true;
      },
      saveDiscount(){

      },
      cancel(){
        this.model={};
        this.modalFlag = false;
      }
  },

}
</script>

