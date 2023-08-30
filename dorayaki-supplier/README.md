# Dorayaki Supplier

Merupakan connector dari aplikasi webservice pabrik dorayaki yang dibangun dengan bahasa pemrograman Java dan bantuan library Jax-WS untuk implementasi webservice dalam SOAP.

## Installation
1. Make sure you have [intelliJ](https://www.jetbrains.com/idea/download/#section=windows) installed for the easier process.
2. Clone this repository to your computer.
3. Open the repository from yout intelliJ.
4. Type this command:
```bash
mvn clean install
```
5. Open DorayakiSupplierPublisher and run the program from it. 

## Database Schema
Using "pabrikdorayaki" schema but just use one table:
```
log_request(id_log_request: PK, ip_address, endpoint, timestamp)
```

## Endpoint and Payload
1. addStock
```
Endpoint: "http://localhost:8080/dorayakisupplier"
Payload Request:
  idRecipe: int
  amount: int
Paylod Response: 
  code: int
  message: string
  data: 
    idRequest: int
    idRecipe: int
    amount: int
    status: string
```

2. getAllRecipe
```
Endpoint: "http://localhost:8080/dorayakisupplier"
Payload Request:
  -
Paylod Response: 
  code: int
  message: string
  data: 
    List<Recipe>:
      idRecipe: int
      recipeName: string
```

3. getStatusRequest
```
Endpoint: "http://localhost:8080/dorayakisupplier"
Payload Request:
  parameters: int
Paylod Response: 
  code: int
  message: string
  data: 
    idRequest: int
    idRecipe: int
    amount: int
    status: string
```

## Contributing
1. Setup WSDL: 13519007 - Muhammad Tito Prakasa
2. Rate-Limiter: 13519007 - Muhammad Tito Prakasa
3. Service addStock: 13519007 - Muhammad Tito Prakasa
4. Service getAllRecipe: 13519035 - Fakhri Nail Wibowo
5. Service getStatusRequest: 13519046 - Dwianditya Hanif R

## License
[MIT](https://choosealicense.com/licenses/mit/)
