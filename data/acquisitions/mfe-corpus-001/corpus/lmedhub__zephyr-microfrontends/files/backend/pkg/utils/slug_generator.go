package utils

import (
	"math/rand"
	"time"
)

const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

func GenerateSlug(length int) string {
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	slug := make([]byte, length)
	for i := range slug {
		slug[i] = charset[r.Intn(len(charset))]
	}
	return string(slug)
}
