import express from 'express';
import jwt from './middleware/express-jwt.js';
import jwtAuthz from "./middleware/express-jwt-authz.js";

const checkJwt = jwt({
  algorithms: ["RS256"],
  audience: "http://localhost:3000/api/",
  issuer: "https://anlexn.auth0.com/",
  jwksUri: `https://anlexn.auth0.com/.well-known/jwks.json`,
  subject: "UQysWVHuYXZ7TlhF1lfcBrIZdWdMXLpR@clients",
  typ: "JWT",
});

const checkScope = jwtAuthz('read:users');

let app = express();

app.use(express.json());
app.get('/api/public', (req, res) => {
	res.json({
		message: 'Hello from a public endpoint!'
	});
});

app.get('/api/private', checkJwt, (req, res) => {
	res.json({
		message: 'Hello from a private endpoint!'
	});
});

app.get('/api/private-scoped', checkJwt, checkScope, (req, res) => {
	res.json({
		message: 'Hello from a private-scoped endpoint!'
	});
})
app.listen(3000, function () {
	console.log(`Started on port 3000`);
});