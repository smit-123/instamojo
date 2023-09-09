// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Instamojo = require('instamojo-node');
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

// Initialize Instamojo with your API credentials
const api = new Instamojo({
    apiKey: 'test_8f87673cce048747126bcf30502',
    authToken: 'test_aea7b98538f5f92d236b4de76ba',
});
console.log(api)
app.post('/api/create-payment', async (req, res) => {
    console.log("req.headers => ", req.headers);

    // Set your authentication token here
    const authToken = 'test_aea7b98538f5f92d236b4de76ba'; // Replace with your actual authentication token

    try {
        const response = await api.getPayment({
            purpose: 'Your payment purpose',
            amount: '100', // Amount in INR
            buyer_name: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            redirect_url: 'http://yourwebsite.com/payment-success', // Redirect URL after payment
            send_email: false,
            send_sms: false,
        }, {
            headers: {
                'X-AUTH-TOKEN': authToken, // Set the authentication token header
            },
        });

        // Send the payment link in the response
        res.json({ paymentLink: response.payment_request.longurl });
    } catch (error) {
        console.error('Error creating payment request:', error);
        res.status(500).json({ error: 'Payment request creation failed' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
