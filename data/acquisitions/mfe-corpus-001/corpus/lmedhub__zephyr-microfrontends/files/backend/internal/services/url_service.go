package services

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/pkg/utils"
	"errors"
)

type URLService struct {
	repo repository.URLRepository
}

func NewURLService(repo repository.URLRepository) URLServiceInterface {
	return &URLService{repo: repo}
}

func (s *URLService) ShortenURL(longURL string) (string, error) {
	if longURL == "" {
		return "", errors.New("long URL cannot be empty")
	}

	slug := utils.GenerateSlug(8)
	url := models.URL{
		LongURL:  longURL,
		ShortURL: slug,
		Slug:     slug,
	}

	err := s.repo.CreateURL(&url)
	if err != nil {
		return "", err
	}

	return "http://localhost:8080/" + slug, nil
}

func (s *URLService) GetLongURL(slug string) (string, error) {
	url, err := s.repo.FindBySlug(slug)
	if err != nil {
		return "", err
	}
	return url.LongURL, nil
}

func (s *URLService) TrackClick(click models.Click) error {
	return nil
}
