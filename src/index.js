import '../src/css/style.css';
import NewsApiServise from './js/pixabay-servise';
import Notiflix from 'notiflix'
import {form, gallery, loadMoreBTN} from './js/const';
import renderImg from './js/render';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const  lightbox = new SimpleLightbox('.gallery a');

const newsApiServise = new NewsApiServise();

form.addEventListener('submit', onSearchForm);
loadMoreBTN.addEventListener('click', onLoadMore);


function  onSearchForm(e){
    try {
        e.preventDefault();
newsApiServise.searchQuery = e.currentTarget.searchQuery.value.trim();
newsApiServise.resetPage();
if (newsApiServise.searchQuery === '') {
    return Notiflix.Notify.warning('Write something');
}
newsApiServise.fetchArticles().then(({data}) => {
    if (data.total === 0) {
    Notiflix.Notify.failure(`Sorry, there are no images matching your ${newsApiServise.searchQuery}. Please try again.`);
    loadMoreBTN.classList.add('is-hidden')
}else if (data.total !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
}
});
loadMoreBTN.classList.remove('is-hidden')
newsApiServise.resetPage();
clearGallery()
onLoadMore();
}catch (onFetchError) {}
}


// function showBtnLoadMore(){
//     loadMoreBTN.classList.add('is-hidden') 
// }

// function hideBtnLoadMore(){
//     loadMoreBTN.classList.remove('is-hidden')
// }



function onLoadMore() {
    try {
    newsApiServise.fetchArticles().then(({ data }) => {
        renderImg(data);
        const totalPages = Math.ceil(data.totalHits / newsApiServise.perPage);
    if (newsApiServise.page - 1 === totalPages + 1) {
    Notiflix.Notify.info(
        `We're sorry, but you've reached the end of search results.`
        );
        lightbox.refresh();
        loadMoreBTN.classList.add('is-hidden')
        return;
    }
    });
    } catch (onFetchError) {}
}


function clearGallery(){
    gallery.innerHTML = '';
}