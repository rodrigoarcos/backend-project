#!/bin/sh

for collection in accounts contacts opportunities; do
  docker exec -i crm_db_1 mongoimport /crm-data/$collection.json -u admin -p fullstack --type json -d crmsite -c $collection --headerline --drop --authenticationDatabase admin
done
