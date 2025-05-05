# HTTP API User Service

#### Architecture: DDD Base
#### Stack: Nestjs (Platform express base), Postgres, Jest, Winston logger, Typeorm
#### 3. Code Style: snake

____

## Set up
### Local Machine
1. ```yarn```
<br> Yarn was used as quicker npm solution. For specific needs, pnmp is more reliable for big monorepo services with symlinks. 
Package manager depends on taste and preferences.
2. ```yarn start:dev```
<br> Start:dev command runs migration revert to clean DB and create users table. After setting up tables 
we need seed to test the project. It will create new user with **email: admin**, **password: password**.
3. ```Open localhost:3000/doc``` to test the endpoints in swagger

### Docker
1. ```docker-compose up user-service``` 
<br> Will pull postgres and npm images from docker hub. After pulling, 
compose file uses ./ as context folder and build project image from Dockerfile.dev and
run cmd ```yarn start:dev```
2. ```Open localhost:3000/doc``` to test the endpoints in swagger

___   
## Env Variables
Create .env file from .env.docker in case local set up

### Test
...UPCOMING...

