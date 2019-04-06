import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class FolderList extends Component {

    constructor(props) {
        super(props);
        this.state = {folders: [], isLoading: true};
        this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.setState({isLoading: true});

        fetch('api/folders')
            .then(response => response.json())
            .then(data => this.setState({folders: data, isLoading: false}));
    }

    async remove(id) {
        await fetch(`/api/folders/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(() => {
            let updatedFolders = [...this.state.folders].filter(i => i.id !== id);
            this.setState({folders: updatedFolders});
        });
    }

    render() {
        const {folders, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const foldersList = folders.map(folder => {
            return <tr key={folder.id}>
                <td style={{whiteSpace: 'nowrap'}}>{folder.id}</td>
                <td style={{whiteSpace: 'nowrap'}}>{folder.title}</td>
                <td style={{whiteSpace: 'nowrap'}}>{folder.parentId}</td>
                <td>
                    <ButtonGroup>
                        <Button size="sm" color="primary" tag={Link} to={"/folders/" + folder.id}>Edit</Button>
                        <Button size="sm" color="danger" onClick={() => this.remove(folder.id)}>Delete</Button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <AppNavbar/>
                <Container fluid>
                    <div className="float-right">
                        <Button color="success" tag={Link} to="/folders/new">Add Folder</Button>
                    </div>
                    <h3>Folders</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">id</th>
                            <th width="20%">Title</th>
                            <th width="20%">Parent id</th>
                            <th width="10%">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {foldersList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default FolderList;