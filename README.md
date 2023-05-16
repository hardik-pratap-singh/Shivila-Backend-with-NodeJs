# Shivila-Backend-with-NodeJs

1) **Registration API**  (email , phone_number , username , password)  -- Express Validator , Sending confirmation mail to registered users through Nodemailer
2) **Login** (email/mobile , password)  -- JWT Implementation, Hashing and Salting of Passwords
3) **Subscription using Razorpay Model** -- crypto , razorpay SDK

<img width="960" alt="image" src="https://github.com/hardik-pratap-singh/Shivila-Backend-with-NodeJs/assets/97048877/ee9827e3-83bf-4847-bd16-1bc19a1412f2">


4) **Subscription Validity** -- route for checking the validity of a subscribed user for 6 months

**Note** : To use the app in your local environment, you need to do following things 
- Do `npm install` in root directory
- Set necessary environment variables (MONGO_URI , KEY and SECRET) 
Here KEY and SECRET are Razorpay API key and secret that you will get on the dashboard page of Razorpay
- Once you are login, you will receive a token, you need to update the token variables present in `standard.html` with the new token. This we need to do manually in order to experience the full functioning of frontend and backend integration of Razorpay. Once this backend gets its frontend part, we no longer need to do this. 
- Start the app by running `npm start`
This will start the app smoothly on `http://localhost:5000/`.

