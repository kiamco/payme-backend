# payme-backend
P2P platform using the the Stellar Ledger

# Project Description

  - An API made with Node.js, Express, and MongoDb that should give the user the ability to transfer fiat currencies throught the use of the Stellar Ledger
  
# MVP

  - [x] account creation
  
  - [ ] user to user transactions
  
  - [ ] convert fiat currenices to crypto during transfer
  
  - [ ] reset password for accounts
  
  note: this should be made with stellars test network because we wont be able to get anchors to give us an API key without complete functional product. This app also needs to get audited before its approved for real money transactions. 
  
  
# Endpoints

  | endpoint | req | description |
  |----------|-----|-------------|
  | /register | post | creates an account |
  
### body

### response

```

```
  
  | endpoint | req | description |
  |----------|-----|-------------|
  | /login    | post | user login |
  
 ### body
 ```
 {
    "name": "kim kiamco1",
    "email": "sample4@gmail.com",
    "password": "putangina1"
}
```

 ### response

 ```
{
    "message": "user logged in",
    "data": {
        "email": "sample4@gmail.com",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbXBsZTRAZ21haWwuY29tIiwiX2lkIjoiNWZjODI3NDliOWExNDMyMWE0YmEwMTQ0IiwiaWF0IjoxNjA2OTU1MTQ1LCJleHAiOjE2MDY5NTg3NDV9.6WXPJBoLH2cKKKdo0esQiLUg9gmRptKMHMO_NoYCnLo",
        "name": "kim kiamco1",
        "stellarAccount": "GDNA66CQDFPBP4NIDMBTAG6FQTGKVHUGV5BTHWBSCQZUHV6WKUHHEU2Z",
        "accountInfo": [
            {
                "balance": "10000.0000000",
                "buying_liabilities": "0.0000000",
                "selling_liabilities": "0.0000000",
                "asset_type": "native"
            }
        ]
    }
}
 ```
  

# Tech stack
  
  - Node.js, Express, MongoDB, TypeScript, Docker, Stellar Netork
