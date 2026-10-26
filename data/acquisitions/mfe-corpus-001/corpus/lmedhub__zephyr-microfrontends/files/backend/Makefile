# Makefile

.PHONY: run build test lint

run:
	go run cmd/server/main.go

build:
	go build -o backend cmd/server/main.go

test:
	go test ./...

install-lint:
	@which golangci-lint > /dev/null || (echo "Installing golangci-lint..." && go install github.com/golangci/golangci-lint/cmd/golangci-lint@latest)

lint: install-lint
	golangci-lint run

migrate:
	migrate -path migrations -database "sqlite3://url_shortener.db" up

docker-build:
	docker build -t backend .

docker-run:
	docker run -p 8080:8080 backend

docker-compose-up:
	docker-compose up -d

docker-compose-down:
	docker-compose down