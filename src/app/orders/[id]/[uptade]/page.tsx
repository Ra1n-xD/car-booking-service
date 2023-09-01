import Link from 'next/link';

const UpdateOrder = ({ params }: { params: { id: string } }) => {
    return (
        <div>
            <h1 className="h1 mt-4 text-center">нереальная обнова заявки #{params.id}</h1>
            <h2 className="text-center">тут будет форма обновы</h2>

            <div className="mb-4 d-flex offset justify-content-center">
                <Link href={`/orders/${params.id}`}>
                    <button className="mt-4 btn btn-primary">К заявке</button>
                </Link>

                <Link href="/">
                    <button className="mt-4 btn btn-danger">Удалить заявку</button>
                </Link>
            </div>
        </div>
    );
};

export default UpdateOrder;
