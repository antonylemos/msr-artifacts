package config

import (
    "os"
)

type Config struct {
    DatabaseURL string
    RedisURL    string
    Port        string
}

func LoadConfig() (*Config, error) {
    return &Config{
        DatabaseURL: getEnv("DATABASE_URL", "sqlite:///url_shortener.db"),
        RedisURL:    getEnv("REDIS_URL", "redis://localhost:6379"),
        Port:        getEnv("PORT", "8080"),
    }, nil
}

func getEnv(key, defaultValue string) string {
    if value, exists := os.LookupEnv(key); exists {
        return value
    }
    return defaultValue
}