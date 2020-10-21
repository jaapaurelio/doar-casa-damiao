export const createResponse = res => (data = {}, status = 200) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(status);
    res.send({
        status: status == 200 ? 'success' : 'error',
        data,
    });
}