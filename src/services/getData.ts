export async function getAutos() {
    try {
        const autos = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/autos`, {
            next: { revalidate: 60 }
        });

        if (!autos.ok) {
            return { error: 'Failed to fetch data' };
        }

        return autos.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getCities() {
    try {
        const cities = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cities`, {
            next: { revalidate: 60 }
        });

        if (!cities.ok) {
            return { error: 'Failed to fetch data' };
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

        const orders = await fetch(`/api/orders`, { method: 'GET', headers: headers });

        if (!orders.ok) {
            return { error: 'Failed to fetch data' };
        }

        return orders.json();
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getOrder(id: string) {
    try {
        const order = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`, { next: { revalidate: 60 } });

        if (!order.ok) {
            return { error: 'Failed to fetch data' };
        }

        return order.json();
    } catch (error: any) {
        throw new Error(error);
    }
}
