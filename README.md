# Learn Simple API NodeJS + RajaOngkir

- Run `npm i --save`
- Copy `.env.example` to `.env` & Setting your environment
```
RO_URL_DEFAULT=
RO_API_KEY=

DB_HOST=127.0.0.1
DB_NAME=nodejs_rajaongkir
DB_USER=
DB_PASS=
```
- Runing App
```
npm run dev

// or

npm run start
```
- Testing URL API
```
POST => http://127.0.0.1:4000/api/cost
```
- Add body raw json
```
{
    "origin": 105,
    "destination": [113, 114],
    "weight": 1500,
    "courier": "jne"
}
```
- Example response
```
{
    "status": 200,
    "message": "Success",
    "data": [
        {
            "code": "jne",
            "name": "Jalur Nugraha Ekakurir (JNE)",
            "costs": [
                {
                    "service": "OKE",
                    "description": "Ongkos Kirim Ekonomis",
                    "cost": [
                        {
                            "value": 26000,
                            "etd": "3-6",
                            "note": ""
                        }
                    ]
                },
                {
                    "service": "REG",
                    "description": "Layanan Reguler",
                    "cost": [
                        {
                            "value": 30000,
                            "etd": "2-3",
                            "note": ""
                        }
                    ]
                }
            ]
        }
    ]
}
```
