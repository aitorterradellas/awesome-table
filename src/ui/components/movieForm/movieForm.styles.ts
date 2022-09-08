import styled from 'styled-components'
import { Slider } from '@mui/material'

export const Form = styled.form`
  margin-top: 4px;
`

export const FormField = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  margin-top: 8px;

  div,
  button {
    width: 100%;
  }

  button {
    margin-top: 8px;
  }
`

export const StyledSlider = styled(Slider)`
  margin-left: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
`
