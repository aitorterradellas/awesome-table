import { movieUIMapper } from '../../../ui/store/movieUIMapper'
import { Result } from '../../common/domain/Result'
import { IMovie } from '../domain/IMovie'
import { IMovieRepository } from '../domain/IMovieRepository'

export const getMovieUseCase = async (
  repository: IMovieRepository,
  id: string
): Promise<Result<IMovie>> => {
  const result = await repository.getMovie(id)

  if (result.isSuccess) {
    const movie = movieUIMapper.fromDomain(result.value)
    return Result.success(movie)
  } else {
    return Result.error(result.error)
  }
}
