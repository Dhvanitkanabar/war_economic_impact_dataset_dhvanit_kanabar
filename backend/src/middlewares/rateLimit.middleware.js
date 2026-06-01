const rateLimiter = (options) => {
  const { windowMs = 60000, maxLimit = 100, message = "Too many requests, please try again later." } = options;
  const ipStore = {};

  return (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown-ip";
    const now = Date.now();

    if (!ipStore[ip]) {
      ipStore[ip] = {
        count: 1,
        windowStart: now,
      };
      return next();
    }

    const client = ipStore[ip];

    // If window expired, reset count and windowStart
    if (now - client.windowStart > windowMs) {
      client.count = 1;
      client.windowStart = now;
      return next();
    }

    client.count += 1;

    if (client.count > maxLimit) {
      return res.status(429).json({
        success: false,
        message,
        retryAfterMs: windowMs - (now - client.windowStart),
      });
    }

    return next();
  };
};

const generalLimiter = rateLimiter({
  windowMs: 60000, // 1 minute
  maxLimit: 100,
  message: "Limit requests per minute exceeded.",
});

const authLimiter = rateLimiter({
  windowMs: 60000, // 1 minute
  maxLimit: 15,
  message: "Prevent brute force attacks: too many auth attempts. Please wait 1 minute.",
});

const searchLimiter = rateLimiter({
  windowMs: 60000, // 1 minute
  maxLimit: 30,
  message: "Limit excessive searches: too many search requests. Please wait.",
});

const adminLimiter = rateLimiter({
  windowMs: 60000, // 1 minute
  maxLimit: 30,
  message: "Strict admin rate limiting: excessive admin requests. Please wait.",
});

const uploadLimiter = rateLimiter({
  windowMs: 60000, // 1 minute
  maxLimit: 5,
  message: "Limit bulk uploads: too many bulk upload requests.",
});

module.exports = {
  rateLimiter,
  generalLimiter,
  authLimiter,
  searchLimiter,
  adminLimiter,
  uploadLimiter,
};
