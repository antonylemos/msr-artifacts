package tests

import (
	"backend/internal/handlers"
	"backend/internal/models"
	"backend/internal/services"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

// Mock URL Service
type MockURLService struct {
	mock.Mock
}

func (m *MockURLService) ShortenURL(longURL string) (string, error) {
	args := m.Called(longURL)
	return args.String(0), args.Error(1)
}

func (m *MockURLService) GetLongURL(slug string) (string, error) {
	args := m.Called(slug)
	return args.String(0), args.Error(1)
}

func (m *MockURLService) TrackClick(click models.Click) error {
	args := m.Called(click)
	return args.Error(0)
}

// Ensure MockURLService implements the interface
var _ services.URLServiceInterface = (*MockURLService)(nil)

func setupRouter() *gin.Engine {
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	return r
}

func TestShortenHandler(t *testing.T) {
	mockService := new(MockURLService)
	router := setupRouter()

	// Setup mock expectations
	mockService.On("ShortenURL", "https://example.com").Return("http://localhost:8080/abc123", nil)

	// Setup route with service injection
	router.POST("/shorten", func(c *gin.Context) {
		handlers.ShortenWithService(c, mockService)
	})

	// Create request body
	reqBody := handlers.ShortenRequest{
		LongURL: "https://example.com",
	}
	jsonBody, _ := json.Marshal(reqBody)

	// Create request
	req, _ := http.NewRequest("POST", "/shorten", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	// Execute request
	router.ServeHTTP(w, req)

	// Assertions
	assert.Equal(t, http.StatusOK, w.Code)

	var response handlers.ShortenResponse
	err := json.Unmarshal(w.Body.Bytes(), &response)
	assert.NoError(t, err)
	assert.Equal(t, "http://localhost:8080/abc123", response.ShortURL)

	mockService.AssertExpectations(t)
}

func TestShortenHandlerInvalidURL(t *testing.T) {
	mockService := new(MockURLService)
	router := setupRouter()

	router.POST("/shorten", func(c *gin.Context) {
		handlers.ShortenWithService(c, mockService)
	})

	// Create request with invalid URL
	reqBody := handlers.ShortenRequest{
		LongURL: "invalid-url",
	}
	jsonBody, _ := json.Marshal(reqBody)

	req, _ := http.NewRequest("POST", "/shorten", bytes.NewBuffer(jsonBody))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusBadRequest, w.Code)
}

func TestRedirectHandler(t *testing.T) {
	mockService := new(MockURLService)
	router := setupRouter()

	// Setup mock expectations
	mockService.On("GetLongURL", "abc123").Return("https://example.com", nil)

	// Setup redirect handler
	redirectHandler := handlers.NewRedirectHandler(mockService)
	router.GET("/:slug", redirectHandler.Redirect)

	// Create request
	req, _ := http.NewRequest("GET", "/abc123", nil)
	w := httptest.NewRecorder()

	// Execute request
	router.ServeHTTP(w, req)

	// Assertions
	assert.Equal(t, http.StatusTemporaryRedirect, w.Code)
	assert.Equal(t, "https://example.com", w.Header().Get("Location"))

	mockService.AssertExpectations(t)
}

func TestRedirectHandlerNotFound(t *testing.T) {
	mockService := new(MockURLService)
	router := setupRouter()

	// Setup mock to return error
	mockService.On("GetLongURL", "notfound").Return("", assert.AnError)

	redirectHandler := handlers.NewRedirectHandler(mockService)
	router.GET("/:slug", redirectHandler.Redirect)

	req, _ := http.NewRequest("GET", "/notfound", nil)
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	assert.Equal(t, http.StatusNotFound, w.Code)
	mockService.AssertExpectations(t)
}
