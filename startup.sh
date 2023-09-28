
ENV_DEVELOPMENT=.env.development
ENV_PRODUCTION=.env.production
ACCESS_TOKEN_SECRET=$(openssl rand -hex 64)
REFRESH_TOKEN_SECRET=$(openssl rand -hex 64)

if [ ! -f "$ENV_DEVELOPMENT" ]
then
    touch .env.development
    echo "ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET\nREFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET" >> .env.development
    echo ".env.development created!"
else
    echo "$ENV_DEVELOPMENT already exists"
fi

if [ ! -f "$ENV_PRODUCTION" ]
then
    touch .env.production
    echo "ACCESS_TOKEN_SECRET=$ACCESS_TOKEN_SECRET\nREFRESH_TOKEN_SECRET=$REFRESH_TOKEN_SECRET" >> .env.production
    echo ".env.production created!"
else
    echo "$ENV_PRODUCTION already exists"
fi

npm i