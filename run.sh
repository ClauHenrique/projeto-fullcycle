#!/bin/sh  

env_file="./front-end/.env"
node_modules="./node_modules"

# criar variaveis de ambiente
if [ ! -f "$env_file" ]; then
    echo "ORDERS_API_URL=http://localhost:8080" > ./front-end/.env
    echo "CATALOG_API_URL=http://localhost:3333" >> ./front-end/.env
    echo "NEXT_API_URL=http://localhost:3000/api" >> ./front-end/.env

fi

# levantar containers
docker-compose up -d

echo "aguarde..."

sleep 8

# configurar rabbitmq no navegador
xdg-open "http://localhost:15672/" &


while true; do
    read -p "Pressione 'y' e Enter para continuar: " yn
    case $yn in
        [Yy]* ) break;;
        * ) echo "pressione 'y' para continuar.";;
    esac
done


# iniciar microsservico de pedidos
cd ./microsservico-pedidos

if [ ! -d "$node_modules" ]; then
    npm install
fi

npm run start &


# iniciar front end
cd ../front-end
npx serve -l 9000 images/ &

if [ ! -d "$node_modules" ]; then
    npm install
fi

npm run dev &

# iniciar microsservico de catalogo de produtos
cd ../go-api/cmd/catalog
go run main.go &

# iniciar microsservico de pagamento
cd ../../../microsservico-pagamentos/cmd/payment
go run main.go



