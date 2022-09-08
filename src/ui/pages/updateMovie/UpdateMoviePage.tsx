import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppDependencies } from '../../../core/common/dependencies/AppDepencendies'

// Components
import { Typography } from '@mui/material'
import { FormContainer } from '../../common/styles'
import { MovieForm } from '../../components/movieForm/MovieForm'

// Use case
import { getMovieUseCase } from '../../../core/movie/application/getMovieUseCase'
import { updateMovieUseCase } from '../../../core/movie/application/updateMovieUseCase'

// Type
import { IMovie } from '../../../core/movie/domain/IMovie'

// Constants
import { ROUTES } from '../../routes/routes'

export const UpdateMoviePage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const [movie, setMovie] = useState<IMovie>()

  // Gets the movie by id
  useEffect(() => {
    const callback = async (id: string) => {
      const result = await getMovieUseCase(AppDependencies.IMovieRepository, id)
      if (result.isSuccess) {
        setMovie(result.value)
      }
    }

    if (id) callback(id)
  }, [id])

  // Submits the updated movie and redirects to the main page
  const onSubmit = async (dto: IMovie) => {
    const result = await updateMovieUseCase(
      AppDependencies.IMovieRepository,
      dto
    )
    if (result) {
      navigate(ROUTES.MAIN_PAGE.path)
    }
  }

  return (
    <FormContainer>
      <Typography variant={'h3'}>{movie?.name}</Typography>
      {movie && <MovieForm defaultValues={movie} onSubmit={onSubmit} />}
    </FormContainer>
  )
}
