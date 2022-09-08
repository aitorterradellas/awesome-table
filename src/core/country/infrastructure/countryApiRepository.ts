import { Result } from '../../common/domain/Result'
import { countryClient } from '../../common/infrastructure/axios'
import { ICountryRepository } from '../domain/ICountryRepository'

interface CountryDTO {
  name: {
    common: string
  }
}

export const countryApiRepository: ICountryRepository = {
  async getCountries(): Promise<Result<string[]>> {
    try {
      const response: CountryDTO[] = await countryClient.get('/all')

      const result = response.map((r) => r.name.common).sort()
      return Result.success(result)
    } catch (e) {
      return Result.error(e as Error)
    }
  },
}
