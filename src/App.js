import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from "./Form";
import Footer from "./Footer";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1 className="site-title">Gitspace</h1>
                <h2 className="desc">Know the space occupied by your public repositories.</h2>
                <Form/>
                <Footer/>
            </div>
        )
    }
}

export default App;
