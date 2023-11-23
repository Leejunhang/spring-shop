import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Routes, useLocation, Route } from 'react-router-dom';
import SearchPage from './shop/SearchPage';

const NaviPage = () => {
    const location = useLocation();
    const path=location.pathname;
    return (
        <>
        <Navbar expand="lg" bg="primary" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/">Logo</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100%' }}
                navbarScroll>
                <Nav.Link href="/shop/search" className={path.indexOf('/shop/search')!==-1 && 'active'}>상품검색</Nav.Link>
                <Nav.Link href="/shop/list" className={path.indexOf('/shop/list')!==-1 && 'active'}>상품목록</Nav.Link>
              </Nav>
              <Nav>
                    <Nav.Link href="/login" className={path.indexOf('/login')!==-1 && 'active'}>로그인</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Routes>
            <Route path="/shop/search" element={<SearchPage/>}/>
        </Routes>
    </>
    )
}

export default NaviPage