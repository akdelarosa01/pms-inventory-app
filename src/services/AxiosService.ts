import axios from "axios";

const AxiosService = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/json',
    },
});

AxiosService.interceptors.request.use( (axiosRequestConfig) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    axiosRequestConfig.headers.Authorization = `Bearer ${token}`;
    return axiosRequestConfig;
});

AxiosService.interceptors.response.use((response) => {
    return response;
}, (error) => {

    try {
        const {response} = error;

        if (response && response.status == 401) {
            localStorage.removeItem('ACCESS_TOKEN');
        }

        console.log(error.response.data.message);
        throw error;
    } catch (e:any) {
        console.log(e.response.data);
        throw e;
    }
    
});

export default AxiosService;