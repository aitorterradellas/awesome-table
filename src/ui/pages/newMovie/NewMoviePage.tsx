import React, { SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Components
import {
  Button,
  Checkbox,
  MenuItem,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from '@mui/material'
import { Container } from '../../common/styles'

// Use case
import { addMovieUseCase } from '../../../core/movie/application/addMovieUseCase'

// Types
import { IMovie } from '../../../core/movie/domain/IMovie'

// Repository
import { movieApiRepository } from '../../../core/movie/infrastructure/movieApiRepository'

// Constants
import { ROUTES } from '../../routes/routes'

const defaultValues: IMovie = {
  name: '',
  rating: 0,
  country: '',
  isSeen: false,
  imageURL: '',
  id: '',
}

export const NewMoviePage = () => {
  const [formValues, setFormValues] = useState(defaultValues)
  const navigate = useNavigate()

  const onSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()

    const result = await addMovieUseCase(movieApiRepository, formValues)
    if (result.isSuccess) {
      /** NAVIGATE */
      navigate(ROUTES.MAIN_PAGE.path)
    }
  }

  const onChange = (e: SyntheticEvent | SelectChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const onCheck = (e: SyntheticEvent) => {
    const { name } = e.target as HTMLInputElement
    const toggleValue = !formValues[name as keyof typeof formValues]
    setFormValues({
      ...formValues,
      [name]: toggleValue,
    })
  }

  // TODO: On repository
  const options = ['Spain', 'France', 'English']

  const onSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      setFormValues({
        ...formValues,
        ['rating']: value,
      })
    }
  }

  return (
    <Container>
      <Typography variant={'h3'}>Add a new movie</Typography>
      <form onSubmit={onSubmit}>
        <TextField
          label={'Name'}
          name='name'
          onChange={onChange}
          type={'text'}
          value={formValues.name}
        />
        <div>
          Rating
          <Slider
            defaultValue={70}
            onChange={onSliderChange}
            value={formValues.rating}
            valueLabelDisplay='auto'
          />
        </div>
        <Select
          label={'Country'}
          name={'country'}
          onChange={onChange}
          value={formValues.country}
        >
          {options.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </Select>
        <div>
          Seen?
          <Checkbox
            checked={formValues.isSeen}
            name={'isSeen'}
            onChange={onCheck}
          />
        </div>
        <TextField
          label={'Poster'}
          name='imageURL'
          onChange={onChange}
          type={'text'}
          value={formValues.imageURL}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Container>
  )
}
