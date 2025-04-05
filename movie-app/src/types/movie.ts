export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  imdbRating?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Actors?: string;
  Plot?: string;
  // Добавьте другие поля по мере необходимости
}

export interface ApiSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string; // "True" или "False"
  Error?: string;
}