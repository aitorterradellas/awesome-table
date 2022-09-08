import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

// Components
import {
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Modal } from '../../components/modal/Modal'
import { AddButton, ButtonContainer } from './mainPage.styles'
import { Container } from '../../common/styles'

// Usecase
import { getMoviesUseCase } from '../../../core/movie/application/getMoviesUseCase'
import { deleteMovieUseCase } from '../../../core/movie/application/deleteMovieUseCase'

// Repository
import { movieApiRepository } from '../../../core/movie/infrastructure/movieApiRepository'

// Context
import { MovieContext } from '../../store/MovieProvider'

// Constants
import { ICONS } from '../../common/icons'
import { ADD, REMOVE_MOVIE, TITLE } from './mainPage.constants'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'

export const MainPage = () => {
  const {
    state: { movies },
    setState,
  } = useContext(MovieContext)

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState('')

  const getMovies = useCallback(async () => {
    const result = await getMoviesUseCase(movieApiRepository, {})
    if (result.isSuccess) {
      setState((prevState) => ({ ...prevState, movies: result.value }))
    }
  }, [setState])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  const columns = useMemo(
    () =>
      movies.length ? Object.keys(movies[0]).map((k) => k.toUpperCase()) : [],
    [movies]
  )

  const openModal = (id: string) => {
    setSelectedMovie(id)
    setModalOpen(true)
  }

  const closeModal = () => {
    setSelectedMovie('')
    setModalOpen(false)
  }

  const deleteMovie = async () => {
    const result = await deleteMovieUseCase(movieApiRepository, selectedMovie)
    if (result.isSuccess) {
      getMovies()
      closeModal()
    }
  }

  return (
    <Container>
      <Typography variant={'h3'}>{TITLE}</Typography>
      <Modal
        cancel={closeModal}
        confirm={deleteMovie}
        isOpen={isModalOpen}
        title={REMOVE_MOVIE}
      />
      <ButtonContainer>
        <AddButton to={ROUTES.NEW_MOVIE.path}>
          {ADD}
          <Icon>{ICONS.ADD}</Icon>
        </AddButton>
      </ButtonContainer>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((c) => (
                <TableCell key={c}>{c}</TableCell>
              ))}
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movies.map((m) => (
              <TableRow key={m.id}>
                <TableCell>{m.name}</TableCell>
                <TableCell>{m.rating}</TableCell>
                <TableCell>{m.country}</TableCell>
                <TableCell>
                  {m.isSeen && <Icon>{ICONS.CONFIRM}</Icon>}
                </TableCell>
                <TableCell>{m.imageURL}</TableCell>
                <TableCell>{m.id}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      openModal(m.id)
                    }}
                  >
                    <Icon>{ICONS.DELETE}</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton>
                    <Icon>{ICONS.SEE}</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
