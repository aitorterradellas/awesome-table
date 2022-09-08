import { client } from '../../common/infrastructure/axios'

// Types
import { IQuery } from '../../common/domain/IQuery'
import { Result } from '../../common/domain/Result'
import { IMovieRepository } from '../domain/IMovieRepository'

// DTOs
import { MovieDTO } from './MovieDTO'
import { movieMapper } from './movieMapper'
import { Movie } from '../domain/Movie'

export const movieApiRepository: IMovieRepository = {
  async getMovies(query: IQuery): Promise<Result<Movie[]>> {
    try {
      const queryString = query.filter ? `filter=${query.filter}` : ''
      const sortString = query.sortBy
        ? `sortBy=${query.sortBy}&order=${query.order}`
        : ''

      const ampersand = queryString || sortString ? '&' : ''

      const response: MovieDTO[] = await client.get(
        `/movies?${queryString}${ampersand}${sortString}`
      )

      const result = response.map((m) => movieMapper.toDomain(m))

      return Result.success(result)
    } catch (e) {
      return Result.error(e as Error)
    }
  },

  async getMovie(id: string): Promise<Result<Movie>> {
    try {
      const response: MovieDTO = await client.get(`/movies/${id}`)
      return Result.success(movieMapper.toDomain(response))
    } catch (e) {
      return Result.error(e as Error)
    }
  },

  async addMovie(movie: Movie): Promise<Result> {
    try {
      const dto = movieMapper.fromDomain(movie)

      await client.post('/movies', dto)
      return Result.success(undefined)
    } catch (e) {
      return Result.error(e as Error)
    }
  },

  async updateMovie(movie: Movie): Promise<Result> {
    try {
      const dto = movieMapper.fromDomain(movie)

      await client.put(`/movies/${dto.id}`, dto)
      return Result.success(undefined)
    } catch (e) {
      return Result.error(e as Error)
    }
  },

  async deleteMovie(id: string): Promise<Result> {
    try {
      await client.delete(`/movies/${id}`)
      return Result.success(undefined)
    } catch (e) {
      return Result.error(e as Error)
    }
  },
}
