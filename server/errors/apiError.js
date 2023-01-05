class ApiError extends Error{
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;

    }
    static badRequest(message, errors = []) {
        return new ApiError('400', message, errors);
    }
    static forbidden(message) {
        return new ApiError('403', message);
    }
    static unauthorizedError(message) {
        return new ApiError('401', message);
    }
    static internal(message) {
        return new ApiError('500', message);
    }
    static unknownError(message) {
        return new ApiError('520', message);
    }
}

module.exports = ApiError;