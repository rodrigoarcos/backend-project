#!/bin/sh

for collection in accounts contacts opportunities; do
  docker exec -i crm-db_mongo_1 mongoimport /crm-data/$collection.json -u admin -p fullstack --type json -d crmsite -c $collection --jsonArray --drop --authenticationDatabase admin
done
