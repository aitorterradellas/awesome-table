import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { AppDependencies } from '../../../core/common/dependencies/AppDepencendies'

// Components
import {
  Icon,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Modal } from '../../components/modal/Modal'
import {
  Actions,
  AddButton,
  Header,
  Image,
  NoData,
  Sort,
} from './mainPage.styles'
import { Container } from '../../common/styles'

// Usecase
import { getMoviesUseCase } from '../../../core/movie/application/getMoviesUseCase'
import { deleteMovieUseCase } from '../../../core/movie/application/deleteMovieUseCase'

// Context
import { MovieContext } from '../../store/MovieProvider'

// Constants
import { ICONS } from '../../common/icons'
import {
  ASC,
  DEBOUNCE,
  DESC,
  FILTER,
  NO_DATA,
  REMOVE_MOVIE,
  TITLE,
} from './mainPage.constants'

import { ROUTES } from '../../routes/routes'
import { LABELS } from '../../common/labels'

// Types
import { IQuery } from '../../../core/common/domain/IQuery'

export const MainPage = () => {
  const {
    state: { movies },
    setState,
  } = useContext(MovieContext)

  const navigate = useNavigate()

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState('')
  const [query, setQuery] = useState<IQuery>({})
  const [search, setSearch] = useState('')

  const getMovies = useCallback(async () => {
    const result = await getMoviesUseCase(
      AppDependencies.IMovieRepository,
      query
    )
    if (result.isSuccess) {
      setState((prevState) => ({ ...prevState, movies: result.value }))
    }
  }, [setState, query])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  const columns = useMemo(
    () =>
      movies.length ? Object.keys(movies[0]).filter((k) => k !== 'id') : [],
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
    const result = await deleteMovieUseCase(
      AppDependencies.IMovieRepository,
      selectedMovie
    )
    if (result.isSuccess) {
      getMovies()
      closeModal()
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement
    setSearch(value)
  }

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setQuery((prevQuery) => ({
        ...prevQuery,
        filter: search,
      }))
    }, DEBOUNCE)

    return () => {
      clearTimeout(timeout)
    }
  }, [search])

  const onSort = (sortBy: string) => {
    const order =
      query.sortBy === sortBy ? (query.order === ASC ? DESC : ASC) : ASC

    setQuery((prevQuery) => ({
      ...prevQuery,
      sortBy,
      order,
    }))
  }

  return (
    <Container>
      <Modal
        cancel={closeModal}
        confirm={deleteMovie}
        isOpen={isModalOpen}
        title={REMOVE_MOVIE}
      />
      <Header>
        <Typography variant={'h3'}>{TITLE}</Typography>
        <Actions>
          <AddButton
            onClick={() => {
              navigate(ROUTES.NEW_MOVIE.path)
            }}
            variant={'contained'}
          >
            <Icon>{ICONS.ADD}</Icon>
          </AddButton>
          <OutlinedInput
            endAdornment={
              <InputAdornment position='end'>
                <Icon>{ICONS.SEARCH}</Icon>
              </InputAdornment>
            }
            onKeyDown={onKeyDown}
            placeholder={FILTER}
          />
        </Actions>
      </Header>

      {movies.length ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((c) => (
                  <TableCell key={c}>
                    <Sort
                      onClick={() => {
                        onSort(c)
                      }}
                    >
                      {LABELS[c]}
                      {query.sortBy === c && (
                        <Icon>
                          {query.order === ASC
                            ? ICONS.ARROW_DOWN
                            : ICONS.ARROW_UP}
                        </Icon>
                      )}
                    </Sort>
                  </TableCell>
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
                    {m.isSeen && <Icon color={'success'}>{ICONS.CONFIRM}</Icon>}
                  </TableCell>
                  <TableCell>
                    <Image src={m.imageURL} />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color={'error'}
                      onClick={() => {
                        openModal(m.id)
                      }}
                    >
                      <Icon>{ICONS.DELETE}</Icon>
                    </IconButton>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color={'primary'}
                      onClick={() => {
                        navigate(`/${m.id}`)
                      }}
                    >
                      <Icon>{ICONS.EDIT}</Icon>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <NoData>{NO_DATA}</NoData>
      )}
    </Container>
  )
}
