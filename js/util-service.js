'use strict';

function getRandomFloatingNum(min, max) {
    var precision = 100; // 2 decimals
    return Math.floor(Math.random() * (max * precision - min * precision) + min * precision) / (1 * precision);
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', 'Hey', 'All', 'this happened', 'more or less', 'yes', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', 'Amazing', 'It', 'was', 'a pleasure', 'to', 'burn'];
    var txt = '';
    while (size > 0) {
        size--;
        txt += words[Math.floor(Math.random() * words.length)] + ' ';
    }
    return txt;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}


function compareValues(key, order = 'asc') {
    return function innerSort(b1, b2) {
        const book1 = (typeof b1[key] === 'string') ? b1[key].toUpperCase() : b1[key];
        const book2 = (typeof b2[key] === 'string') ? b2[key].toUpperCase() : b2[key];
        let comparison = 0;
        if (book1 > book2) comparison = 1;
        else if (book1 < book2) comparison = -1;
        return (
            (order === 'desc') ? (comparison * -1) : comparison
        );
    };
}