import Notiflix from "notiflix";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import getQueryData from "./js/pixabay-service";
import createGalleryMarkup from "./js/gallery-markup";

const refs = {
    formEl: document.getElementById('search-form'),
    galleryEl: document.querySelector('.gallery'),
    queryBtn: document.querySelector('.form-btn'),
    loadMoreBtn: document.querySelector('.load-more')
}
let searchQuery = '';
let page = 1;
let gallery;

refs.formEl.addEventListener('submit', submitBtnHandler);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnHandler);

async function submitBtnHandler(event) { 
    event.preventDefault();
    const form = event.currentTarget;
    searchQuery = event.currentTarget.elements.searchQuery.value;
    page = 1;

    if (!searchQuery.trim()) {
        return Notiflix.Notify.warning('Please enter your request', {
            distance: '90px',
            position: "cenrater-top"
        })
    }

try {
    const queryData = await getQueryData(searchQuery, page);

    form.reset();
    if (!queryData || queryData.hits.length === 0) {
        return failureResponse();
    };
    if (queryData.hits.length > 0) {
        Notiflix.Notify.success(`You have received ${queryData.totalHits} images`, {
            distanse: '90px',
            position: "center-top"
        })
    };

if (queryData.hits.length < 40) {
    refs.loadMoreBtn.classList.add('is-hidden');
} else {
    refs.loadMoreBtn.classList.remove('is-hidden');
};

refs.galleryEl.innerHTML = createGalleryMarkup(queryData.hits);
gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt' });
} catch { failureResponse() }
}

async function loadMoreBtnHandler() {
    page += 1;

    try {
        const queryData = await getQueryData(searchQuery, page);

        refs.galleryEl.insertAdjacentHTML('beforeend', createGalleryMarkup(queryData.hits));
        
        if (page * 40 >= queryData.totalHits) {
            refs.loabMoreBtn.classList.add('is-hidden');
        }

        gallery.refresh();
    } catch { failureResponse() }
}

function failureResponse() {
    Notiflix.Notify.failure('Sorry, ther are no images matching your search query. Please try again.');
}





// const refs = {
//     formEl: document.querySelector(''),
//     heroEl: document.querySelector('')

// }


// const url = 'https://newsapi.org/v2/everything?q=Apple&from=2023-11-11&sortBy=popularity&apiKey=4a0a3f36d8de4779b95cf49e161ca857';

// //fetch(url);

// class NewsApi {
//     static #API_KEY = '4a0a3f36d8de4779b95cf49e161ca857';
//     static #PAGE_SIZE = 10;
//     static #BASE_URL = 'https://newsapi.org/v2';
//     constructor() {
//       this.q = '';
//       this.page = 1;
//     }
//     getArticles() {
//         const END_POINT = ;
//         const PARAMS = new URLSearchParams({
//             q: this.q,
//             page: this.page,
//             pageSaze: NewsApi.#PAGE_SIZE,
//             apiKey: NewsApi.#API_KEY,
//         });
//         const url = NewsApi.#BASE_URL + END_POINT + PARAMS;

//         return fetch(url) 
//         .then(res => res.json())
//         .rhen(data => console.log(data));
//     }
// }



// const refs = {
//     formEl: document.querySelector('.js-search-form');
// };

// refs.formEl.addEventListener('submit', onFormSubmit);

// function onFormSubmit(e) {
//     e.preventDefault();
//     console.log('');
// }



