# Boilerplate for Django, Vue and GAE deployment

## Prerequirements:
* Start a new project on GCP.
* Setup bill account
* Setup App Engine
* Setup Cloud SQL
* Setup Secret Manager
  * Add *Secret Manager Secret Accessor* role to servive account

## Configure local .env

```
# .env

DATABASE_URL=postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@//cloudsql/${CLOUD_PROJECT_ID}:${REGION}:${CLOUD_SQL_INSTANCE_NAME}/dev
SECRET_KEY=
DEBUG=TRUE

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=fisheepx@gmail.com
EMAIL_HOST_PASSWORD=
ADMIN_EMAIL=fisheepx@gmail.com
```


## Create secrets for prod and staging

```
# django_settings, django_settings_staging

DATABASE_URL=postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@//cloudsql/${CLOUD_PROJECT_ID}:${REGION}:${CLOUD_SQL_INSTANCE_NAME}/${DATABASE_NAME}
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
DATABASE_HOST=/cloudsql/${CLOUD_PROJECT_ID}:${REGION}:${CLOUD_SQL_INSTANCE_NAME}
DATABASE_PORT=5432
GS_BUCKET_NAME=${CLOUD_PROJECT_ID}.appspot.com
SECRET_KEY=

EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=
EMAIL_PORT=
EMAIL_USE_TLS=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
ADMIN_EMAIL=
```


## Configure app.yaml

```
runtime: python39

handlers:
  - url: /static
    static_dir: staticfiles/
  - url: /.*
    secure: always
    script: auto

env_variables:
  APPENGINE_URL: 'https://${CLOUD_PROJECT_ID}.${REGION}.r.appspot.com/'
  GOOGLE_CLOUD_PROJECT: ${CLOUD_PROJECT_NUMBER}
  SETTINGS_NAME: 'django_settings'
  BUCKET_NAME: '${CLOUD_PROJECT_ID}.appspot.com'
service_account: ${CLOUD_PROJECT_ID}@appspot.gserviceaccount.com
service: default
```



## Configure app-staging.yaml

```
runtime: python39

handlers:
  - url: /static
    static_dir: staticfiles/
  - url: /.*
    secure: always
    script: auto

env_variables:
  APPENGINE_URL: 'https://staging.${CLOUD_PROJECT_ID}.${REGION}.r.appspot.com/'
  GOOGLE_CLOUD_PROJECT: ${CLOUD_PROJECT_NUMBER}
  SETTINGS_NAME: 'django_settings_staging'
  BUCKET_NAME: 'staging.${CLOUD_PROJECT_ID}.appspot.com'
service_account: ${CLOUD_PROJECT_ID}@appspot.gserviceaccount.com
service: staging
```


## Runserver on local machine

```
# terminal

./cloud_sql_proxy -instances="${CLOUD_PROJECT_ID}:${REGION}:${INSTANCE_NAME}"=tcp:5432

# if return 'listen tcp 127.0.0.1:5432: bind: address already in use'
  lsof -i :5432
  kill ${PID}
# run ./cloud_sql_proxy command again

export GOOGLE_CLOUD_PROJECT=${CLOUD_PROJECT_ID}
export USE_CLOUD_SQL_AUTH_PROXY=true
python manage.py runserver

# check http://127.0.0.1:8000/
```

## Migrate database on Cloud SQL

```
# .env

DATABASE_URL=postgres://${DATABASE_USER}:${DATABASE_PASSWORD}@//cloudsql/${CLOUD_PROJECT_ID}:${REGION}:${CLOUD_SQL_INSTANCE_NAME}/${TARGET_DB}
```


## Deploy to GAE

```
pipenv lock -r > requirements.txt
python manage.py collectstatic

# set gcloud project
gcloud config set project ${CLOUD_PROJECT_ID}

# deploy defaul service first
gcloud app deploy

# than you can deploy multiple services
gcloud app deploy app.yaml app-staging.yaml
```