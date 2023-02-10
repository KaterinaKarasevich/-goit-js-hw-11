import axios from 'axios';

axios.defaults.baseURL = "https://pixabay.com/api/"

const API_KEY = "33443659-5d835de587e8c602875123faf"

export default class ImagesAPI {
    constructor() {
        this.page = 1;
        this.searchQuery = "";
    }
    
   async fetchImages() {
        const options = new URLSearchParams({
           key: API_KEY,
           page: this.page,
           q: this.searchQuery,
           image_type: "photo",
           orientation: "horizontal",
           safesearch: "true",
           per_page: 40,       

       });
        
       const {data} = await axios(`?${options}`);
          
        this.incrementPage();
        return data
          
    }
    
    resetPage() {
        this.page = 1;
    }

     incrementPage() {
        this.page += 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}


// return axios.get(`${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.queryPage}`)
           // .then((response) => response.json())
           // .then((data) => {
                //this.incrementPage();
               // return data.data;
           // });
 //   }
    