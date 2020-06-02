var gTrans = {
    title: {
        en: '#BOOKSHOP',
        he: '#חנות_הספרים'
    },
    'lang-en': {
        en: '<img class="lang" src="imgs/en.png" /> English',
        he: '<img class="lang" src="imgs/en.png" /> אנגלית'
    },
    'lang-he': {
        en: '<img class="lang" src="imgs/he.png" /> Hebrew',
        he: '<img class="lang" src="imgs/he.png" /> עברית'
    },
    'add-book-name-input': {
        en: 'Insert Book name',
        he: 'הקלד שם ספר'
    },
    'add-book-price-input': {
        en: 'Insert price',
        he: ' הקלד מחיר בדולרים'
    },
    'add-book-btn': {
        en: 'add new book',
        he: 'הוסף ספר חדש'
    },
    'th-id': {
        en: 'ID',
        he: 'מס"ד'
    },
    'th-title': {
        en: 'Book Title',
        he: 'שם הספר'
    },
    'th-rating': {
        en: 'Rating',
        he: 'דירוג'
    },
    'th-price': {
        en: 'Price',
        he: 'מחיר'
    },
    'th-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'th-actions': {
        en: 'Actions',
        he: 'פעולות'
    },
    'read-btn': {
        en: 'Read',
        he: 'קרא'
    },
    'update-btn': {
        en: 'Update',
        he: 'עדכן'
    },
    'del-btn': {
        en: 'Delete',
        he: 'מחק'
    },
    'del-all-btn': {
        en: 'Delete All',
        he: 'מחק הכל'
    },
    paging: {
        en: 'Page',
        he: 'עמוד'
    },
    'empty-display': {
        en: 'no books to show...',
        he: '...אין ספרים לתצוגה'
    }
}

var gCurrLang = 'en';

function getTrans(transKey) {
    // if key is unknown return 'UNKNOWN'
    if (!gTrans[transKey]) return 'UNKNOWN'
    var transMap = gTrans[transKey];
    var trans = transMap[gCurrLang];
    // If translation not found - use english
    if (!trans) trans = transMap['en']
    return trans;
}

function doTrans() {
    var els = document.querySelectorAll('[data-trans]');
    for (var i=0; i < els.length; i++){
        var el = els[i]
        var transKey = el.dataset.trans;
        var trans = getTrans(transKey);

        if (el.nodeName === 'INPUT') el.placeholder = trans;
        else el.innerHTML = trans;
    }
}

function setLang(lang) {
    gCurrLang = lang;
    doTrans()
}

function formatNumOlder(num) {
    return num.toLocaleString('es')
}

function formatNum(num) {
    return new Intl.NumberFormat(gCurrLang).format(num);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL',{ style: 'currency', currency: 'ILS' }).format(num);
}

function formatDate(time) {

    var options = {
        year: 'numeric', month: 'short', day: 'numeric',
        hour: 'numeric', minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat(gCurrLang,options).format(time);
}

function kmToMiles(km) {
    return km / 1.609;
}


function relativeTime(ts) {
    return moment(ts).fromNow();
}

function getCurrLang() {
    return gCurrLang;
}

function $ToNis(price) {
    return (price * 3.48375005).toFixed(2) + '₪';
}

function nisTo$(price) {
    return '$' + (price / 3.48375005).toFixed(2);
}

function currExchange(price) {
    if (gCurrLang === 'en') return '$' + price;
    else return $ToNis(price);
}