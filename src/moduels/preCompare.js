module.exports = function calaverage(exArray, userArray, selected, unSelected) {
    let tmp = []
    for(let i in exArray) {
        //indexOf 문자열이 있으면 해당하는 index반환
        if(userArray.indexOf(exArray[i]) != -1) tmp[i] = true
    }
    for(var i in exArray) {
        if(tmp[i]) selected.push(exArray[i])
        else unSelected.push(exArray[i])
    }
    return {selected : selected, unSelected : unSelected}
  }