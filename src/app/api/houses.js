import client from './client';

const getHouses = () => client.get('/');

const detailHouse = (id) => client.get('/' + id);

export default {
    getHouses,
    detailHouse
}