import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '40632967-013f73fc2657493819414c02d';

export default async function getQueryData(searchQuery, page) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page,
    });

    const response = await axios.get(`${BASE_URL}?${params}`);

    return response.data;
}
