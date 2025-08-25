# 🎬 Movie World – React + TMDB API

**Movie Finder** is a React application that helps users discover trending and popular movies with a clean UI and smooth infinite scrolling experience.  
It integrates with **The Movie Database (TMDB) API** for real-time movie data and **Appwrite** for search analytics.

---

## ✨ Features

- 🔍 **Search movies** with debounced input for better performance
- 📈 **Trending movies** section powered by Appwrite backend
- 🎞️ **All movies list** with infinite scroll (Intersection Observer)
- ⚡ **Modular React components**: `Header`, `TrendingMovies`, `AllMovies`, `MovieCard`, `Search`, `Spinner`
- 🔗 **Clickable movie cards** open external links (TMDB) in a new tab
- 🎨 **Responsive and accessible UI**

---

## 🛠️ Tech Stack

- **React 19 + Vite**
- **TMDB API** for movie data
- **Appwrite** for tracking search queries
- **Tailwind CSS** (or custom styles, depending on your setup)

---

## 🚀 Getting Started

Clone the repo:

```bash
git clone https://github.com/mhaider97/movie-world.git
cd movie-world
npm install
npm run dev
```

Create a **.env.local** file in the root with your TMDB API key:

```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_APPWRITE_PROJECT_ID=your_appwrite_project_id
VITE_APPWRITE_DATABASE_ID=your_appwrite_database_id
VITE_APPWRITE_COLLECTION_ID=your_appwrite_collection_id
```

## 📌 Roadmap

- [ ] Add movie details page with cast & reviews
- [ ] User authentication with Appwrite
- [ ] Save favorite movies (watchlist)
- [ ] Deploy to Vercel/Netlify 