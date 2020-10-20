export const createPayload = (status, data = {}) => {
    return {
        status,
        data,
    }
}