import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'https://anapioficeandfire.com/api/characters',
});

export default apiClient;