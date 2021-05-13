# Auth0 RS256 Validation Using JWKS

## Purpose

This sample is intended as an introduction to the Auth0 JWKS endpoint.  The purpose is to demonstrate how one would verify an RS256 signed JWT while using the JWKS endpoint to lookup the public certificate necessary verify the token signature.  This sample should be used as a basic guide for building your own token verifier, however the sample is not considered production ready.  This sample lacks necessary error handling, caching, and other production qualities.

## Setting Up

Simply clone the repository locally:

```
git clone git@github.com:auth0-samples/auth0-node-jwks-rs256.git
```

Then install all the modules:

```
npm install
```

Then run the code on port 3000:

```
npm start
```

## See a bug or something missing?  PRs welcome!

If you see a bug or see that something is missing feel free to post an issue or submit a PR!