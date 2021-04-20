import axios from 'axios';

const clienteAxios = axios.create({
    baseURL: 'http://localhost:5500/'
})

export default clienteAxios;