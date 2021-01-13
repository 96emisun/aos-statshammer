import { makeStyles, Theme, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    position: 'relative',
  },
  closeButton: {
    marginRight: theme.spacing(1),
  },
  icon: {
    color: theme.palette.primary.contrastText,
  },
}))

interface DialogAppBarProps {
  id?: string
  title: string
  onClose: () => void
}

const DialogAppBar = ({ id, title, onClose }: DialogAppBarProps) => {
  const classes = useStyles()

  return (
    <AppBar className={classes.appBar}>
      <Toolbar>
        <IconButton onClick={onClose} className={classes.closeButton}>
          <Close className={classes.icon} />
        </IconButton>
        <Typography variant="h6" id={id}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default DialogAppBar
