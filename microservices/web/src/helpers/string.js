export const strUcFirst = (a) => (`${a}`).charAt(0).toUpperCase() + a.substr(1);
export const strLcFirst = (a) => (`${a}`).charAt(0).toLowerCase() + a.substr(1);
export const formatMonth = (month) => {
  let newMonth = month;
  if (newMonth < 10) {
    newMonth = '0'.concat(newMonth.toString());
  }
  return newMonth;
};
