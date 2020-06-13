module.exports = {
    response: (response, status, data, statusCode) => {
        const result = {};
        result.data = data || '';
        result.statusCode = statusCode || 200;
        result.status = status === 'success' ? true : false;

        return response.status(result.statusCode).json({
            success: result.status,
            data: result.data
        });
    }
};