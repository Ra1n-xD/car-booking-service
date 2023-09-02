export async function getAutos() {
    const autos = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/autos`, {
        next: { revalidate: 60 }
    });

    if (!autos.ok) {
        throw new Error('Failed to fetch data');
    }

    return autos.json();
}

export async function getCities() {
    const cities = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/cities`, {
        next: { revalidate: 60 }
    });

    if (!cities.ok) {
        throw new Error('Failed to fetch data');
    }

    return cities.json();
}

export async function getOrders(userEmail: any) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('userEmail', userEmail as string);

    const orders = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders`, { method: 'GET', headers: headers });

    if (!orders.ok) {
        throw new Error('Failed to fetch data');
    }

    return orders.json();
}

export async function getOrder(id: string) {
    const orders = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/orders/${id}`, { next: { revalidate: 60 } });

    if (!orders.ok) {
        throw new Error('Failed to fetch data');
    }

    return orders.json();
}
