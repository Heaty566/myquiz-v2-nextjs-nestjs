echo "-> build docker image"
sleep 1
echo "----------------------------------------------------------------------------------------------------------"
echo "build docker image Nestjs  -> heaty566/myquiz-v2-server"
sleep 1
cd myquiz
yarn run test
cd ..
cd nextjs 
yarn run test
cd ..
docker compose up -d