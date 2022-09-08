import { IMovie } from './IMovie'

export class Movie {
  private _name: string
  private _rating: number
  private _country: string
  private _isSeen: boolean
  private _imageURL: string
  private _id: string

  constructor(movie: IMovie) {
    this._name = movie.name
    this._rating = movie.rating
    this._country = movie.country
    this._isSeen = movie.isSeen
    this._imageURL = movie.imageURL
    this._id = movie.id
  }

  get name(): string {
    return this._name
  }

  get rating(): number {
    return this._rating
  }

  get country(): string {
    return this._country
  }

  get isSeen(): boolean {
    return this._isSeen
  }

  get imageURL(): string {
    return this._imageURL
  }

  get id(): string {
    return this._id
  }
}
