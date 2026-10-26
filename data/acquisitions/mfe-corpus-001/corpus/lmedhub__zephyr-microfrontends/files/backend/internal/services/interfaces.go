package services

import "backend/internal/models"

type URLServiceInterface interface {
	ShortenURL(longURL string) (string, error)
	GetLongURL(slug string) (string, error)
	TrackClick(click models.Click) error
}
