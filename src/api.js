import axios from 'axios'

const API_KEY = '24504393-335e93f8f8ae51e578d8e0bea';
const BACE_URL = `https://pixabay.com/api/?key=${API_KEY}`
// &image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&q=`;


export default class ApiServis {

    constructor() {
        this.searchQuery = ''
        this.page = 1
    }

    fetchCard = async (searchQuery) => {
        const { data } = await axios.get(BACE_URL, {
            params: {
                q: this.searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 40,
            },
        });
        this.page += 1
        return data.hits
    }

    // fetchCard(searchQuery) {

    //     return fetch(`${baseURL}${this.searchQuery}`).then(response => response.json()).then(d => {
    //         this.page += 1
    //         return d.hits
    //     })

    // }

    resetPage() {
        this.page = 1
    }

    get query() {
        return this.searchQuery
    }
    set query(newQuery) {
        return this.searchQuery = newQuery
    }
}