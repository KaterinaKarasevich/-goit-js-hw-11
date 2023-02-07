import Notiflix from 'notiflix';


export default class ImagesAPI {
    constructor() {
        this.searchQuery = "";
    }
    
    fetchImages() {
        const ENDPOINT = "https://pixabay.com/api/"
        const API_KEY = "33443659-5d835de587e8c602875123faf"
      
        return fetch(`${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`)   
            .then(response => {
                if (!response.ok){
                throw new Error(response.status);        
            }
             return response.json();
           });
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}