import { useRef, useState } from "react";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container,Row, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

import useAuth from "../hooks/useAuth";

const KamionAdd = () => {


    const userRef = useRef();
    const errRef = useRef();

    const { auth } = useAuth();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setMail] = useState('');
    const [photo, setPhoto] = useState('');

    const [nameFocus, setNameFocus] = useState(false);
    const [validName, setValidName] = useState(false);  

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("first_name", first_name);
        formData.append("last_name", last_name);
        formData.append("email", email);
        formData.append("photo", photo);

        try {

            const response = await axios({
                method: "post",
                url: "https://kamion-interview.herokuapp.com/api/shipper/carrier",
                data: formData,
                headers: { 
                    "Content-Type": "multipart/form-data",
                    "Authorization": 'Bearer '+auth.accessToken
                },
            });

            setFirstName("");
            setLastName("");
            setMail("");

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

    const handleFileSelect = (e) => {
        setPhoto(e.target.files[0])
    }

    return (
        <Container>
            
            <Header />

            <Row className="dashboard">
                <Col sm={6} md="auto">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <h2 className="mb-3 mt-3">Güvenilir Kamyoncu Ekle</h2>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="first_name">
                            <FontAwesomeIcon icon={faCheck} className={first_name ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={first_name || !first_name ? "hide" : "invalid"} />
                        </label>

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
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />

                        <label htmlFor="last_name">
                            <FontAwesomeIcon icon={faCheck} className={last_name ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={last_name || !last_name ? "hide" : "invalid"} />
                        </label>
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
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />

                        <label htmlFor="email">
                            <FontAwesomeIcon icon={faCheck} className={email ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={email || !email ? "hide" : "invalid"} />
                        </label>
                        
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
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby="uidnote"
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />

                        <input 
                            type="file"
                            className="form-control mb-4 mt-4"
                            onChange={handleFileSelect}
                            onFocus={() => setNameFocus(true)}
                            onBlur={() => setNameFocus(false)}
                        />

                        <button className="btn btn-success mb-3">KAYDET</button>
                        
                    </form>
                </Col>
            </Row>
        </Container>
        
    )
}

export default KamionAdd;