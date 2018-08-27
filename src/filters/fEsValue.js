// ES 字段值
export default (row)=>{
  let esValue = row.esValue==null?'':row.esValue;
  if (row.logic==='1') {
    let esEnd = row.esEnd==null?'':row.esEnd;
    if(esEnd!==''&&esValue!==''){
        return esValue+'-'+esEnd;
    }else if(esValue!==''){
      return '>'+esValue;
    }else if(esEnd!==''){
      return '<'+esEnd;
    }
  }
  return esValue;
}
