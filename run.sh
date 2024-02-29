#!/bin/sh  

env_file="./front-end/.env"

if [ ! -f "$ENV_FILE" ]; then

    echo "ORDERS_API_URL=http://localhost:8080" > ./front-end/.env
    echo "CATALOG_API_URL=http://localhost:3333" >> ./front-end/.env
    echo "NEXT_API_URL=http://localhost:3000/api" >> ./front-end/.env

fi

docker-compose up -d

cd ./microsservico-pedidos
npm install
npm run start &

cd ../front-end
npx serve -l 9000 images/ &
npm install
npm run dev &

cd ../go-api/cmd/catalog
go run main.go &

cd ../../../microsservico-pagamentos/cmd/payment
go run main.go



