import jwt from 'jsonwebtoken';
import xss from 'xss';

// Helper: Authenticate JWT token from Authorization header
function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) throw new Error('No authorization header');
  const token = authHeader.split(' ')[1];
  if (!token) throw new Error('No token provided');
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid token');
  }
}

// Helper: Validate and sanitize request data
function validateAndSanitizeRequest(price, productName) {
  const errors = [];
  let sanitizedPrice = Number(price);
  if (isNaN(sanitizedPrice) || sanitizedPrice <= 0) {
    errors.push('Invalid price');
  }
  let sanitizedProductName = xss(productName);
  if (!sanitizedProductName || typeof sanitizedProductName !== 'string') {
    errors.push('Invalid productName');
  }
  return {
    errors,
    sanitizedData: {
      price: sanitizedPrice,
      productName: sanitizedProductName,
    },
  };
}

// Helper: Return the Square client
function getSquareClient() {
  return squareClient;
}

// Helper: Start timing
function startTime() {
  return Date.now();
}

// Helper: Get elapsed time in ms
function getElapsedTime(start) {
  return Date.now() - start;
}

import { Client, Environment } from 'square';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENV === 'sandbox' ? Environment.Sandbox : Environment.Production,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { price, productName } = req.body;
  if (!price || !productName) {
    return res.status(400).json({ error: 'Missing price or productName' });
  }

  try {
    const response = await squareClient.checkoutApi.createPaymentLink({
      idempotencyKey: uuidv4(),
      quickPay: {
        name: productName,
        priceMoney: {
          amount: Math.round(Number(price) * 100),
          currency: 'USD',
        },
        locationId: process.env.SQUARE_LOCATION_ID,
      },
    });
    const checkoutUrl = response.result.paymentLink.url;
    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error('Square Checkout Error:', error.message, error.response?.data);
    return res.status(500).json({ error: 'Failed to create checkout link', details: error.response?.data || error.message });
  }
}