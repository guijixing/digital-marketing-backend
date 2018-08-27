// 为空
const isBlank = (value) => {
  if (value == null || value.trim().length == '') {
    return true;
  }
  return false;
}
// 不为空
const isNotBlank = (value) => {
  if (value != null && value.trim().length == '') {
    return true;
  }
  return false;
}

export default {
  isBlank,
  isNotBlank
};
