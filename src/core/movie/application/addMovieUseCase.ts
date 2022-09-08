import { movieUIMapper } from '../../../ui/store/movieUIMapper'
import { Result } from '../../common/domain/Result'
import { IMovie } from '../domain/IMovie'
import { IMovieRepository } from '../domain/IMovieRepository'
import { movieMapper } from '../infrastructure/movieMapper'

export const addMovieUseCase = async (
  repository: IMovieRepository,
  imovie: IMovie
): Promise<Result> => {
  const movie = movieUIMapper.toDomain(imovie)
  const result = await repository.addMovie(movieMapper.fromDomain(movie))

  if (result.isSuccess) {
    return Result.success(undefined)
  } else {
    return Result.error(result.error)
  }
}
