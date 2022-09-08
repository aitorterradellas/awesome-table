import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import { MovieContext } from '../../store/MovieProvider'
import { AppDependencies } from '../../../core/common/dependencies/AppDepencendies'

// Components
import {
  Button,
  Checkbox,
  Icon,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material'
import { Form, FormField, StyledSlider } from './movieForm.styles'

// Types
import { IMovie } from '../../../core/movie/domain/IMovie'

// Constants
import { LABELS } from '../../common/labels'

// Use case
import { getCountriesUseCase } from '../../../core/country/application/getCountriesUseCase'

interface MovieFormProps {
  defaultValues: IMovie
  onSubmit: (formValues: IMovie) => Promise<void>
}

export const MovieForm = ({ defaultValues, onSubmit }: MovieFormProps) => {
  const [formValues, setFormValues] = useState(defaultValues)
  const {
    state: { countries },
    setState,
  } = useContext(MovieContext)

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

  const onSliderChange = (event: Event, value: number | number[]) => {
    if (typeof value === 'number') {
      setFormValues({
        ...formValues,
        ['rating']: value,
      })
    }
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    onSubmit(formValues)
  }

  useEffect(() => {
    const callback = async () => {
      const result = await getCountriesUseCase(
        AppDependencies.ICountryRepository
      )
      if (result.isSuccess) {
        setState((prevState) => ({ ...prevState, countries: result.value }))
      }
    }

    if (!countries.length) {
      callback()
    }
  }, [countries, setState])

  return (
    <Form onSubmit={handleSubmit}>
      <FormField>
        <TextField
          label={LABELS.name}
          name='name'
          onChange={onChange}
          type={'text'}
          value={formValues.name}
        />
      </FormField>
      <FormField>
        <Typography>{LABELS.rating}</Typography>

        <StyledSlider
          defaultValue={70}
          onChange={onSliderChange}
          value={formValues.rating}
          valueLabelDisplay='auto'
        />
      </FormField>
      <FormField>
        <TextField
          label={LABELS.country}
          name={'country'}
          onChange={onChange}
          select
          value={formValues.country}
        >
          {countries.map((o: string) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>
      </FormField>
      <FormField>
        <Typography>{LABELS.isSeen}</Typography>

        <Checkbox
          checked={formValues.isSeen}
          name={'isSeen'}
          onChange={onCheck}
        />
      </FormField>
      <FormField>
        <TextField
          label={LABELS.imageURL}
          name='imageURL'
          onChange={onChange}
          type={'text'}
          value={formValues.imageURL}
        />
      </FormField>
      <FormField>
        <Button type='submit' variant='contained'>
          <Icon>save</Icon>
        </Button>
      </FormField>
    </Form>
  )
}
