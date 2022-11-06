import {Navbar, Container, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {LinkContainer} from 'react-router-bootstrap';

//responsive navbar
const ResponsiveAppBar = (prop) => {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="top" collapseOnSelect>
            <Container>
                <a href="https://awakentopeace.org" id="homeButton">
                    <Navbar.Brand>Home</Navbar.Brand>
                </a>
            
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        
                        <LinkContainer to="/">
                            <Nav.Link>Game Area</Nav.Link> 
                        </LinkContainer>
                    </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default ResponsiveAppBar;