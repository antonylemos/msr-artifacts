# URL Shortener Service

This project is a simple URL shortener service built with Go. It provides a RESTful API for shortening long URLs.

## Getting Started

### Prerequisites

- Go 1.16 or later
- Make
- Docker (optional, for containerization)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. Install dependencies:

   ```bash
   go mod tidy
   ```

### Running the Application

To run the application, use the following command:

```bash
make run
```

### API Endpoints

- **POST /shorten**: Accepts a long URL and returns a shortened version.
- **GET /:slug**: Redirects to the long URL associated with the provided slug and tracks the click.

### Linting

To run the linter, use the following command:

```bash
make lint
```

### Testing

To run the tests, use the following command:

```bash
make test
```

### Docker

To build and run the application using Docker, use the following command:

```bash
docker-compose up --build
```

## License

This project is licensed under the MIT License.
