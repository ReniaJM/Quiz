import React, {Component} from 'react';
import './AddAuthorForm.css';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class AuthorForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imgUrl: '',
            books: [],
            bookTemp: ''
        };
        this.onFieldChange = this.onFieldChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleAddBook = this.handleAddBook.bind(this)
    }

    onFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.props.onAddAuthor(this.state)
    }

    handleAddBook(event) {
        this.setState({
            books: this.state.books.concat([this.state.bookTemp]),
            bookTemp: ''
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="addAuthorForm_input">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.onFieldChange}/>
                </div>
                <div className="addAuthorForm_input">
                    <label htmlFor="imgUrl">Image Url</label>
                    <input type="text" name="imgUrl" value={this.state.imgUrl} onChange={this.onFieldChange}/>
                </div>
                <div className="addAuthorForm_input">
                    {this.state.books.map((book) => <p key={book}>{book}</p>)}
                    <label htmlFor="bookTemp">Books</label>
                    <input type="text" name="bookTemp" value={this.state.bookTemp} onChange={this.onFieldChange}/>
                    <input type="button" value="+" onClick={this.handleAddBook}/>
                </div>
                <input type="submit" value='add'/>
            </form>
        )
    }
}


function AddAuthorForm ({match, onAddAuthor}){
    return <div className="addAuthorForm">
        <h1>Add Author</h1>
        <AuthorForm onAddAuthor={onAddAuthor}/>
    </div>
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author)=>{
            dispatch ({type:'ADD_AUTHOR', author});
            props.history.push('/');
        }
    }
}

function mapStateToProps(state){
    return {
        state
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddAuthorForm))
