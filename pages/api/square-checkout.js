import { Client, Environment } from 'square';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';

// Load environment variables manually
dotenv.config();

const client = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: process.env.SQUARE_ENV === 'sandbox' ? Environment.Sandbox : Environment.Production,
});

export default async function handler(req, res) {
  console.log('Environment Variables:', {
    SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
    SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
    SQUARE_ENV: process.env.SQUARE_ENV,
    SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  });

  if (!process.env.SQUARE_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'SQUARE_ACCESS_TOKEN is not defined in environment variables' });
  }
  if (!process.env.SQUARE_LOCATION_ID) {
    return res.status(500).json({ error: 'SQUARE_LOCATION_ID is not defined in environment variables' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { price, productName } = req.body;
  console.log('Request Body:', { price, productName });

  try {
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

    const checkoutUrl = response.result.paymentLink.url;
    console.log('Checkout URL:', checkoutUrl);
    return res.status(200).json({ checkoutUrl });
  } catch (error) {
    console.error('Square Checkout Error:', error.message, error.response?.data);
    return res.status(500).json({ error: 'Failed to create checkout link', details: error.response?.data || error.message });
  }
}