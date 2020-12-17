echo "-> build docker image"
sleep 1
echo "----------------------------------------------------------------------------------------------------------"
echo "testing before build image"
sleep 1
echo "run backend test"
cd myquiz
yarn run test
cd ..
sleep 1
cd nextjs 
yarn run test
cd ..
echo "build docker images"
sleep 1
docker compose up -d -p myquiz