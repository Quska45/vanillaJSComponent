/**
 * 로컬 스토리지를 쓸 때 신경 써야하는 것은 기본값과 잘못된 값이 있을 때의 처리가 빠지면 안된다는 점이다.
 * 따라서 아래와 같이 로컬 스토리지 값을 사용하는 코드를 한번 래핑해서 사용하는 것이 좋다.
 */
function getItem(key, defaultValue){
  try {
    const item = window.localStorage.getItem(key);    return item ? JSON.parse(item) : defaultValue;
  } catch(e){
    return defaultValue;
  }
}

function setItem (key, value){
  // 브라우저별 로컬스토리지 용량이 정해져 있어 실패하는 경우가 생길 수도 있다. 따라서 트라이 캐치 써주는게 좋다.
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch(e){
    throw new Error('localStorage is not working')
  }
}