import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const key = 'key=29632293-ff96c464f368918703067e198';
const filter = 'image_type=photo&orientation=horizontal&safesearch=true';

export default class NewsApiServise {
    constructor() {
this.searchQuery = '';
this.page = 1;
this.perPage = 40;
    }


async fetchArticles(){
    const response = await axios.get(
        `${BASE_URL}?${key}&q=${this.searchQuery}&${filter}&page=${this.page}&per_page=${this.perPage}`
    );
    this.incrementPage();
    return response;
    }



    incrementPage() {
        this.page += 1;
    }
    
    resetPage() {   
        this.page = 1;
    }   

    get query (){
        return this.searchQuery;
    }

    set query (newQuery){
        this.searchQuery = newQuery;
    }
}