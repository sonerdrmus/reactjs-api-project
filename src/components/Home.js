import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import ReactPaginate from "react-paginate";
import Header from "./Header";
import { Container,Row, Col, Table, Form, FormControl } from 'react-bootstrap';
import axios from "../api/axios";

const Home = () => {

    const [ kamionList, setKamionList ] = useState([]);
    const [ totalPages, setTotalPages ] = useState(1);
    const [ search, setSearch ] = useState("");

    const { setAuth } = useContext(AuthContext);
    const { auth } = useAuth();

    const AuthStr = 'Bearer '.concat(auth.accessToken);
    
    useEffect(() => {
        fetchKamionList(1);
    }, [])

    const fetchKamionList = (page) => {

        axios.get(`/api/shipper/carrier?page=${page}&per_page=10`, { headers: { Authorization: AuthStr } })
        
        .then(response => {        
            setKamionList(response.data.data);
            setTotalPages(response.data.meta.last_page);
        })
        .catch((error) => {
            console.log('Error : ' + error);
        });
    }

    const handlePageClick = async (page) => {
        const pageCount = page.selected + 1;
        fetchKamionList(pageCount);
    };
    
    return (

        <Container>
            
           <Header />

            <Row className="dashboard">
                <Col sm={12}>
                    <h3>Kamyoncu Listesi</h3>
                    <Row>
                        <Col md="auto" sm={6}>
                        <Form className="d-flex mt-3">
                            <FormControl
                            type="search"
                            placeholder="Kamyoncu Arama..."
                            onChange={
                                e => setSearch(e.target.value)
                            }
                            className="me-6 mt-10"
                            aria-label="Search"
                            />
                        </Form>
                        </Col>
                    </Row>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Resim</th>
                                <th>Ad</th>
                                <th>Soyad</th>
                                <th>E-posta</th>
                                <th>İşlem</th>
                            </tr>
                        </thead>
                        <tbody>

                        { kamionList
                        .filter((kamionList) => {
                            if (search === "") {
                              return kamionList;
                            } else if (
                              kamionList.first_name?.toLowerCase().includes(search?.toLowerCase())
                            ) {
                              return kamionList;
                            }
                        })
                        .map((kamionList, key) => {
                                return (
                                  <tr key={key}>
                                      <td><img width={60} src={ kamionList.image } /></td>
                                      <td>{ kamionList.first_name }</td>
                                      <td>{ kamionList.last_name }</td>
                                      <td>{ kamionList.email }</td>
                                      <td>
                                          <Link to={"/KamionEdit/"+kamionList.id} className="btn btn-primary">Güncelle</Link>
                                      </td>
                                  </tr>
                                ); 
                            })}
                        </tbody>
                    </Table>    
                </Col>
                <ReactPaginate
                    previousLabel={"Geri"}
                    nextLabel={"İleri"}
                    breakLabel={"..."}
                    pageCount={totalPages}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </Row>
            </Container>
    )
}

export default Home;