async function request(url, options){
    // 이렇게 fetch 같은걸 한 번 래핑해 놓으면 공통적인 변경 사항에 대한 수정이 쉽다.
    // 예를 들어 axios로 변경 한다면 그냥 fetch 부분만 변경해주면 전부 적용이 되는 것이라 볼 수 있음.
    const res = await fetch(url, options);
    return await res.json();
}

async function fetchData(username) {
    return request(`https://todo-api.roto.codes/${username}`);
}

async function toggle(username, id){
    return request(`https://todo-api.roto.codes/${username}/${id}/toggle`, { 
        method: 'PUT' 
    });
}

async function remove(username, id){
    return request(`https://todo-api.roto.codes/${username}/${id}`, {
        method: 'DELETE',
    });
}

async function createTodo(username, todoText){
    await fetch(`https://todo-api.roto.codes/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            content: todoText,
        }),
    })
}