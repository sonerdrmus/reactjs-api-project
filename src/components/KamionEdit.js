import { useRef, useState, useContext } from "react";
import { Container,Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";

import Header from "./Header";
import axios from "../api/axios";

import useAuth from "../hooks/useAuth";

const KamionEdit = () => {

    const { id } = useParams();

    const KAMION_EDIT = '/api/shipper/update-carrier/'+id;

    const userRef = useRef();
    const errRef = useRef();

    const { auth } = useAuth();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setMail] = useState('');

    const [errMsg, setErrMsg] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        console.log(first_name, last_name, email);

        try {

            const response = await axios.post(KAMION_EDIT,
                JSON.stringify({ first_name, last_name, email }),
                {
                    headers: { 
                        "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'application/json',
                        "Authorization": 'Bearer '+auth.accessToken    
                    },
                }
            );

            setFirstName('');
            setLastName('');
            setMail('');

        } catch (err) {
            if (!err?.response) {
                setErrMsg('Servise Erişim Sağlanamadı');
            } else if (err.response?.status === 409) {
                setErrMsg('Kullanıcı Adı Alınmış');
            } else {
                setErrMsg('Kayıt Yapılamadı')
            }
            errRef.current.focus();
        }
    }

    return (

        <Container>    

            <Header />

            <Row className="dashboard">
                <Col sm={6} md="auto">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className="mb-3 mt-3">Güvenilir Kamyoncu</h2>
                    <h4>Bilgilerini Güncelle</h4>
                    <form onSubmit={handleUpdate}>

                        <input
                            type="text"
                            id="first_name"
                            className="form-control mb-2 mt-2"
                            placeholder="Ad"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={first_name}
                            required
                            aria-describedby="uidnote"
                        />

                        <input
                            type="text"
                            id="last_name"
                            className="form-control mb-2 mt-2"
                            placeholder="Soyad"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setLastName(e.target.value)}
                            value={last_name}
                            required
                            aria-describedby="uidnote"
                        />
                        
                        <input
                            type="text"
                            id="email"
                            className="form-control mb-2 mt-2"
                            placeholder="E-posta Adresi"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setMail(e.target.value)}
                            value={email}
                            required
                            aria-describedby="uidnote"
                        />

                        <button className="btn btn-success mb-3">GÜNCELLE</button>
                    </form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default KamionEdit;