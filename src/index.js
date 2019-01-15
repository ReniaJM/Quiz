import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore'



const authors =[
    {
        books:"CouchDB: The Definitive Guide",
        name: "Mark Twain",
        imgUrl:'images/mark.jpg'
    },{
        books: "Anna Karenina",
        name: "Leo Tolstoy",
        imgUrl: "images/lew.jpg",
    },
    {
        books: "Pan Tadeusz",
        name: "Adam Mickiewicz",
        imgUrl: "images/tadeusz.jpg",
    },
    {
        books: "The Adventures of Huckleberry Finn",
        name: "Mark Twain",
        imgUrl: "images/mark.jpg",
    },

]


function getTurnData(authors){
    const allbooks= authors.reduce(function(p,c) {
        return p.concat(c.books);
    },[]);
    const fourRandomBooks = shuffle(allbooks).slice(0,4);
    const answer = sample (fourRandomBooks)
    return{
        books:fourRandomBooks,
        author:  authors.find((author) => author.books)
        // author: authors.find((author) => author.books.some((title) => title ===answer))
    }

}

const state = {
    turnData : getTurnData(authors),
    hightlight: 'correct'

};

ReactDOM.render(<AuthorQuiz {...state}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
