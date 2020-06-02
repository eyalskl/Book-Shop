'use strict';

function onInit() {
    createBooks();
    renderBooks();
    doTrans();
}

function renderBooks() {
    var strHTMLs;

    var elTBody = document.querySelector('.books-body');
    var books = getBooks();
    if (books.length === 0) {
        strHTMLs = `<tr><th colsapn="6"> No Books to show :( </th></tr>`
        document.querySelector('.empty-display').hidden = '';
        elTBody.innerHTML = '';

    } else {
        strHTMLs = books.map(book => {
            return `<tr>
        <td>${book.id}</td>
        <td class="caps">${book.name}</td>
        <td>${book.rating}</td>
        <td class="book${book.id}">${currExchange(book.price)}</td>
        <td> <button id="${book.id}" class="read-btn" data-trans="read-btn" onclick="onReadBook(this.id)"></button> </td>
        <td> <button id="${book.id}" class="update-btn" data-trans="update-btn" onclick="onUpdateBook(this)"></button> </td>
        <td> <button id="${book.id}" class="delete-btn" data-trans="del-btn" onclick="onRemoveBook(this.id)"></button> </td>
        </tr>`
        })
        document.querySelector('.empty-display').hidden = true;
        elTBody.innerHTML = strHTMLs.join('');
    }
    document.querySelector('.page-idx').innerText = `${gPageIdx + 1}/${getPagesAmount()}`;
    var pageIdx = getPageIdx();
    if (pageIdx === 0) document.querySelector('.prev').disabled = true;
    else document.querySelector('.prev').disabled = '';
    if (pageIdx === getPagesAmount() - 1) document.querySelector('.next').disabled = true;
    else document.querySelector('.next').disabled = '';
    doTrans()
}

function onReadBook(bookId) {
    var book = getBookById(bookId);
    renderModal(book);
}

function renderModal(book) {
    var elModal = document.querySelector('.read-modal');
    var strHTML = `<button class="close-modal-btn" onclick="closeModal()">x</button>
    <h2>Book : ${book.name}</h2>
    <img src="imgs/${book.imgUrl}" alt="Book image">
    <p>${book.details}</p>
    <h4>Set Rating</h4>
    <div class="rating-container">
        <button id="${book.id}" onclick="onChangeRating(this.id, -1)">-</button>
        <span class="rating">${book.rating}</span>
        <button id="${book.id}" onclick="onChangeRating(this.id, 1)">+</button>
    </div>
    `
    elModal.innerHTML = strHTML;
    elModal.hidden = '';

}

function closeModal() {
    var elModal = document.querySelector('.read-modal');
    elModal.classList.add('animate__animated', 'animate__bounceOutRight');
    setTimeout(() => {
        elModal.classList.remove('animate__animated', 'animate__bounceOutRight');
        elModal.hidden = true;
    }, 1000);
}

function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}

function onRemoveAllBooks() {
    removeAllBooks();
    renderBooks();
}

function onAddBook() {
    var bookNameInput = document.querySelector('[name=name]');
    var bookPriceInput = document.querySelector('[name=price]');
    var bookName = bookNameInput.value;
    var bookPrice = +bookPriceInput.value;
    addBook(bookName, bookPrice);
    renderBooks();
    bookNameInput.value = '';
    bookPriceInput.value = '';
}

function onUpdateBook(updateBtn) {
    var bookId = updateBtn.id;
    var btnTxt = updateBtn.innerText;
    var elPriceTd = document.querySelector(`.book${bookId}`);
    if (btnTxt === 'Update' || btnTxt === 'עדכן') {
        elPriceTd.innerHTML = `<input name="price-update" type="number" data-trans="update-btn" placeholder="Update">`
        if (btnTxt === 'Update') updateBtn.innerText = 'Set';
        else updateBtn.innerText = 'קבע';
    } else {
        var updatedPrice = elPriceTd.querySelector('input').value;
        updateBook(bookId, updatedPrice);
        elPriceTd.innerHTML = updatedPrice;
        // updateBtn.innerText = 'Update';
        renderBooks()
    }
}

function onChangeRating(bookId, diff) {
    var book = getBookById(bookId);
    changeRating(book, diff);
    renderModal(book);
    renderBooks();
}

function onSetSortBy(key) {
    setSortBy(key);
    renderBooks();
}

function onPageChange(diff) {
    pageChange(diff);
    renderBooks();
}

function onSetLang(lang) {
    if (lang === getCurrLang()) return;
    setLang(lang);
    renderBooks();
    document.querySelector('#en').classList.toggle('mode');
    document.querySelector('#he').classList.toggle('mode');
}