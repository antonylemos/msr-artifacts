package models

import "time"

type Click struct {
	ID        uint      `gorm:"primaryKey"`
	URLID     uint      `gorm:"not null"`       // Foreign key to the URL
	Slug      string    `gorm:"not null"`       // Add slug field
	Timestamp time.Time `gorm:"autoCreateTime"` // Time of the click
	IP        string    `gorm:"not null"`       // IP address of the user
	UserAgent string    `gorm:"not null"`       // User agent of the client
	Referrer  string    `gorm:"not null"`       // Referrer URL
}

type ClickStats struct {
	Slug      string  `json:"slug"`
	TotalHits int     `json:"total_hits"`
	Clicks    []Click `json:"clicks"`
}
