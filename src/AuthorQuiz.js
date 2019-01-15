import React  from 'react';
import './App.css';


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

function Turn({author,books, hightlight}){
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
                {books.map((title) => <Book title={title} key={title}/>)}
            </div>
        </div>
    )
}

function Book ({title}){
    return (
        <div className='answer'>
            <h3>{title}</h3>
        </div>
    )
}
function Continue(){
    return (
        <div className='row'>

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

function AuthorQuiz({turnData, hightlight}) {

    return (
      <div className='container-fluid'>
        <Hero/>
        <Turn {...turnData} hightlight={hightlight} />
        <Continue/>
        <Footer/>
      </div>
    );
}

export default AuthorQuiz;
