export class Result<Success = undefined> {
  private _value?: Success
  private _error?: Error

  private _isSuccess: boolean

  constructor(value?: Success, error?: Error) {
    this._value = value
    this._error = error

    this._isSuccess = !error
  }

  get value(): Success {
    if (!this._isSuccess) {
      throw new Error('Not success')
    }

    return this._value as Success
  }

  get error(): Error {
    if (this._isSuccess) {
      throw new Error('Not error')
    }

    return this._error as Error
  }

  get isSuccess(): boolean {
    return this._isSuccess
  }

  static error<Success>(error: Error): Result<Success> {
    return new Result<Success>(undefined, error)
  }

  static success<Success>(success: Success): Result<Success> {
    return new Result<Success>(success)
  }
}
