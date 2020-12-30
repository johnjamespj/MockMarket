import React from 'react'
import { makeStyles, Theme, createStyles, Popover, Card } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  }),
)

interface NotificationsBaseProps {
  anchorEl: null | HTMLElement
  onClose: () => void
}

function NotificationsBase({
  anchorEl,
  onClose
}: NotificationsBaseProps) {
  const classes = useStyles()
  const open = Boolean(anchorEl)

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClose={onClose}
    >
      <Card className={classes.paper}>The content of the Popover.</Card>
    </Popover>
  )
}

type NotificationsProps = {} & NotificationsBaseProps

export function Notifications({
  anchorEl,
  onClose
}: NotificationsProps) {
  return <NotificationsBase
    onClose={onClose}
    anchorEl={anchorEl}
  />
}