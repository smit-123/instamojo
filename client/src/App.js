import logo from './logo.svg';
import { useEffect, useState } from "react"
import './App.css';
import axios from 'axios';


function App() {
  const [paymentLink, setPaymentLink] = useState('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/create-payment', {
        // Send payment details here
      });
      // window.open("https://www.w3schools.com");
      if (response) {
        console.log(response.data.payment_request.longurl);
        window.open(response.data.payment_request.longurl)
      }

      // Extract the payment link from the response
      setPaymentLink(response.payment_request.longurl);
    } catch (error) {
      console.error('Error creating payment:', error);
    }
  };


  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
      {paymentLink && <a href={paymentLink}>Click here to complete the payment</a>}
    </div>
  );
}

export default App;
