echo "-> build docker image"
sleep 1
echo "----------------------------------------------------------------------------------------------------------"
echo "testing before build image"
sleep 1
echo "run backend test"
cd server
yarn install
yarn run test
cd ..
sleep 1
cd client 
yarn install
yarn run test
cd ..
echo "build docker images"
sleep 1
docker-compose up -d 