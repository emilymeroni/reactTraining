import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-3bf35.firebaseio.com/'
})

export default instance;