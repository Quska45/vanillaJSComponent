const END_POINT = 'https://todo-api.roto.codes';

export async function request(url, options){
    // 이렇게 fetch 같은걸 한 번 래핑해 놓으면 공통적인 변경 사항에 대한 수정이 쉽다.
    // 예를 들어 axios로 변경 한다면 그냥 fetch 부분만 변경해주면 전부 적용이 되는 것이라 볼 수 있음.
    // 모든 걸 래핑하려는 것은 소모적인 일일 수 있지만 api 호출 처럼 몇가지 유용한 상황이 분명히 있음.
    const res = await fetch(url, options);
    return await res.json();
}

export async function fetchData(username) {
    return request(`${END_POINT}/${username}`);
}

export async function toggle(username, id){
    return request(`${END_POINT}/${username}/${id}/toggle`, { 
        method: 'PUT' 
    });
}

export async function removeTodo(username, id){
    return request(`${END_POINT}/${username}/${id}`, {
        method: 'DELETE',
    });
}

export async function createTodo(username, todoText){
    await fetch(`${END_POINT}/${username}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: todoText,
        }),
    })
}