import { Result } from '../../common/domain/Result'
import { IMovie } from '../domain/IMovie'
import { IMovieRepository } from '../domain/IMovieRepository'

// Mapper
import { movieUIMapper } from '../../../ui/store/movieUIMapper'

export const addMovieUseCase = async (
  repository: IMovieRepository,
  dto: IMovie
): Promise<Result> => {
  const movie = movieUIMapper.toDomain(dto)
  const result = await repository.addMovie(movie)

  if (result.isSuccess) {
    return Result.success(undefined)
  } else {
    return Result.error(result.error)
  }
}
