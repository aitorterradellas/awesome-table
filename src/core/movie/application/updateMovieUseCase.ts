// Mapper
import { movieUIMapper } from '../../../ui/store/movieUIMapper'

// Types
import { Result } from '../../common/domain/Result'
import { IMovie } from '../domain/IMovie'
import { IMovieRepository } from '../domain/IMovieRepository'

export const updateMovieUseCase = async (
  repository: IMovieRepository,
  dto: IMovie
): Promise<Result> => {
  const movie = movieUIMapper.toDomain(dto)
  const result = await repository.updateMovie(movie)

  if (result.isSuccess) {
    return Result.success(undefined)
  } else {
    return Result.error(result.error)
  }
}
