import { Movie } from '../domain/Movie'
import { MovieDTO } from './MovieDTO'

export const movieMapper = {
  fromDomain(movie: Movie): MovieDTO {
    return {
      name: movie.name,
      rating: movie.rating,
      country: movie.country,
      seen: movie.isSeen,
      poster: movie.imageURL,
      id: movie.id,
    }
  },

  toDomain(dto: MovieDTO): Movie {
    return new Movie({ ...dto, isSeen: dto.seen, imageURL: dto.poster })
  },
}
