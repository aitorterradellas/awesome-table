import React from 'react'

// Components
import { Modal as MuiModal, IconButton, Icon, Typography } from '@mui/material'
import { ModalContent } from './modal.styles'

// Constants
import { ICONS } from '../../common/icons'

interface ModalProps {
  cancel: () => void
  isOpen: boolean
  confirm: () => Promise<void>
  title: string
}

export const Modal = ({ cancel, isOpen, confirm, title }: ModalProps) => {
  return (
    <MuiModal onClose={cancel} open={isOpen}>
      <ModalContent>
        <Typography>{title}</Typography>
        <IconButton color={'primary'} onClick={confirm}>
          <Icon>{ICONS.CONFIRM}</Icon>
        </IconButton>
        <IconButton color={'error'} onClick={cancel}>
          <Icon>{ICONS.CANCEL}</Icon>
        </IconButton>
      </ModalContent>
    </MuiModal>
  )
}
