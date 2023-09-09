// server.js
const express = require('express');
const bodyParser = require('body-parser');
const Instamojo = require("instamojo-payment-nodejs");
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

Instamojo.isSandboxMode(true); // For testing

Instamojo.setKeys("test_8f87673cce048747126bcf30502", "test_aea7b98538f5f92d236b4de76ba");

// Initialize Instamojo with your API credentials
// const api = new Instamojo({
//     apiKey: 'test_8f87673cce048747126bcf30502',
//     authToken: 'test_aea7b98538f5f92d236b4de76ba',
// });
// console.log(api)
app.post('/api/create-payment', async (req, res) => {
    try {
        const options = {
            purpose: "Product buy", // REQUIRED
            amount: 100000, // REQUIRED and must be > ₹3 (3 INR)
            currency: "INR",
            buyer_name: "",
            email: "smit.adept2@gmail.com",
            phone: null,
            send_email: true,
            send_sms: false,
            allow_repeated_payments: false,
            webhook: "",
            redirect_url: "",
        };

        const paymentData = Instamojo.PaymentData(options);

        const response = await Instamojo.createNewPaymentRequest(paymentData);
        res.send(response)

    } catch (error) {
        console.error('Error creating payment request:', error);
        res.status(500).json({ error: 'Payment request creation failed' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
