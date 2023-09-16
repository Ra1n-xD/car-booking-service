export async function getAutos() {
    try {
        const autos = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/autos`);

        if (!autos.ok) {
            console.error('Ошибка загрузки данных');
        }

        return autos.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCities() {
    try {
        const cities = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cities`);

        if (!cities.ok) {
            console.error('Ошибка загрузки данных');
        }

        return cities.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getOrders(userEmail: string | null | undefined) {
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('userEmail', userEmail as string);

        const orders = await fetch(`/api/orders`, { method: 'GET', headers: headers, cache: 'no-store' });

        if (!orders.ok) {
            console.error('Ошибка загрузки данных');
        }

        return orders.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getOrder(id: string) {
    try {
        const order = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`, { cache: 'no-store' });

        if (!order.ok) {
            console.error('Ошибка загрузки данных');
        }

        return order.json();
    } catch (error: any) {
        throw new Error(error);
    }
}
