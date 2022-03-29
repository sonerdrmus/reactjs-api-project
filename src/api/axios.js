import axios from 'axios';
const BASE_URL = 'apiurltext';

export default axios.create({
    baseURL: BASE_URL
});