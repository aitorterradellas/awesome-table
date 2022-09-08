import { ICountryRepository } from '../../country/domain/ICountryRepository'
import { countryApiRepository } from '../../country/infrastructure/countryApiRepository'
import { IMovieRepository } from '../../movie/domain/IMovieRepository'
import { movieApiRepository } from '../../movie/infrastructure/movieApiRepository'

interface IAppDependencies {
  ICountryRepository: ICountryRepository
  IMovieRepository: IMovieRepository
}

const apiDependencies = {
  ICountryRepository: countryApiRepository,
  IMovieRepository: movieApiRepository,
}

export const AppDependencies: IAppDependencies = apiDependencies
