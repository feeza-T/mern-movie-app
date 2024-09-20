import jwt from 'jsonwebtoken';

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
    try {
        console.log("tokens", req.headers.authorization);
        // Extract token from headers
        const token = req.headers.authorization?.split(" ")[1]; // Access token
        const refreshToken = req.headers['x-refresh-token']; // Refresh token from headers

 console.log(refreshToken);

        // Check if both tokens are missing
        if (!token && !refreshToken) {
            console.log("No token or refresh token found. Logging out user.");
            return res.status(401).json({
                message: "User is not authenticated. Please log in.",
                success: false,
            });
        }

        // 1. If access token is available and valid, authenticate user
        if (token) {
            try {
                const decoded = jwt.verify(token, "your_secret_key");
                req.user = decoded;
                return next();
            } catch (error) {
                // If token is expired or invalid, proceed to refresh token check
                if (error.name === "TokenExpiredError " || error.name === 'JsonWebTokenError') {
                    try {
                        console.log("Access token has expired or deleted.");
                        const decodedRefreshToken = jwt.verify(refreshToken, "your_refresh_secret_key");
                        console.log("if refresh ",decodedRefreshToken);
        
                        // If refresh token is valid, generate a new access token
                        const newToken = jwt.sign({ id: decodedRefreshToken.id }, "your_secret_key", { expiresIn: "1h" });
        
                        // Send the new access token back in the response headers
                        res.setHeader('x-new-token', newToken);
        
                        // Optionally, save the new token in local storage on the client side
                        req.user = decodedRefreshToken; 
                        console.log("New access token generated using the refresh token.");
        
                        // Proceed to the next middleware/route
                        return next();
                    } catch (error) {
                        console.error("Invalid refresh token:", error);
                        return res.status(401).json({
                            message: "Invalid refresh token. Please log in again.",
                            success: false,
                        });
                    }

                  
                } else {
                    return res.status(401).json({
                        message: "Invalid access token",
                        success: false,
                    });
                }
            }
        }


        // If no valid tokens are found, log out the user
        console.log("No valid tokens found. Logging out user.");
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
