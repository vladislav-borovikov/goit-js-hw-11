import './sass/style.scss';
import ApiServis from './api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix';



const formEl = document.querySelector('#search-form')
const loadMoreBtn = document.querySelector('.load-more')
const galleryList = document.querySelector('.gallery')
const inputEl = document.querySelector('[name="searchQuery"]');

const apiServis = new ApiServis()
let lightbox = new SimpleLightbox('.gallery a');

loadMoreBtn.classList.add('visually-hidden');
formEl.addEventListener('submit', searchFoo)
loadMoreBtn.addEventListener('click', loadMore)

async function searchFoo(event) {
    let totalHitsNum = 0
    event.preventDefault()

    clear()
    if (inputEl.value === '') {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    apiServis.query = event.currentTarget.elements.searchQuery.value
    apiServis.resetPage()
    const data = await apiServis.fetchCard()
    console.log(data)
    totalHitsNum = data.total
    if (data.length === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else markUp(data);

    loadMoreBtn.classList.remove('visually-hidden');

}

async function loadMore() {
    const data = await apiServis.fetchCard()
    console.log(data)
    if (data.length === 0) {
        alert('eto wse')
        loadMoreBtn.classList.add('visually-hidden');

    } else markUp(data)
    // apiServis.fetchCard().then(markUp)
}

function markUp(hits) {
    const imgCard = hits.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
       <a class="gallery__item" href="${largeImageURL}">
  <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes </b>
      <span class="info-item__value"> ${likes}</span>
    </p>
    <p class="info-item">
      <b>Views </b>
      <span class="info-item__value"> ${views}</span>
    </p>
    <p class="info-item">
      <b>Comments </b>
      <span class="info-item__value">${comments}</span>
    </p>
    <p class="info-item">
      <b>Downloads </b>
      <span class="info-item__value">${downloads}</span>
    </p>
  </div>
  </a>
</div>`).join('')
    galleryList.insertAdjacentHTML('beforeend', imgCard)
    lightbox.refresh();
}

function clear() {
    galleryList.innerHTML = '';
}

