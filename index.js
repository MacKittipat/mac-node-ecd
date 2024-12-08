const fs = require('fs');
const crypto = require('crypto');

// Load the private key from file
const privateKeyPath = 'private-key.pem';
const privateKey = fs.readFileSync(privateKeyPath, 'utf8');

// Message to be signed
const message = 'Hello, this is a message to sign!';

let signature;
try {
  signature = signMessage(message, privateKey);
  console.log('Message:', message);
  console.log('Signature (hex):', signature);
} catch (err) {
  console.error('Error signing the message:', err);
}


// Load the public key from file
const publicKeyPath = 'public-key.pem';
const publicKey = fs.readFileSync(publicKeyPath, 'utf8');

try {
  const isValid = verifySignature(message, signature, publicKey);
  if (isValid) {
    console.log('Signature is valid.');
  } else {
    console.log('Signature is invalid.');
  }
} catch (err) {
  console.error('Error verifying the signature:', err);
}


// Create a signature using ECDSA with SHA256
function signMessage(message, privateKey) {
  const sign = crypto.createSign('SHA256');
  sign.update(message);
  sign.end();
  const signature = sign.sign(privateKey, 'hex');
  return signature;
}

// Verify the signature using ECDSA with SHA256
function verifySignature(message, signature, publicKey) {
  const verify = crypto.createVerify('SHA256');
  verify.update(message);
  verify.end();
  return verify.verify(publicKey, signature, 'hex');
}
