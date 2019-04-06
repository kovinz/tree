import React, { Component } from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import AppNavbar from './AppNavbar';

export default class Tree extends Component {
    constructor(props) {
        super(props);

        this.state = {treeData: [], item: this.emptyItem};
    }

    emptyItem = {
        id: '',
        title: '',
        parentId: ''
    };

    componentDidMount() {

        fetch('api/folders/1/children')
            .then(response => response.json())
            .then(data => this.setState({treeData: data}));
    }

    render() {
        return (
            <div style={{ height: 400 }}>
                <AppNavbar/>
                <SortableTree
                    treeData={this.state.treeData}
                    onChange={treeData => this.setState({ treeData })}
                    getNodeKey={({ node }) => node.id}
                    onMoveNode={({ node, nextParentNode }) => {let item = {...this.state.item};
                                                                item['id'] = node.id;
                                                                item['parentId'] = nextParentNode.id;
                                                                item['title'] = node.title;
                                                                this.setState({item});
                                                                fetch('/api/folders', {
                                                                    method: 'PUT',
                                                                    headers: {
                                                                        'Accept': 'application/json',
                                                                        'Content-Type': 'application/json'
                                                                    },
                                                                    body: JSON.stringify(item),
                                                                });
                                                                 }}
                />
            </div>
        );
    }
}