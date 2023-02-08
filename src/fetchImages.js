
export default class ImagesAPI {
    constructor() {
        this.queryPage = 1;
        this.searchQuery = "";
    }
    
    fetchImages() {
        const ENDPOINT = "https://pixabay.com/api/"
        const API_KEY = "33443659-5d835de587e8c602875123faf"
      
        return fetch(`${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.queryPage}`)
            .then((response) => response.json())
            .then((data) => {
                this.incrementPage();
                return data;
            });
    }
    
    resetPage() {
        this.queryPage = 1;
    }

     incrementPage() {
        this.queryPage += 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}