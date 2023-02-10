
import ImagesAPI from './fetchImages.js';
import LoadMoreBtn from "./components/LoadMoreButton.js";
import { Notify } from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/styles.css';

const imagesAPI = new ImagesAPI();
const loadMoreBtn = new LoadMoreBtn
  ({
    selector: ".load-more",
    isHidden: true,
  });

const form = document.querySelector("#search-form");
const imagesContainer = document.querySelector(".gallery");

form.addEventListener("submit", onSubmit);
loadMoreBtn.button.addEventListener("click", onLoadMore)


async function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  imagesAPI.searchQuery = form.elements.searchQuery.value.trim();
  if (imagesAPI.searchQuery === "") {
    Notify.warning('Input must not be empty');
    clearInput()
    return;
  }
  imagesAPI.resetPage()

  try {
    const { hits, totalHits } = await imagesAPI.fetchImages()
    
    if (totalHits === 0) {
        Notify.warning('Sorry, there are no images matching your search query. Please try again.');
  
        clearInput()
        loadMoreBtn.hide();
        return;
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
    createMarkupImages(hits);
    loadMoreBtn.show();
  } catch (error) {
    Notify.failure('Sorry, something went wrong');
  }
  form.reset();
}
   

function createMarkupImages(images) {
  const markUpImage = images.map(
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

async function onLoadMore() { 
    loadMoreBtn.loading()
   try {
      const {hits} = await imagesAPI.fetchImages()
      createMarkupImages(hits);
      loadMoreBtn.stopLoading()

     if (hits.length < 40) {
       loadMoreBtn.hide();
       Notify.info('We are sorry, but you have reached the end of search results.');
     }

  } catch (error) {
      Notify.failure('Sorry, something is wrong');
  }
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