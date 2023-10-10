const END_POINT = 'https://api.idiots.band';

export const fetchLiveList = (keyword) => {
  return request(`/api/search?keyword=${keyword}`);
};

// api가 늘어남에 따라 반복되는 코드를 분리해줄 수 있음.
const request = async (url) => {
  try {
    const res = await fetch(`${END_POINT}${url}`)
    
    if(!res.ok){
      throw new Error('통신에 문제가 있습니다.');
    }
    
    // 응답 타입은 text와 같이 다른 것들이 있기 때문에 뭘로 받을 건지 인터페이스를 맞춰주는 과정이 필요함.
    // async로 만들어진 함수는 프라미스가 되기 때문에 최종적인 return에 await를 붙여줄 필요가 없음
    return res.json();
  } catch (error) {
    
  }
}