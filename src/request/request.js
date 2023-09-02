import axios from "axios";

export function request(config) {
    const service = axios.create({
        timeout: 5000,
    })

    service.interceptors.request.use(config => {
        return config;
    },
    err => {
        console.log(err);
        return Promise.reject();
    })

    service.interceptors.response.use(res => {
        return res.data;
    },
    err => {
        console.log(err);
        return Promise.reject();
    })

    return service(config);
}