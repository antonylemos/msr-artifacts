package repository

import (
	"backend/internal/models"

	"gorm.io/gorm"
)

type URLRepositoryImpl struct {
	db *gorm.DB
}

func NewURLRepository(db *gorm.DB) URLRepository {
	return &URLRepositoryImpl{db: db}
}

func (r *URLRepositoryImpl) CreateURL(url *models.URL) error {
	return r.db.Create(url).Error
}

func (r *URLRepositoryImpl) FindBySlug(slug string) (*models.URL, error) {
	var url models.URL
	err := r.db.Where("slug = ?", slug).First(&url).Error
	return &url, err
}

func (r *URLRepositoryImpl) Update(url *models.URL) error {
	return r.db.Save(url).Error
}

func (r *URLRepositoryImpl) Delete(id uint) error {
	return r.db.Delete(&models.URL{}, id).Error
}
