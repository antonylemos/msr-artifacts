package tests

import (
	"backend/internal/models"
	"backend/internal/repository"
	"backend/internal/services"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// Mock URL Repository
type MockURLRepository struct {
	mock.Mock
}

func (m *MockURLRepository) CreateURL(url *models.URL) error {
	args := m.Called(url)
	return args.Error(0)
}

func (m *MockURLRepository) FindBySlug(slug string) (*models.URL, error) {
	args := m.Called(slug)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*models.URL), args.Error(1)
}

func (m *MockURLRepository) Update(url *models.URL) error {
	args := m.Called(url)
	return args.Error(0)
}

func (m *MockURLRepository) Delete(id uint) error {
	args := m.Called(id)
	return args.Error(0)
}

// Ensure MockURLRepository implements the interface
var _ repository.URLRepository = (*MockURLRepository)(nil)

func TestShortenURL(t *testing.T) {
	mockRepo := new(MockURLRepository)
	service := services.NewURLService(mockRepo)

	longURL := "https://example.com"

	// Mock CreateURL to accept any URL and return nil
	mockRepo.On("CreateURL", mock.AnythingOfType("*models.URL")).Return(nil)

	shortURL, err := service.ShortenURL(longURL)

	assert.NoError(t, err)
	assert.Contains(t, shortURL, "http://localhost:8080/")
	mockRepo.AssertExpectations(t)
}

func TestShortenURLEmpty(t *testing.T) {
	mockRepo := new(MockURLRepository)
	service := services.NewURLService(mockRepo)

	shortURL, err := service.ShortenURL("")

	assert.Error(t, err)
	assert.Equal(t, "", shortURL)
	assert.Contains(t, err.Error(), "long URL cannot be empty")
}

func TestGetLongURL(t *testing.T) {
	mockRepo := new(MockURLRepository)
	service := services.NewURLService(mockRepo)

	slug := "abc123"
	expectedURL := &models.URL{
		LongURL: "https://example.com",
		Slug:    slug,
	}

	mockRepo.On("FindBySlug", slug).Return(expectedURL, nil)

	longURL, err := service.GetLongURL(slug)

	assert.NoError(t, err)
	assert.Equal(t, "https://example.com", longURL)
	mockRepo.AssertExpectations(t)
}

func TestGetLongURLNotFound(t *testing.T) {
	mockRepo := new(MockURLRepository)
	service := services.NewURLService(mockRepo)

	slug := "notfound"

	mockRepo.On("FindBySlug", slug).Return(nil, assert.AnError)

	longURL, err := service.GetLongURL(slug)

	assert.Error(t, err)
	assert.Equal(t, "", longURL)
	mockRepo.AssertExpectations(t)
}

func TestTrackClick(t *testing.T) {
	mockRepo := new(MockURLRepository)
	service := services.NewURLService(mockRepo)

	click := models.Click{
		Slug:      "abc123",
		UserAgent: "test-agent",
		IP:        "127.0.0.1",
	}

	err := service.TrackClick(click)

	// Since TrackClick currently returns nil, we expect no error
	assert.NoError(t, err)
}
