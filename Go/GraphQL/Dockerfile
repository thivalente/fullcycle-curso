FROM golang:alpine3.20  AS dev

# Instalar sqlite3
RUN apk add --no-cache sqlite

WORKDIR /go/app

# go run github.com/99designs/gqlgen init;
# go run github.com/99designs/gqlgen generate;