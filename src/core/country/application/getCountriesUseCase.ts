import { Result } from '../../common/domain/Result'
import { ICountryRepository } from '../domain/ICountryRepository'

export const getCountriesUseCase = async (
  repository: ICountryRepository
): Promise<Result<string[]>> => {
  const result = await repository.getCountries()
  if (result.isSuccess) return Result.success(result.value)
  else return Result.error(result.error)
}
