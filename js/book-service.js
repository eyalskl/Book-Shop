'use strict';
const KEY = 'books';
var gBooks;
var gNextId = 1;
var gSortBy = 'none';

const PAGE_SIZE = 5;
var gPageIdx = 0;

function getPageIdx() {
    return gPageIdx;
}

function createBooks() {
    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = [];
        for (var i = 0; i < 15; i++) {
            books.push(_createBook());
        }
    }
    gBooks = books;
    _saveBooksToStorage();
}
function getBooks() {
    if (gSortBy === 'none') gBooks = gBooks;
    if (gSortBy === 'id') gBooks = toggleSort('id');
    if (gSortBy === 'title') gBooks = toggleSort('name');
    if (gSortBy === 'rating') gBooks = toggleSort('rating');
    if (gSortBy === 'price') gBooks = toggleSort('price');
    var startIdx = gPageIdx*PAGE_SIZE;
    return gBooks.slice(startIdx, startIdx + PAGE_SIZE)
}

function pageChange(diff) {
    gPageIdx += diff;
    // if (gPageIdx * PAGE_SIZE >= gCars.length) gPageIdx = 0;
}

function toggleSort(key) {
    var elTh = document.querySelector(`#${gSortBy}`);
    elTh.classList.toggle('sorted');
    if (!elTh.classList.contains('sorted')) {
        return gBooks.sort(compareValues(key, 'desc'));
    } else return gBooks.sort(compareValues(key));
}

function _createBook(name, price) {
    if (!name) var name = makeLorem(2);
    if (!price) var price = getRandomFloatingNum(10, 100); //get a random price with 2 decimal points between 10-100
    return {
        id: gNextId++,
        name: name,
        price: price,
        rating: 0,
        details: makeLorem(),
        imgUrl: `${getRandomIntInclusive(1, 5)}.jpg`
    }
}

function addBook(name, price) {
    gBooks.push(_createBook(name, price));
    _saveBooksToStorage()
}

function removeBook(bookId) {
    var bookIdx = gBooks.findIndex(book => book.id === +bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();
}

function removeAllBooks() {
    gBooks = [];
    _saveBooksToStorage();
}

function updateBook(bookId, price) {
    var book = getBookById(bookId);
    if (!price | price < 0) price = getRandomFloatingNum(10, 100);
    book.price = price;
    _saveBooksToStorage();
}

function getBookById(bookId) {
    return gBooks.find(book => book.id === +bookId);
}

function changeRating(book, diff) {
    setSortBy('none');
    if ((book.rating <= 0 && diff === -1) || (book.rating >= 10 && diff === 1)) return;
    book.rating += +diff;
    _saveBooksToStorage();
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks)
}

function setSortBy(key) {
    gSortBy = key;
}

function getPagesAmount() {
    return Math.ceil(gBooks.length / PAGE_SIZE);
}