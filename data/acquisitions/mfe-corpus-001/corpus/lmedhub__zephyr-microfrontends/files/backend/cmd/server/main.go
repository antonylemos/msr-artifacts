package main

import (
	"backend/internal/handlers"
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/services"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func main() {
	// Initialize database
	db, err := gorm.Open(sqlite.Open("url_shortener.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}

	// Auto migrate models
	db.AutoMigrate(&models.URL{}, &models.Click{})

	// Initialize repositories
	urlRepo := repository.NewURLRepository(db)

	// Initialize services
	urlService := services.NewURLService(urlRepo)

	// Initialize router
	router := gin.Default()

	// Set up CORS middleware
	config := cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization"},
		AllowCredentials: true,
	}
	router.Use(cors.New(config))

	setupRoutes(router, urlService)

	router.Run(":8080")
}

func setupRoutes(router *gin.Engine, urlService services.URLServiceInterface) {
	router.POST("/shorten", func(c *gin.Context) {
		handlers.ShortenWithService(c, urlService)
	})

	redirectHandler := handlers.NewRedirectHandler(urlService)
	router.GET("/:slug", redirectHandler.Redirect)
	// router.GET("/stats/:slug", func(c *gin.Context) {
	// 	handlers.GetStatsWithService(c, statsService)
	// })
}
