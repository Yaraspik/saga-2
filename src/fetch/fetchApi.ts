export const getServices = async () => {
    const res = await fetch("http://localhost:7070/api/services");
    return await res.json();
}

export const getServiceById = async (id: string) => {
    const res = await fetch(`http://localhost:7070/api/services/${id}`);
    return await res.json();
}