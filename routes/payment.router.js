// const express = require('express');
// const axios = require('axios');
// const payment = express.Router();
// const Insta = require('instamojo-nodejs');
// const url = require('url');
// const cookieParser = require('cookie-parser');

// const app = express();
// app.use(cookieParser());

// // /api/bid/pay
// payment.post('/', (req, res) => {
// // 	Insta.setKeys('test_d883b3a8d2bc1adc7a535506713', 'test_dc229039d2232a260a2df3f7502');
// 	Insta.setKeys('180c4491e7b7195c106a29e9b79fa14f', '30009eb95b26d7915d37386ca3060e28');
	
// 	const data = new Insta.PaymentData();
// 	Insta.isSandboxMode(true);

// 	data.purpose = req.body.purpose;
// 	data.amount = req.body.amount;
// 	data.buyer_name = req.body.buyer_name;
// 	data.redirect_url = req.body.redirect_url;
// 	data.email = req.body.email;
// 	data.phone = req.body.phone;
// 	data.send_email = false;
// 	data.webhook = 'http://www.example.com/webhook/';
// 	data.send_sms = false;
// 	data.allow_repeated_payments = false;
// 	data.token = req.body.token;
// 	// console.log(data, 'dsicis')
// 	Insta.createPayment(data, function (error, response) {
// 		if (error) {
// 			res.send({ msg: error })
// 		} else {
// 			const responseData = JSON.parse(response);
// 			console.log(responseData, 'responseData pay')
// 			const redirectUrl = responseData.payment_request.longurl;
// 			console.log(redirectUrl, 'responseData url')
// 			res.status(200).json({ msg: redirectUrl });
// 		}
// 	});
// });

// payment.get('/callback/', async (req, res) => {
// 	console.log(req, 'ooo')
// 	console.log(req.cookies.s_l, 'ooo2')
// 	console.log(res, 'ppp')

// 	function decrpt() {
// 		console.log('cookies.s_l.toString()', req.cookies.s_l.toString())
// 		let removefirst = req.cookies.s_l.toString().slice(10);
// 		console.log(removefirst.toString(), 'removefirst')
// 		let removelast = removefirst.slice(0, -10);
// 		return removelast
// 	}
// 	let tokenn = decrpt(req.cookies)
// 	let orderidcookie = (req.cookies.ordercookie)
// 	console.log("orderidcookie777", orderidcookie)
// 	console.log('newCookies2', tokenn)
// 	let url_parts = url.parse(req.url, true),
// 		responseData = url_parts.query;
// 	console.log('responseData callback', responseData)
// 	const data = {
// 		payment_status: responseData.payment_status,
// 		payment_id: responseData.payment_id,
// 		id: req.cookies.ordercookie
// 	}
// 	console.log(data, 'datadatadata')
// 	console.log(responseData, 'poopop')



// 	if(data == null){
// 		console.log("error")
// 	}

	

// 	if (responseData.payment_id) {

// 		axios.defaults.headers.common['Authorization'] = `Bearer ${tokenn}`;
// 		const response = axios.post('https://jvmart.backend.webinfoghy.co.in/public/api/user/order/make/payment/id', data)
// 			.then(ress => {
// 				console.log("postdata", ress)
// 			}
// 			)
// 		console.log(response, 'response2')
// 	}



// 	if (responseData.payment_id) {
// 		res.redirect('http://localhost:3000/checkout/')
// 	}
// 	// const response = axios.post('https://jvmart.backend.webinfoghy.co.in/public/api/user/order/make/payment/id' ,data)
// 	// console.log('response  backend' , response)
// 	// const paymentVerify = async (verifyData) => {
// 	// 	try 	
// });
// module.exports = { payment }
















const express = require('express');
const axios = require('axios');
const payment = express.Router();
const Insta = require('instamojo-nodejs');
const url = require('url');
const cookieParser = require('cookie-parser');
const app = express();
const https = require('https');
app.use(cookieParser());

// let options = {
// 	host: 'www.google.com',
// 	port: 443,
// 	path: '/pay',
// 	method: 'POST'
// };
// /api/bid/pay


payment.post('/pay', (req, res) => {
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
	// console.log(data, 'dsicis')

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



payment.get('/callback/', async (req, res) => {
	console.log(req, 'ooo')
	console.log(req.cookies.s_l, 'ooo2')
	console.log(res, 'ppp')

	function decrpt() {
		console.log('cookies.s_l.toString()', req.cookies.s_l.toString())
		let removefirst = req.cookies.s_l.toString().slice(10);
		console.log(removefirst.toString(), 'removefirst')
		let removelast = removefirst.slice(0, -10);
		return removelast
	}
	let tokenn = decrpt(req.cookies)
	let orderidcookie = (req.cookies.ordercookie)
	console.log("orderidcookie777", orderidcookie)
	console.log('newCookies2', tokenn)
	let url_parts = url.parse(req.url, true),
		responseData = url_parts.query;
	console.log('responseData callback', responseData)
	const data = {
		payment_status: responseData.payment_status,
		payment_id: responseData.payment_id,
		id: req.cookies.ordercookie
	}
	console.log(data, 'datadatadata')
	console.log(responseData, 'poopop')



	if (data == null) {
		console.log("error")
	}



	if (responseData.payment_id) {
		try {
			let orderdata = axios.defaults.headers.common['Authorization'] = `Bearer ${tokenn}`;
			console.log('llll', orderdata)
			const response = axios.post('https://super.jivimart.com/public/api/user/order/make/payment/id', data)
				.then(ress => {
					console.log("postdata", ress)
					let sendorderid = ress.data.data.order_uuid
		            console.log('jjjjj',sendorderid)
					res.redirect(`http://localhost:3000/Confirm/${sendorderid}`)
				
				}
				)
			console.log(response, 'response2')

		} catch (error) {
			console.log(error);
		}

	}
	// let orderdata = axios.defaults.headers.common['Authorization'] = `Bearer ${tokenn}`;
	// console.log('llll', orderdata)
	// const response = axios.post('https://jvmart.backend.webinfoghy.co.in/public/api/user/order/make/payment/id', data)
	// 	.then(ress => {
	// 		console.log("postdata", ress)
	// 	}
	// 	)
	// console.log(response, 'response2')



	// if (responseData.payment_id) {
	// 	res.redirect(`http://localhost:3000/Confirm/${sendorderid}`)
	// 	// res.redirect('http://localhost:3000/')
	// }





	// const response = axios.post('https://jvmart.backend.webinfoghy.co.in/public/api/user/order/make/payment/id' ,data)
	// console.log('response  backend' , response)
	// const paymentVerify = async (verifyData) => {
	// 	try 	
});
module.exports = { payment }


// const tls = require('node:tls');
// const https = require('node:https');
// const crypto = require('node:crypto');

// function sha256(s) {
//   return crypto.createHash('sha256').update(s).digest('base64');
// }
// const options = {
//   hostname: 'github.com',
//   port: 443,
//   path: '/',
//   method: 'GET',
//   checkServerIdentity: function(host, cert) {
//     // Make sure the certificate is issued to the host we are connected to
//     const err = tls.checkServerIdentity(host, cert);
//     if (err) {
//       return err;
//     }

//     // Pin the public key, similar to HPKP pin-sha256 pinning
//     const pubkey256 = 'pL1+qb9HTMRZJmuC/bB/ZI9d302BYrrqiVuRyW+DGrU=';
//     if (sha256(cert.pubkey) !== pubkey256) {
//       const msg = 'Certificate verification error: ' +
//         `The public key of '${cert.subject.CN}' ` +
//         'does not match our pinned fingerprint';
//       return new Error(msg);
//     }

//     // Pin the exact certificate, rather than the pub key
//     const cert256 = '25:FE:39:32:D9:63:8C:8A:FC:A1:9A:29:87:' +
//       'D8:3E:4C:1D:98:DB:71:E4:1A:48:03:98:EA:22:6A:BD:8B:93:16';
//     if (cert.fingerprint256 !== cert256) {
//       const msg = 'Certificate verification error: ' +
//         `The certificate of '${cert.subject.CN}' ` +
//         'does not match our pinned fingerprint';
//       return new Error(msg);
//     }

//     // This loop is informational only.
//     // Print the certificate and public key fingerprints of all certs in the
//     // chain. Its common to pin the public key of the issuer on the public
//     // internet, while pinning the public key of the service in sensitive
//     // environments.
//     do {
//       console.log('Subject Common Name:', cert.subject.CN);
//       console.log('  Certificate SHA256 fingerprint:', cert.fingerprint256);

//       hash = crypto.createHash('sha256');
//       console.log('  Public key ping-sha256:', sha256(cert.pubkey));

//       lastprint256 = cert.fingerprint256;
//       cert = cert.issuerCertificate;
//     } while (cert.fingerprint256 !== lastprint256);

//   },
// };

// options.agent = new https.Agent(options);
// const req = https.request(options, (res) => {
//   console.log('All OK. Server matched our pinned cert or public key');
//   console.log('statusCode:', res.statusCode);
//   // Print the HPKP values
//   console.log('headers:', res.headers['public-key-pins']);

//   res.on('data', (d) => {});
// });

// req.on('error', (e) => {
//   console.error(e.message);
// });
// req.end();

// const response = axios.post('http://localhost:8080/user/order/make/payment/id', data)


