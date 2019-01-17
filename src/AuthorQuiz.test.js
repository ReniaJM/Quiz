import React from 'react';
import ReactDOM from 'react-dom';
import AuthorQuiz from './AuthorQuiz';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({adapter: new Adapter()});

describe("AuthorQuiz", () =>{
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AuthorQuiz />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
})

