export default class LoadMoreBtn {
  constructor({ selector, isHidden = false}) {
    this.button = this.getButton(selector);

    isHidden && this.hide();
    }

  getButton(selector) {
    return document.querySelector(selector);
  }

   stopLoading() {
    this.button.textContent = "Load More";
  }

  loading() {
    this.button.textContent = "Loading...";
  }

  hide() {
    this.button.classList.add("hidden");
  }

  show() {
    this.button.classList.remove("hidden");
  }
}