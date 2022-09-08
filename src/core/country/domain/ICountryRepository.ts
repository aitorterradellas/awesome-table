import { Result } from '../../common/domain/Result'

export interface ICountryRepository {
  getCountries(): Promise<Result<string[]>>
}
