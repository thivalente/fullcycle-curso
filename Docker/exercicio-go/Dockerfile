FROM golang:alpine3.20  AS builder

WORKDIR /app

COPY ./app .

RUN go build -o fullcycle main.go

FROM scratch

COPY --from=builder /app/fullcycle /usr/local/bin/fullcycle

CMD ["fullcycle"]