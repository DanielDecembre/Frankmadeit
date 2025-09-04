import { Client, Environment } from 'square';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import xss from 'xss';

// Load environment variables manually
dotenv.config();

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again later' }
});

// Authentication middleware
const authenticateToken = (req) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    throw new Error('No authentication token provided');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    throw new Error('Invalid authentication token');
  }
};

// Initialize performance monitoring
const startTime = () => process.hrtime();
const getElapsedTime = (start) => {
  const [seconds, nanoseconds] = process.hrtime(start);
    return seconds * 1000 + nanoseconds / 1000000; // Convert to milliseconds
    };

    // Create a singleton instance of the Square client
    let squareClient = null;
    const getSquareClient = () => {
      if (!squareClient) {
          squareClient = new Client({
                accessToken: process.env.SQUARE_ACCESS_TOKEN,
                      environment: process.env.SQUARE_ENV === 'sandbox' ? Environment.Sandbox : Environment.Production,
                          });
                            }
                              return squareClient;
                              };

// Enhanced validation and sanitization
const validateAndSanitizeRequest = (price, productName) => {
  const errors = [];
  
  // Price validation
  if (!price || typeof price !== 'number') {
    errors.push('Price must be a number');
  } else if (price <= 0) {
    errors.push('Price must be greater than 0');
  } else if (price > 999999.99) { // Add maximum price limit
    errors.push('Price exceeds maximum allowed amount');
  }

  // Product name validation and sanitization
  if (!productName || typeof productName !== 'string') {
    errors.push('Product name must be a string');
  } else {
    const sanitizedName = xss(productName.trim());
    if (sanitizedName === '') {
      errors.push('Product name cannot be empty');
    } else if (sanitizedName.length > 100) { // Add length limit
      errors.push('Product name exceeds maximum length of 100 characters');
    }
    // Check for potentially malicious patterns
    if (/[<>{}()]/.test(productName)) {
      errors.push('Product name contains invalid characters');
    }
  }

  return {
    errors,
    sanitizedData: errors.length === 0 ? {
      price: Number(price.toFixed(2)), // Ensure proper decimal places
      productName: xss(productName.trim())
    } : null
  };
};export default async function handler(req, res) {
  // Apply rate limiting
  try {
    await new Promise((resolve, reject) => {
      limiter(req, res, (result) => {
        if (result instanceof Error) {
          reject(result);
        }
        resolve();
      });
    });
  } catch (error) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  // Verify environment variables
  const requiredEnvVars = ['SQUARE_ACCESS_TOKEN', 'SQUARE_LOCATION_ID', 'JWT_SECRET'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingEnvVars.length > 0) {
    console.error('Missing environment variables:', missingEnvVars);
    return res.status(500).json({ 
      error: 'Server configuration error', 
      details: 'Missing required environment variables' 
    });
  }

  // Method validation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Authentication
  try {
    const user = authenticateToken(req);
    // Optional: Add role-based authorization
    if (!user.roles?.includes('customer')) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }

  const requestStart = startTime();
  const { price, productName } = req.body;
  
  // Enhanced validation and sanitization
  const { errors, sanitizedData } = validateAndSanitizeRequest(price, productName);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  // Log sanitized data
  console.log('Validated Request:', {
    originalPrice: price,
    originalProductName: productName,
    sanitizedData
  });

  try {
    const client = getSquareClient();
    const apiStart = startTime();
    
    const response = await client.checkoutApi.createPaymentLink({
      idempotencyKey: uuidv4(),
      quickPay: {
        name: productName,
        priceMoney: {
          amount: Math.round(price * 100),
          currency: 'USD',
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      },
    });

    const apiDuration = getElapsedTime(apiStart);
    const totalDuration = getElapsedTime(requestStart);
    
    const checkoutUrl = response.result.paymentLink.url;
    console.log('Performance:', {
      apiDuration: `${apiDuration}ms`,
      totalDuration: `${totalDuration}ms`
    });
    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error('Square Checkout Error:', error.message, error.response?.data);
    return res.status(500).json({ error: 'Failed to create checkout link', details: error.response?.data || error.message });
  }
}