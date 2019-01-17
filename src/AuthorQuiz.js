import React  from 'react';
import './App.css';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'


function Hero(){
    return (
        <div className='row'>
            <div className="jumbotron col-10 offset-1">
                <h1>Author quiz</h1>
                <p>Wybierz poprawną odpowiedź na zadane pytania</p>
            </div>
        </div>
    )
}

function Turn({author,books, hightlight, onAnswerSelected}){
    function heilightColour (hightlight){
        const mapping= {
            'none':'',
            'correct':'green',
            'wrong':'red'
        }
        return mapping[hightlight];
    }
    return (
        <div className='row turn' style={{backgroundColor:heilightColour(hightlight)}}>
            <div className='col-4 offset-1'>
                <img src={author.imgUrl} alt="Author" className='authorimage'/>
            </div>
            <div className='col-4'>
                {books.map((title) => <Book title={title} key={title} onClick={onAnswerSelected}/>)}
            </div>
        </div>
    )
}
Turn.propTypes = {
        author: PropTypes.shape ({
        name:PropTypes.string.isRequired,
        imgUrl:PropTypes.string.isRequired,
        books:PropTypes.arrayOf(PropTypes.string).isRequired,

    }),
        books:PropTypes.arrayOf(PropTypes.string).isRequired,
        onAnswerSelected:PropTypes.func.isRequired,
        hightlight: PropTypes.string.isRequired,

};

function Book ({title, onClick}){
    return (
        <div className='answer' onClick={()=>{onClick(title);}}>
            <h3>{title}</h3>
        </div>
    )
}
function Continue({show, onContinue}){
    return (
        <div className='row continue'>
            { show
               ? <div className='col-11'>
                    <button className='btn btn-primary btn-lg float-right'onClick={onContinue}>next </button>
                </div>
            :null}
        </div>
    )
}

function Footer(){
    return (
        <div className='row' id='footer'>
            <div className='col-12'>
                <p className='text-muted credit'>
                    wszystkie obrazki sa ze strony <a href='https://commons.wikimedia.org/wiki/Main_Page'>z linka</a>
                </p>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        turnData:state.turnData,
        hightlight: state.hightlight
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onAnswerSelected: (answer) =>{
            dispatch({type:'ANSWER_SELECTED', answer});
        },
        onContinue:() =>{
            dispatch({type:'CONTINUE'});
        }
    }
}

const AuthorQuiz =connect(mapStateToProps, mapDispatchToProps)(function({turnData, hightlight, onAnswerSelected, onContinue}) {

    return (
      <div className='container-fluid'>
        <Hero/>
        <Turn {...turnData} hightlight={hightlight} onAnswerSelected={onAnswerSelected} />
        <Continue show={hightlight === 'correct'} onContinue={onContinue}/>
          <p><Link to= "/add">Add author</Link></p>
        <Footer/>
      </div>
    );
});

export default AuthorQuiz;
