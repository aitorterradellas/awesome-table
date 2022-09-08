import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`

export const AddButton = styled(Link)`
  align-items: center;
  border-radius: 4px;
  color: black;
  display: flex;
  padding: 4px;
  text-decoration: none;
  width: fit-content;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`
