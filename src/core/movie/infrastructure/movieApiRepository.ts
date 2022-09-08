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
      const response: MovieDTO[] = await client.get(`/movies`)

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

  async addMovie(movie: MovieDTO): Promise<Result> {
    try {
      await client.post('/movies', movie)
      return Result.success(undefined)
    } catch (e) {
      return Result.error(e as Error)
    }
  },

  async updateMovie(movie: MovieDTO): Promise<Result> {
    try {
      await client.put(`/movies/${movie.id}`, movie)
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
