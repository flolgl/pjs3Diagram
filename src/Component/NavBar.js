import React from "react";
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';



export default function NavBar(){

    return(
        
    <Navbar bg="light" expand="lg">
        <Container>
            {/* <Navbar.Brand href="#home"><img src={logo} alt="Île-de-Bréhat"/></Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="navBarLinksContainer justify-content-center">
                <Nav className="">
                    <Nav.Link href="/">Accueil</Nav.Link>
                    <Nav.Link href="/ChiffreMois">Chiffre d'affaire mensuel</Nav.Link>
                    <NavDropdown title="Chiffre d'affaire mensuel par catégorie" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/getChiffreCateg?categ=Vegan">Vegan</NavDropdown.Item>
                        <NavDropdown.Item href="/getChiffreCateg?categ=Bio">Bio</NavDropdown.Item>
                        <NavDropdown.Item href="/getChiffreCateg?categ=Halal">Halal</NavDropdown.Item>
                        <NavDropdown.Item href="/getChiffreCateg?categ=Casher">Casher</NavDropdown.Item>

                    </NavDropdown>
                    <Nav.Link href="/getTicketMoyenPerMonth">Prix mensuel moyen du ticket</Nav.Link>
                    <Nav.Link href="/getTicketMoyenClients">Prix du ticket moyen par client</Nav.Link>
                    <NavDropdown title="Dépenses mensuelles des clients achetant dans une catégorie" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/getClientsAndDepensesByCateg?categ=Vegan">Vegan</NavDropdown.Item>
                        <NavDropdown.Item href="/getClientsAndDepensesByCateg?categ=Bio">Bio</NavDropdown.Item>
                        <NavDropdown.Item href="/getClientsAndDepensesByCateg?categ=Halal">Halal</NavDropdown.Item>
                        <NavDropdown.Item href="/getClientsAndDepensesByCateg?categ=Casher">Casher</NavDropdown.Item>

                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
        
    )

}