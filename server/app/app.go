package app

import (
	"fmt"
	"html"
	"log"
	"net/http"
)

// Run is the entry for the app
func Run() {
	log.Println("Server Starting...")

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		log.Print("/")
		fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
	})

	log.Fatal(http.ListenAndServe(":8080", nil))
}
