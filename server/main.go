package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

type Article struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	PublishedAt time.Time `json:"published_at"`
}

var news = []Article{
	{
		ID:          1,
		Title:       "Chrome adds a new PWA feature",
		PublishedAt: time.Now(),
	},
	{
		ID:          2,
		Title:       "A new JavaScript API lands",
		PublishedAt: time.Now(),
	},
	{
		ID:          3,
		Title:       "Web developers rejoice",
		PublishedAt: time.Now(),
	},
		{
		ID:          4,
		Title:       "This is the latest news from Rotaract!",
		PublishedAt: time.Now(),
	},
}

func getNews(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(news)
}

func main() {
	// API
	http.HandleFunc("/api/news", getNews)

	// Frontend
	fs := http.FileServer(http.Dir("../frontend"))
	http.Handle("/", fs)

	log.Println("NewsApp is running at http://localhost:8000")
	log.Fatal(http.ListenAndServe(":8000", nil))
}