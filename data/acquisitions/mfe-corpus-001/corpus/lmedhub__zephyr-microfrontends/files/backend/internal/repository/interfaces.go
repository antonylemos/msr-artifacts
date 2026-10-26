package repository

import "backend/internal/models"

type URLRepository interface {
	CreateURL(url *models.URL) error
	FindBySlug(slug string) (*models.URL, error)
	Update(url *models.URL) error
	Delete(id uint) error
}
