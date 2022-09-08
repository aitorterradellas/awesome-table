import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDependencies } from '../../../core/common/dependencies/AppDepencendies'

// Components
import { Typography } from '@mui/material'
import { FormContainer } from '../../common/styles'
import { MovieForm } from '../../components/movieForm/MovieForm'

// Use case
import { addMovieUseCase } from '../../../core/movie/application/addMovieUseCase'

// Types
import { IMovie } from '../../../core/movie/domain/IMovie'

// Repository

// Constants
import { ROUTES } from '../../routes/routes'

import { TITLE } from './newMovie.constants'

const defaultValues: IMovie = {
  name: '',
  rating: 0,
  country: '',
  isSeen: false,
  imageURL: '',
  id: '',
}

export const NewMoviePage = () => {
  const navigate = useNavigate()

  const onSubmit = async (formValues: IMovie) => {
    const result = await addMovieUseCase(
      AppDependencies.IMovieRepository,
      formValues
    )

    // If use case is succesful, redirects to the main page
    if (result.isSuccess) {
      navigate(ROUTES.MAIN_PAGE.path)
    }
  }

  return (
    <FormContainer>
      <Typography variant={'h3'}>{TITLE}</Typography>
      <MovieForm defaultValues={defaultValues} onSubmit={onSubmit} />
    </FormContainer>
  )
}
