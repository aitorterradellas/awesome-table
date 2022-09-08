import styled from 'styled-components'
import { Button } from '@mui/material'

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`

export const Actions = styled.div`
  display: flex;

  button {
    margin-right: 8px;
  }
`

export const AddButton = styled(Button)`
  align-items: center;
  display: flex;

  text-decoration: none;
  width: fit-content;
`

export const Sort = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`

export const Image = styled.img`
  border-radius: 50%;
  height: 30px;
  width: 30px;
`

export const NoData = styled.div`
  margin: 16px;
  text-align: center;
  width: 100%;
`
