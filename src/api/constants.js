
// 标签类型
const cKind = [
  {
    value: '0',
    label: '常用标签'
  },
  {
    value: '1',
    label: '非常用标签'
  }
];

// 标签状态
const cStatus= [
  {
    value: '0',
    label: '已上架'
  },
  {
    value: '1',
    label: '未上架'
  }
]
 // 标签属性
const  cProperty= [
  {
    value: "0",
    label: "复选按钮"
  },
  {
    value: "1",
    label: "省市级联选择"
  },
  {
    value: "2",
    label: "市区级联选择"
  }
]
//选项逻辑关系
const cLogic= [

  {
    value: "0",
    label: "值"
  },
  {
    value: "1",
    label: "区间"
  }
]

//用户类型：
const cType= [

  {
    value: "1",
    label: "运维"
  },
  {
    value: "2",
    label: "客户"
  }
]

// 手机号码验证
const phoneReg = /^1[3456789]\d{9}$/;

// 折扣0.01-1
const saleReg = /^1?$|^0\.(?:0[1-9]|[1-9][0-9]?)$|^0\.[0-9]$/

//排序
const sortReg = /^\d+$/;

export default {
  cKind,
  cStatus,
  cProperty,
  cLogic,
  cType,
  phoneReg,
  saleReg,
  sortReg
};
