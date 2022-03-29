import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <section>
            <h1>Yetki Yok!</h1>
            <br />
            <p>Yetkiniz Olmayan Sayfaya Erişemezsiniz.</p>
            <div className="flexGrow">
                <button onClick={goBack}>Geri Dön!</button>
            </div>
        </section>
    )
}

export default Unauthorized