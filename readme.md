# Vamstar Project

## Local setup
* Create database and populate .env file
* Run npm install
```shell
npm i
```
* Run migrations and seed data
```
 npx knex migrate:latest
 npx knex seed:run
```
* To run project locally use
```
npm run start
```

## Running tests
* create test db and populate env
* Run migrations using 
```
npx knex migrate:latest --env test
```
* Run tests
```
npm run test
```

## Performance
Only count endpoint can become bottleneck. Tested it with 10 Lac patients data and response time is close of 100ms.
To test, run seed first it will add 10 Lac patients data. Then run endpoint and count time or use below query in psql.
```sql
explain analyse
select count(*)
from patients p
where round(p.weight_kg / ((p.height_cm * p.height_cm):: float / 10000)::numeric, 2) >= 25
  and round(p.weight_kg / ((p.height_cm * p.height_cm):: float / 10000)::numeric, 2) < 30;
```


## Deployment
* Added Github workflow to deploy this app, rename file `.github/workflows/deploy.yml.example` to `.github/workflows/deploy.yml`
* Add server's ssh key to Github's deploy keys
* Create new pair of SSH keys and add private to Github secret with name `SSH_KEY` and add public key to the server's authorized keys
* Add server's IP to Github secret's using name `SERVER_IP`
* Github will automatically deploy to the server on every commit to master.

### Nginx config
```
limit_req_zone $binary_remote_addr zone=ip:10m rate=5r/s;
server {
    server_name example.com;
    listen  80;
    gzip on;
    gzip_types      text/plain application/json;
    gzip_min_length 128;
    client_max_body_size 1M;
    
        location / {
            proxy_set_header   X-Forwarded-For $remote_addr;
            proxy_set_header   Host $http_host;
            proxy_pass         http://127.0.0.1:4000;
            limit_req zone=ip burst=12 delay=8;
        }
}
```
