export const createResponse = (res) => (data = {}, status = 200) =>
    res.status(status).send({
        status: status == 200 ? 'success' : 'error',
        data,
    });
