import T1 from "../T1"
import RoundButton from "../RoundButton"
import { useState } from "react";
import emailjs from "emailjs-com";

const Subscribe = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const sendEmail = () => {
        const serviceID = import.meta.env.VITE_YOUR_SERVICE_ID 
        const templateID = import.meta.env.VITE_YOUR_TEMPLATE_ID 
        const publicKey = import.meta.env.VITE_YOUR_PUBLIC_KEY
    
        const templateParams = {
            to_name: "Beautiful User",
            message: "Thanks for subscribing to our newsletter. Buckle up to receive the latest trends in your inbox.",
            from_name: "ShopCo",
            to_email: email, 
        };
    
        emailjs
          .send(serviceID, templateID, templateParams, publicKey)
          .then(
            (response) => {
              console.log("SUCCESS!", response.status, response.text);
              setMessage("A mail has been sent.");

              fetch("https://reduxcart-cygbit-default-rtdb.firebaseio.com/shopco_subscribers.json", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        subscribedAt: new Date().toISOString(),
                    }),
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log("Email saved to Firebase:", data);
                })
                .catch((error) => {
                    console.error("Error saving to Firebase:", error);
                });
              setEmail(""); 
            },
            (err) => {
              console.error("FAILED...", err);
              setMessage("Failed to send email. Please try again.");
            }
          );
      };

  return (
    <div className='flex justify-between items-center w-[86%] bg-black p-12 py-0 rounded-[2.5vw] mt-[-100px] mb-10 sm:flex-wrap sm:px-7 sm:rounded-[5vw] sm:pb-7'>
        <T1 align="left" className='text-white w-[40vw] mt-0 mb-0 sm:w-full'>STAY UP TO DATE ABOUT OUR LATEST OFFERS</T1>
        <div className='w-[20vw] flex flex-col gap-6 items-center justify-center sm:w-full'>
            <input 
                type="email" 
                className='w-full text-[1vw] rounded-full py-3 px-6 focus:outline-none sm:text-lg' 
                placeholder="Enter your email address..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <RoundButton text="Subscribe to Newsletter" width="full" onClick={sendEmail} className='bg-white !text-black font-semibold'></RoundButton>
            {message && <p className="text-white font-light text-sm text-center">{message}</p>}
        </div>
    </div>
  )
}

export default Subscribe
