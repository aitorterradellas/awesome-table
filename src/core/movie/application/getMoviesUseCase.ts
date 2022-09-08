// Types
import { movieUIMapper } from '../../../ui/store/movieUIMapper'
import { IQuery } from '../../common/domain/IQuery'
import { Result } from '../../common/domain/Result'
import { IMovie } from '../domain/IMovie'
import { IMovieRepository } from '../domain/IMovieRepository'

export const getMoviesUseCase = async (
  repository: IMovieRepository,
  query: IQuery
): Promise<Result<IMovie[]>> => {
  const result = await repository.getMovies(query)

  if (result.isSuccess) {
    const movies = result.value.map((m) => movieUIMapper.fromDomain(m))
    return Result.success(movies)
  } else {
    return Result.error(result.error)
  }
}
