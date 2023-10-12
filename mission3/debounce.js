export default function debounce(callback, delay=300){
    let timerId = null;
    return (...args) => {
        if(timerId){
            clearTimeout(timerId)
        };

        timerId = setTimeout(() => {
            callback(...args);
        }, delay);
    };
};