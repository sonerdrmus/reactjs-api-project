import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

import axios from '../api/axios';

const LOGIN_URL = 'apiloginurl';

const Login = () => {

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 
                        "Access-Control-Allow-Origin": "*",
                        'Content-Type': 'application/json'         
                        },
                }
            );

            /* {"success":true,"status":200,"message":"","error_code":0,
                "data":{
                    "id":40,
                    "username":"soner",
                    "first_name":"soner",
                    "last_name":"durmus",
                    "phone":"905319863329",
                    "email":"sonerdrmus@gmail.com",
                    "token":"2y10PUDIYFqpuPiaTRt2NRCV6W0SptzTYu0TK3YNX1VKzv5tHTeUBI9q",
                    "created_at":"2022-03-15T13:54:40.000000Z",
                    "updated_at":"2022-03-15T13:54:40.000000Z"}
            } */

            const accessToken = response.data.data.token;
            const success = response.data.success;
            
            setAuth({ username, password, accessToken, success });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });

        } catch (err) {
            if (!err?.response) {
                setErrMsg('SUNUCU YANIT VERMEDİ');
            } else if (err.response?.status === 400) {
                setErrMsg('Kullanıcı Adı veya Şifre Yanlış');
            } else if (err.response?.status === 401) {
                setErrMsg('Yetkisiz');
            } else {
                setErrMsg('Giriş Yapılamadı!');
            }
            errRef.current.focus();
        }
    }

    return (

        <section className='login'>
            <img width={200} style={{ alignSelf: 'center', marginBottom: '30px' }} src='data:image/png;base64,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' />
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1><b>Giriş Yap</b></h1>
            <h4>Frontend Developer Assessment</h4>

            <form onSubmit={handleSubmit}>
                <input
                    className="form-control"
                    type="text"
                    id="username"
                    placeholder='Kullanıcı Adı'
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={username}
                    required
                />

                <input
                    className="form-control"
                    type="password"
                    placeholder='Şifre'
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <button className="btn btn-dark mb-3">GİRİŞ YAP</button>
            </form>
            <p>
                Kayıtlı değil misiniz ?<br />
                <span className="line">
                    <Link to="/register">Kayıt Ol</Link>
                </span>
            </p>
        </section>
    )
}

export default Login;
