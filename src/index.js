import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import AddAuthorForm from './AddAuthorForm';
import {shuffle, sample} from 'underscore';




const authors =[
    {
        books:["CouchDB: The Definitive Guide"],
        name: ["Mark Twain"],
        imgUrl: 'images/tadeusz.jpg'
    },{
        books: ["Anna Karenina"],
        name: ["Leo Tolstoy"],
        imgUrl: 'images/lew.jpg'
    },
    {
        books: ["Pan Tadeusz"],
        name: ["Adam Mickiewicz"],
        imgUrl: 'images/tadeusz.jpg'
    },
    {
        books: ["The Adventures of Huckleberry Finn"],
        name: ["Mark Twain"],
        imgUrl: 'images/mark.jpg'
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
        author: authors.find((author) => author.books.some((title) =>  title === answer))
    }
}

function reducer(state ={authors, turnData:getTurnData(authors), hightlight: '' }, action){
    switch (action.type){
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign({},state, {hightlight:isCorrect ? 'correct':'wrong' });
        case 'CONTINUE':
          return Object.assign({}, state, {
              hightlight: '',
              turnData: getTurnData(state.authors)});
        case "ADD_AUTHOR":
           return Object.assign({}, state, {
               authors:state.authors.concat([action.author])});
        default: return state;
    }
}

let store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
        <BrowserRouter>
            <ReactRedux.Provider store ={store}>
                <React.Fragment>
                    <Route exact path ="/" component={AuthorQuiz}/>
                    <Route exact path ="/add" component={AddAuthorForm}/>
                </React.Fragment>
            </ReactRedux.Provider>
        </BrowserRouter>, document.getElementById('root'));

serviceWorker.unregister();

