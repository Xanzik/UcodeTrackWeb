export default class ApiError extends Error {
    constructor(status, message, errors) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static ForbiddenError(message, errors = []) {
        return new ApiError(403, message, errors);
    }

    static UnauthorizedError() {
        return new ApiError(401, 'Unauthorized');
    }

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }
}
