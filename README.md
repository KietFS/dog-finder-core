# Dog Finder API 🐕

A production-ready NestJS RESTful API with enterprise-grade architecture, comprehensive testing, and full documentation.

## Features

- **Clean Architecture** - Modular design with clear separation of concerns
- **TypeORM + PostgreSQL** - Robust database layer with migrations
- **Redis Caching** - Performance optimization for heavy endpoints
- **Swagger Documentation** - Interactive API documentation
- **Comprehensive Testing** - Unit tests + E2E tests
- **Validation & Error Handling** - Global pipes and exception filters
- **Pagination** - Efficient data retrieval with limit/offset
- **Advanced Filtering** - Search and filter across all resources

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Architecture](#architecture)

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v15 or higher)
- **Redis** (v7 or higher)

##  Installation

1. **Clone the repository** (or navigate to the project directory):

```bash
cd dog-finder-core
```

2. **Install dependencies**:

```bash
npm install
```

## Configuration

1. **Create environment file**:

```bash
cp .env.example .env
```

2. **Update `.env` with your configuration**:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=dog_finder_db
DB_SYNCHRONIZE=false
DB_LOGGING=true

# Redis Cache
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_TTL=3600

# Swagger
SWAGGER_ENABLED=true
SWAGGER_TITLE=Dog Finder API
SWAGGER_DESCRIPTION=Production-ready RESTful API for dog finder
SWAGGER_VERSION=1.0
SWAGGER_PATH=api
```

## 🗄️ Database Setup

1. **Create PostgreSQL database**:

```bash
createdb dog_finder_db
```

Or using psql:

```sql
CREATE DATABASE dog_finder_db;
```

2. **Run migrations**:

```bash
npm run build
npm run migration:run
```

3. **Seed the database** (optional, for development):

```bash
npm run seed
```

This will populate your database with sample breeds, categories, images, and dogs.

## Running the Application

### Development Mode

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

### Production Mode

```bash
npm run build
npm run start:prod
```

### Debug Mode

```bash
npm run start:debug
```

## API Documentation

Once the application is running, access the interactive Swagger documentation at:

```
http://localhost:3000/api
```

The Swagger UI provides:
- Complete API reference
- Request/response schemas
- Try-it-out functionality
- Authentication details

## Testing

### Run All Tests

```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run E2E Tests

```bash
npm run test:e2e
```

### Generate Coverage Report

```bash
npm run test:cov
```

Coverage reports will be generated in the `coverage/` directory.

## 📁 Project Structure

```
dog-finder-core/
├── src/
│   ├── main.ts                          # Application entry point
│   ├── app.module.ts                    # Root module
│   ├── config/                          # Configuration files
│   │   ├── database.config.ts
│   │   ├── redis.config.ts
│   │   └── swagger.config.ts
│   ├── common/                          # Shared utilities
│   │   ├── dto/                         # Common DTOs
│   │   ├── filters/                     # Exception filters
│   │   ├── interceptors/                # Interceptors
│   │   └── utils/                       # Utility functions
│   ├── database/                        # Database layer
│   │   ├── migrations/                  # TypeORM migrations
│   │   └── seeds/                       # Seed data
│   ├── modules/                         # Feature modules
│   │   ├── breeds/
│   │   ├── categories/
│   │   ├── images/
│   │   └── dogs/
│   └── cache/                           # Caching module
└── test/                                # E2E tests
```

## API Endpoints

### Breeds

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/breeds` | Get all breeds (paginated) |
| GET | `/api/v1/breeds/:id` | Get breed by ID |

**Query Parameters for GET /breeds:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `name` - Filter by name (partial match)
- `breed_group` - Filter by breed group
- `temperament` - Filter by temperament
- `origin` - Filter by origin

**Example:**
```bash
curl http://localhost:3000/api/v1/breeds?name=retriever&page=1&limit=10
```

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/categories` | Get all categories (paginated) |
| GET | `/api/v1/categories/:id` | Get category by ID |

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `name` - Filter by name

### Images

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/images` | Get all images (paginated) |
| GET | `/api/v1/images/:id` | Get image by ID |

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `breed_id` - Filter by breed ID
- `category_id` - Filter by category ID

**Example:**
```bash
curl http://localhost:3000/api/v1/images?breed_id=1&category_id=2
```

### Dogs

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/dogs` | Get all dogs (paginated) |
| GET | `/api/v1/dogs/:id` | Get dog by ID |

**Query Parameters:**
- `page` - Page number
- `limit` - Items per page
- `breed_id` - Filter by breed ID
- `size` - Filter by size (small, medium, large)
- `temperament` - Filter by temperament
- `min_age` - Minimum age
- `max_age` - Maximum age

**Example:**
```bash
curl http://localhost:3000/api/v1/dogs?size=large&min_age=2&max_age=5
```

## Architecture

### Design Patterns

- **Repository Pattern** - Data access abstraction
- **Dependency Injection** - Loose coupling and testability
- **DTO Pattern** - Data validation and transformation
- **Interceptor Pattern** - Cross-cutting concerns

### Key Components

1. **Controllers** - Handle HTTP requests and responses
2. **Services** - Business logic layer
3. **Repositories** - Data access layer
4. **Entities** - Database models
5. **DTOs** - Data transfer objects with validation
6. **Filters** - Global exception handling
7. **Interceptors** - Response transformation

### Database Schema

```
breeds (1) ----< (N) images (N) >---- (1) categories
  |                                           
  |                                           
  v                                           
dogs (N) ----< (1) images
```

## Error Handling

The API uses consistent error responses:

```json
{
  "statusCode": 404,
  "timestamp": "2024-01-21T12:00:00.000Z",
  "path": "/api/v1/breeds/999",
  "method": "GET",
  "message": "Breed with ID 999 not found"
}
```

## Performance

- **Redis Caching** - All GET endpoints are cached for 1 hour
- **Database Indexing** - Optimized queries with strategic indexes
- **Pagination** - Efficient data retrieval
- **Connection Pooling** - PostgreSQL connection management

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run start` | Start application |
| `npm run start:dev` | Start in development mode with watch |
| `npm run start:prod` | Start in production mode |
| `npm run build` | Build the application |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |
| `npm run test:cov` | Generate coverage report |
| `npm run lint` | Lint code |
| `npm run format` | Format code with Prettier |
| `npm run migration:run` | Run database migrations |
| `npm run migration:revert` | Revert last migration |
| `npm run seed` | Seed database with sample data |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments


- Built with [NestJS](https://nestjs.com)
- Database powered by [PostgreSQL](https://www.postgresql.org)
- Caching with [Redis](https://redis.io)

---

**Happy Coding! 🐕**
