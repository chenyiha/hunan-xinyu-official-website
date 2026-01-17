import axios from 'axios';

export function useRequest() {

    const http = axios.create({
        timeout: 60000,
        // 其他配置...
    });

    // 封装get请求
     const get = (url:string, params:any) => http.get(url, { params });

// 封装post请求
     const post = (url:string, data:any) => http.post(url, data);

    return {
        get,
        post
    };
}


