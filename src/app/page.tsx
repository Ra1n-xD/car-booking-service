import Form from '../components/Form';
import { getAutos, getCities } from '@/services/getData';

const Home = async () => {
    const autos = await getAutos();
    const cities = await getCities();

    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-1 text-center">Оставить заявку</h1>
            <p className="mb-4 text-center">Заполните данные формы.</p>

            <Form autos={autos} cities={cities} />
        </div>
    );
};

export default Home;
