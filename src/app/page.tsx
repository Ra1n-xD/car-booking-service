import Form from '../components/Form';

async function getAutos() {
    const autos = await fetch(`${process.env.NEXTAUTH_URL}/api/autos`, {
        next: { revalidate: 60 }
    });

    if (!autos.ok) {
        throw new Error('Failed to fetch data');
    }

    return autos.json();
}

async function getCities() {
    const cities = await fetch(`${process.env.NEXTAUTH_URL}/api/cities`, {
        next: { revalidate: 60 }
    });

    if (!cities.ok) {
        throw new Error('Failed to fetch data');
    }

    return cities.json();
}

const Home = async () => {
    const autos = await getAutos();
    const cities = await getCities();

    return (
        <div className="mt-5 d-flex flex-column align-items-center">
            <h1 className="mb-1 text-center">Оставить заявку</h1>
            <p className="mb-4 text-center">Заполните данные формы</p>

            <Form autos={autos} cities={cities} />
        </div>
    );
};

export default Home;
