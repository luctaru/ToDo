import React, { Component, Fragment } from 'react'
import './App.css'
import Axios from 'axios';
import Button from './components/Button'
import Lista from './components/Lista'
import $ from 'jquery';

class App extends Component {
  state = {
    todo_text: '',
    todos: []
  }

  componentDidMount = () => {
    this.loadState();

  }

  add = () => {
    Axios.post('http://localhost:4000/' + this.state.todo_text, {
      name: this.state.todo_text
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleChange = (e) => {

    this.setState({
      todo_text: e.target.value
    })
  }

  loadState = () => {
    Axios.get('http://localhost:4000/')
      .then(res => {
        const aux = res.data;
        this.setState({ todos: aux })
      })
      .catch((err) => {
        console.log(err);
      })
  }



  render() {
    return <Fragment>
      <h1>TODO</h1>
      <Lista todo={this.state.todos} />
      <input type="text" id="todo_text" value={this.state.todo_text} placeholder="Digite um ítem" onChange={this.handleChange} />

      <Button value="Adicionar" onClick={this.add} />
    </Fragment>;
  }
}

export default App