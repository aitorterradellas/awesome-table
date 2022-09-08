import { Result } from '../../common/domain/Result'
import { IMovieRepository } from '../domain/IMovieRepository'

export const deleteMovieUseCase = async (
  repository: IMovieRepository,
  id: string
): Promise<Result> => {
  const result = await repository.deleteMovie(id)

  if (result.isSuccess) {
    return Result.success(undefined)
  } else {
    return Result.error(result.error)
  }
}
