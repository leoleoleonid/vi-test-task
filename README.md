run dev
```bash
docker-compose --env-file=./packages/backend/.env  up --build
```

run prod (only to test locally and build prod images)
```bash
docker-compose -f ./docker-compose.prod.yml --env-file=./packages/backend/.env  up -V --build
```

go to localhost:3000/api