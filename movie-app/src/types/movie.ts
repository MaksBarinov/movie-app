export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type?: string;
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: {
    Source: string;
    Value: string;
  }[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

export interface ApiSearchResponse {
  Search: Movie[];
  totalResults: string;
  Response: string;
  Error?: string;
}