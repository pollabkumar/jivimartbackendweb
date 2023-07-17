const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const axios = require('axios')
const bodyParser = require('body-parser');
// new
//pollab

//pollab
const Insta = require('instamojo-nodejs');
const url = require('url');
// new

const { connection } = require('./configs/db.js');

const { payment } = require('./routes/payment.router');

require('dotenv').config();

const app = express();



app.use(express.json());


app.use(cors({
	origin: '*'
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, PATCH, POST, PUT, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
app.use(cookieParser());



app.post('/api/bid/', (req, res) => {
	Insta.setKeys('test_d883b3a8d2bc1adc7a535506713', 'test_dc229039d2232a260a2df3f7502');
	// Insta.setKeys('180c4491e7b7195c106a29e9b79fa14f', '30009eb95b26d7915d37386ca3060e28');

	const data = new Insta.PaymentData();
	Insta.isSandboxMode(true);

	data.purpose = req.body.purpose;
	data.amount = req.body.amount;
	data.buyer_name = req.body.buyer_name;
	data.redirect_url = req.body.redirect_url;
	data.email = req.body.email;
	data.phone = req.body.phone;
	data.send_email = false;
	data.webhook = 'http://www.example.com/webhook/';
	data.send_sms = false;
	data.allow_repeated_payments = false;
	data.token = req.body.token;
	console.log(data, 'dsicis')
	Insta.createPayment(data, function (error, response) {
		if (error) {
			res.send({ msg: error })
		} else {
			const responseData = JSON.parse(response);
			console.log(responseData, 'responseData pay')
			const redirectUrl = responseData.payment_request.longurl;
			console.log(redirectUrl, 'responseData url')
			res.status(200).json({ msg: redirectUrl });
		}
	});
});

app.get('/callback/', async (req, res) => {
	let url_parts = url.parse(req.url, true),
		responseData = url_parts.query;
	// console.log('responseData callback', responseData)
	const data = {
		payment_status: responseData.payment_status,
		payment_id: responseData.payment_id,
		id: req.cookies.ordercookie
	}
	res.redirect(`http://localhost:3000/Confirm/${responseData.payment_status+responseData.payment_id}`)
	console.log(req, 'ooo')
	console.log(req, 'ooo2')
	// console.log(res, 'ppp')


	// function decrpt() {
	// 	console.log('cookies.s_l.toString()', req.cookies.s_l.toString())
	// 	let removefirst = req.cookies.s_l.toString().slice(10);
	// 	console.log(removefirst.toString(), 'removefirst')
	// 	let removelast = removefirst.slice(0, -10);
	// 	return removelast
	// }

	// let tokenn = decrpt(req.cookies)
	// let orderidcookie = (req.cookies.ordercookie)
	// console.log("orderidcookie777", orderidcookie)
	// console.log('newCookies2', tokenn)
	// console.log(data, 'datadatadata')
	// console.log(responseData, 'poopop')



	// if (data == null) {
	// 	console.log("error")
	// }



	// if (responseData.payment_id) {
	// 	try {
	// 		let orderdata = axios.defaults.headers.common['Authorization'] = `Bearer ${tokenn}`;
	// 		console.log('llll', orderdata)
	// 		const response = axios.post('https://jivimart.com/public/api/user/order/make/payment/id', data)
	// 			.then(ress => {
	// 				console.log("postdata", ress)
	// 				let sendorderid = ress.data.data.order_uuid
	// 				console.log('jjjjj', sendorderid)
	// 				res.redirect(`https://jivimart.com/Confirm/${sendorderid}`)

	// 			}
	// 			)
	// 		console.log(response, 'response2')

	// 	} catch (error) {
	// 		console.log(error);
	// 	}

	// }
});



const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
	try {
		await connection;
		console.log('Connected to DB');
	} catch (error) {
		console.log(error);
		console.log('Cannot connect to DB')
	}
	console.log(`Server Running On Port ${PORT}`)
})






















