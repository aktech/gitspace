import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Sentry from '@sentry/browser';
import Form from "./Form";
import Footer from "./Footer";

Sentry.init({dsn: "https://f624cc79b0aa4acc97959177183f0d11@sentry.io/4400890"});

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
