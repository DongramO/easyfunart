module.exports = function preCompare(exObject, userObject, selected, unSelected) {
    for(let key in exObject) {
        //indexOf 문자열이 있으면 해당하는 index반환
        // if(userArray.indexOf(exArray[i]) != -1) tmp[i] = true
        if (exObject[key] === 1 && userObject[key] === 1) {
            selected.push(key)
        }
        else if(exObject[key] === 1 && userObject[key] === 0) {
            unSelected.push(key)
        }
    }
    return {selected : selected, unSelected : unSelected}
  }
