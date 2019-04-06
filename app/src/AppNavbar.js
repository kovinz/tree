import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { Link } from 'react-router-dom';

export default class AppNavbar extends Component {
    constructor(props) {
        super(props);
        this.state = {isOpen: false};
    }

    render() {
        return <Navbar color="dark" dark expand="md">
            <NavbarBrand tag={Link} to="/">Tree</NavbarBrand>
            <NavbarBrand tag={Link} to="/folders">Edit Nodes</NavbarBrand>
        </Navbar>;
    }
}