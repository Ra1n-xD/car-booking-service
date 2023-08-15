import Form from '../components/Form';

const Home = () => {
    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-1 text-center">Оставить заявку</h1>
            <p className="mb-5 text-center">Заполните данные формы</p>
            <Form />
        </div>
    );
};

export default Home;
