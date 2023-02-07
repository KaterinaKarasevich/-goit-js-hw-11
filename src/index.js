
import ImagesAPI from './fetchImages.js';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

//import debounce from 'lodash.debounce';

const imagesAPI = new ImagesAPI();
console.log(imagesAPI)

const form = document.querySelector("#search-form");
const imagesContainer = document.querySelector(".gallery");
console.dir( imagesContainer)


form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesAPI.searchQuery = form.elements.searchQuery.value.trim();
  console.log(imagesAPI.searchQuery)

  imagesAPI.
  fetchImages()
    //.then(({ hits }) => {
    //console.log(hits)
    //return hits
  //})
  .then(createMarkupImages)
  .catch(error => console.log(error))
  .finally(() => form.reset());
}
//{ webformatURL, largeImageURL, tags, likes, views, comments, downloads }
function createMarkupImages(images) {
  const imagesArray = images.hits;;

  if (imagesArray.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

  const markUpImage = imagesArray.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
      `<div class="photo-card">
      <a class="" href=${largeImageURL}>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
      `)
    .join(" ");
  imagesContainer.innerHTML = markUpImage
  gallery.refresh();
}

//function renderMarkupImages(hits) {

 //const markUpImage = createMarkupImages(hits)
 // gallery.innerHTML = markUpImage

//}

//4.  Работа с библиотекой SimpleLightbox для создания галереи картинок
const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 500,
    close: true,
    loop: true,
});
console.log(gallery)