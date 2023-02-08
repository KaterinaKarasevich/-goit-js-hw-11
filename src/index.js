
import ImagesAPI from './fetchImages.js';
import LoadMoreBtn from "./components/LoadMoreButton.js";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const imagesAPI = new ImagesAPI();


const form = document.querySelector("#search-form");
const imagesContainer = document.querySelector(".gallery");


form.addEventListener("submit", onSubmit);
const loadMoreBtn = new LoadMoreBtn
  ({
    selector: ".load-more",
    isHidden: true,
  });
console.log(loadMoreBtn)

loadMoreBtn.button.addEventListener("click", onLoadMore)


function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesAPI.searchQuery = form.elements.searchQuery.value.trim();
  console.log(imagesAPI.searchQuery)
  loadMoreBtn.disable();
  clearInput()
  imagesAPI.resetPage()
  loadMoreBtn.show()

  imagesAPI.
    fetchImages()
    //.then(createMarkupImages)
    .then((images) => {
      createMarkupImages(images);
      loadMoreBtn.enable();
    })
  .catch(error => console.log(error))
  .finally(() => form.reset());
}

function createMarkupImages(images) {
  const imagesArray = images.hits;;

  if (imagesArray.length === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

  const markUpImage = imagesArray.map(
    ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>
      `<div class="photo-card">
      <a class="" href=${largeImageURL}>
  <img class ="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
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
  imagesContainer.insertAdjacentHTML("beforeend", markUpImage)
  gallery.refresh();
}

//function renderMarkupImages(hits) {

 //const markUpImage = createMarkupImages(hits)
 // gallery.innerHTML = markUpImage

//}

function onLoadMore() {
  loadMoreBtn.disable();
  imagesAPI.
  fetchImages()
  //.then(createMarkupImages)
    .then((images) => {
      createMarkupImages(images);
      loadMoreBtn.enable();
    })
  .catch(error => console.log(error))
  
}

function clearInput() {
  document.querySelector(".gallery").innerHTML = "";
}

const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: "alt",
    captionDelay: 300,
    close: true,
    loop: true,
});
console.log(gallery)