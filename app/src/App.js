import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tree from './Tree';
import FolderList from "./FolderList";
import FolderEdit from './FolderEdit';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Tree}/>
                    <Route path='/folders' exact={true} component={FolderList}/>
                    <Route path='/folders/:id' component={FolderEdit}/>
                </Switch>
            </Router>
        )
    }
}

export default App;