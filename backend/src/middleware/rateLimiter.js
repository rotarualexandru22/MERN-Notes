import rateLimit from 'express-rate-limit';

const localRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        message: "Too many requests from this IP, please try again after 15 minutes.",
    },
    statusCode: 429,
    standardHeaders: true, 
    legacyHeaders: false, 
});

export default localRateLimiter;