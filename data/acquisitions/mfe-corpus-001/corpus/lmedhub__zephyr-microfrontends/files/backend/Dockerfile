FROM golang:1.18 AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o url-shortener ./cmd/server/main.go

FROM alpine:latest

WORKDIR /root/

COPY --from=builder /app/backend .

CMD ["./backend"]