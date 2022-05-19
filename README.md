# nodeuser_service

### Signup
POST http://127.0.0.1:8080/api/auth/signup
Content-Type: application/json

{
    "username":"soegidev",
    "email":"soegidev.id@gmail.com",
    "account_number":"138219381",
    "identity_number":"21382193891"
}
### GetTOken

POST http://127.0.0.1:8080/api/auth/signin
Content-Type: application/json

{
    "username":"soegidev"
}

### Get Profile
GET http://127.0.0.1:8080/api/profile HTTP/1.1
Content-Type: application/json
x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODY3ZTg4M2I5NjI5ZWVkYmViOGQ3YiIsImlhdCI6MTY1Mjk4MTQwOCwiZXhwIjoxNjUyOTg1MDA4fQ.kpUT8Vxnn-byMSYlDAcMWz-86VE5Q7eEXlWANEeSHgU


### AccountNumber
GET http://127.0.0.1:8080/api/accountNumber?code=138219381 HTTP/1.1
Content-Type: application/json
x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODY3ZTg4M2I5NjI5ZWVkYmViOGQ3YiIsImlhdCI6MTY1Mjk4MTQwOCwiZXhwIjoxNjUyOTg1MDA4fQ.kpUT8Vxnn-byMSYlDAcMWz-86VE5Q7eEXlWANEeSHgU


### Identity Number
GET http://127.0.0.1:8080/api/identityNumber?code=21382193891 HTTP/1.1
Content-Type: application/json
x-access-token:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyODY3ZTg4M2I5NjI5ZWVkYmViOGQ3YiIsImlhdCI6MTY1Mjk4MTQwOCwiZXhwIjoxNjUyOTg1MDA4fQ.kpUT8Vxnn-byMSYlDAcMWz-86VE5Q7eEXlWANEeSHgU