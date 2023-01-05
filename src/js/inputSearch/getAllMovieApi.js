import axios from 'axios';

const API_KEY = 'b4332e36b7f510b99239c49c027f1d1b';
const URL = `https://api.themoviedb.org/3/`;

export default class MovieApiService {
  constructor() {
    this.userRequest = '';
    this.page = 1;
    this.totalResults = 0;
  }

  async getMovie(_page) {
    const { data } = await axios.get(
      `${URL}search/movie?api_key=${API_KEY}&query=${this.userRequest}&page=${_page}`
    );

    await this.getTotalRes(data);
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  get request() {
    return this.userRequest;
  }

  set request(newRequest) {
    this.userRequest = newRequest;
  }
  getTotalRes(data) {
    this.totalResults = data.total_results;
  }
}
