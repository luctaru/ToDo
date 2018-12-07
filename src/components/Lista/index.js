import React, { Component } from 'react';
import Axios from 'axios';
import Button from '../Button'

class Lista extends Component {

    constructor(props) {
        super(props);
    }

    removeItem = (item) => {
        
        this.props.todo.filter((itemList) => {
            if (itemList === item) {
                Axios.get('http://localhost:4000/rm/' + item, { data: { name: item}})
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })

    }


    render() {
        if (this.props.todo === undefined) {
            return (<h1>Carregando</h1>);
        }
        else {
            return (
                <ul>
                    {this.props.todo.map(
                        (item, index) => {
                            return <li key={index}>{item} <Button value="X" onClick={() => this.removeItem(item)}></Button></li>
                        }
                    )}
                </ul>
            );

        }
    }
}

export default Lista;