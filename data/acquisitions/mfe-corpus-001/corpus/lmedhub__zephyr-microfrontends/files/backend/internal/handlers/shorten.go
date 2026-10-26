package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

// ShortenRequest represents the request body for the shorten URL endpoint.
type ShortenRequest struct {
	LongURL string `json:"long_url" binding:"required,url"`
}

// ShortenResponse represents the response body for the shorten URL endpoint.
type ShortenResponse struct {
	ShortURL string `json:"short_url"`
}

func ShortenWithService(c *gin.Context, urlService services.URLServiceInterface) {
	var req ShortenRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	shortURL, err := urlService.ShortenURL(req.LongURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not shorten URL"})
		return
	}

	c.JSON(http.StatusOK, ShortenResponse{ShortURL: shortURL})
}
