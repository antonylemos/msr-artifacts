package models

import (
    "time"
)

type URL struct {
    ID        uint      `gorm:"primaryKey" json:"id"`
    LongURL   string    `gorm:"not null" json:"long_url"`
    ShortURL  string    `gorm:"unique;not null" json:"short_url"`
    Slug      string    `gorm:"unique;not null" json:"slug"`
    CreatedAt time.Time `json:"created_at"`
    UpdatedAt time.Time `json:"updated_at"`
}