import axios from 'axios';

const CRUDCRUD_URL = 'https://crudcrud.com/api/af829f59ae754458ba30736bdf098b3b';

export const api = axios.create({
  baseURL: `${CRUDCRUD_URL}/books`,
});

