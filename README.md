# payme-backend
P2P platform using the the Stellar Ledger

Disclaimer: I used this project an an oppurtunity to learn Typescript. Im not sure if Im using it right though...

# Project Description

  - An API made with Node.js, Express, and MongoDb that should give the user the ability to transfer fiat currencies throught the use of the Stellar Ledger
  
# MVP

  - [x] account creation
  
  - [x] user to user transactions (also use test server)
  
  - [ ] convert fiat currenices to crypto during transfer (use stellars test anhor server)
  
  - [ ] reset password for user accounts
  
  note: this should be made with stellars test network because we wont be able to get anchors to give us an API key without complete functional product. This app also needs to get audited before its approved for real money transactions. 
  
# Stretch

  - [ ] it will be cool if we can convert XLM to different types of currencies ie: dollar, peso, or something.
  
# Endpoints

1.) registration

  | endpoint | req | description |
  |----------|-----|-------------|
  | /register | post | creates an account |
  
### body

```
{
    "name": "kim kiamco1",
    "email": "sample5@gmail.com",
    "password": "putangina1"
}

```

### response

```
{
    "message": "User created",
    "data": {
        "_id": "5fcabb3b7947c78d4f87dbd1",
        "name": "kim kiamco1",
        "email": "sample5@gmail.com",
        "password": "$2a$10$TfmoyG2VfxOSyw2SdD6HvuHl2ebWnvkO21x2W13JEr.LQy0ctEv42",
        "stellarAccount": "GDZ25M2SASKIKXAINZD3STOKW7Z7SQK6CIE37QCT4QCT3WDU7CANN2UZ",
        "stellarSeed": "U2FsdGVkX196+q+3W7pKYUgXSozjXuNu1k9KkMuqsYK2PN1fZfImHB5b3Xion07A+yMFuY5wypLtv8QwvBSd2a0PKL1N3CL77RS0nInUw4Q=",
        "createdAt": "2020-12-04T22:42:03.335Z",
        "updatedAt": "2020-12-04T22:42:03.335Z",
        "__v": 0
    }
}
```

----------------------------------------------------------------------------------------------------------------------------------------------------
  
2.) login

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
 
 ----------------------------------------------------------------------------------------------------------------------------------------------------
  
  
3.) transact

  | endpoint | req | description |
  |----------|-----|-------------|
  | /transact | post | make transactions to different users |
  
 ### body
 ```
{
    "originId": "GCVYQZFD3CBYXWLBIT7GEL6GGLAAZU4WYDNQBK36MMF5RGLTWFL6MSHM",
    "destinationId": "GBKOF2Z2HZVEPAMAQ6S6MP7QIMVGYBTFCF32CQBBAM75OCUYU7PEB4HG",
    "amount": "200.50"
}

```

 ### response

 ```
{
    "message": "succesful transaction"
}
 ```
 
 ----------------------------------------------------------------------------------------------------------------------------------------------------


4.)  decrypt

  | endpoint | req | description |
  |----------|-----|-------------|
  | /decrypt | post | decrypts users secret key |
  
 ### body
 ```
{
    "email": "sample6@gmail.com",
    "password": "putangina1"
}


```

 ### response

 ```
{
    "message": "decrypted secret",
    "stellarSecret": "SAFF6JXRGVEWXJ3SQ2KYMBD5WL5CHMJSARMJA537Y5CD6BSZ7HCHGS2O"
}
 ```


# Tech stack
  
  - Node.js, Express, MongoDB, TypeScript, Docker, Stellar Netork
