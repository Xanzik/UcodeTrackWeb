import ApiError from "../exceptions/api-error.js";

const roleMiddleware = async (req, res, next) => {
  try {
    const userData = req.user;
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }
    if (userData.role !== "admin") {
      return next(
        ApiError.ForbiddenError(
          "You don't have the rights to perform this action."
        )
      );
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};

export default roleMiddleware;
