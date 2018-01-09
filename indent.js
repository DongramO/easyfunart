const test =  function(){
  try {
    // try안에 있는 어떤 함수 콜백으로 불려도 상관없는 계속 타고 들어가도 상관 없음.
    throw new Error('error checking')
  } catch (e) {
    console.log(e)
    // 이거 하면 error checking이 찍혀요
  }
}