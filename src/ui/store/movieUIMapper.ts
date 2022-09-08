import { IMovie } from '../../core/movie/domain/IMovie'
import { Movie } from '../../core/movie/domain/Movie'

export const movieUIMapper = {
  fromDomain(movie: Movie): IMovie {
    return {
      name: movie.name,
      rating: movie.rating,
      country: movie.country,
      isSeen: movie.isSeen,
      imageURL: movie.imageURL,
      id: movie.id,
    }
  },

  toDomain(dto: IMovie): Movie {
    return new Movie(dto)
  },
}
