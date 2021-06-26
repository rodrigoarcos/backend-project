#!/bin/sh
docker exec -it crm-db_mongo_1 \
  mongo -u admin -p fullstack --authenticationDatabase admin crmsite