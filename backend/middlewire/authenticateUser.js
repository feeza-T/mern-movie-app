import jwt from 'jsonwebtoken';

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
    try {
        // Retrieve tokens from cookies
        const token = req.cookies.token;
        const refreshToken = req.cookies.refreshtoken;

        // If both tokens are missing, log the user out
        if (!token && !refreshToken) {
            console.log("No token or refresh token found. Logging out user.");
            res.clearCookie("token");
            res.clearCookie("refreshtoken");
            return res.status(401).json({
                message: "User is not authenticated. Please log in.",
                success: false,
            });
        }

        // If the token is available and valid, proceed with the request
        if (token) {
            try {
                const decoded = jwt.verify(token, "your_secret_key");
                req.user = decoded; 
                return next();
            } catch (error) {
                if (error.name === "TokenExpiredError") {
                    console.log("Token has expired, checking refresh token...");
                } else {
                    console.error("Error verifying token:", error);
                    return res.status(401).json({
                        message: "Invalid token",
                        success: false,
                    });
                }
            }
        }

        // If the token is expired or not available, but the refresh token is available
        if (refreshToken) {
            try {
                const decodedRefreshToken = jwt.verify(refreshToken, "your_refresh_secret_key");
                // Generate a new token and save it to the cookie
                const newToken = jwt.sign({ id: decodedRefreshToken.id }, "your_secret_key", { expiresIn: "1h" });
                res.cookie("token", newToken, { expires: new Date(Date.now() + 10 * 60 * 1000), httpOnly: true });

                req.user = decodedRefreshToken; 
                console.log("New token generated and user authenticated.");
                return next();
            } catch (error) {
                console.error("Error verifying refresh token:", error);
                res.clearCookie("token");
                res.clearCookie("refreshtoken");
                return res.status(401).json({
                    message: "Invalid refresh token. Please log in again.",
                    success: false,
                });
            }
        }

        // Fallback case where no valid tokens are found
        console.log("Token or refresh token is missing or invalid. Logging out user.");
        res.clearCookie("token");
        res.clearCookie("refreshtoken");
        return res.status(401).json({
            message: "User is not authenticated. Please log in.",
            success: false,
        });
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
