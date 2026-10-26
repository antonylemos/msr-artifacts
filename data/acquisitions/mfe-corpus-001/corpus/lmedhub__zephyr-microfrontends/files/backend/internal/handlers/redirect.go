package handlers

import (
	"backend/internal/services"
	"net/http"

	"github.com/gin-gonic/gin"
)

type RedirectHandler struct {
	URLService services.URLServiceInterface
}

func NewRedirectHandler(urlService services.URLServiceInterface) *RedirectHandler {
	return &RedirectHandler{URLService: urlService}
}

func (h *RedirectHandler) Redirect(c *gin.Context) {
	slug := c.Param("slug")
	longURL, err := h.URLService.GetLongURL(slug)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "URL not found"})
		return
	}

	c.Redirect(http.StatusTemporaryRedirect, longURL)
}
