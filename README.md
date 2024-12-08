```
# Create private key 
openssl ecparam -name secp256k1 -genkey -noout -out private-key.pem
# Create public key
openssl ec -in private-key.pem -pubout -out public-key.pem
# Generate signature
openssl dgst -sha256 -sign private-key.pem -out signature.bin message.txt
# Verify signature
openssl dgst -sha256 -verify public-key.pem -signature signature.bin message.txt
```