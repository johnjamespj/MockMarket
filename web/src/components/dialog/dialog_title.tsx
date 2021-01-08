import { DialogTitle, createStyles, makeStyles, IconButton, Icon, Typography, Theme } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: 0,
            padding: theme.spacing(2),
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }))


interface TitleProps {
    title: string
    onClose?: () => void
}

export function Title({
    title,
    onClose
}: TitleProps) {
    const classes = useStyles()

    return (
        <DialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{title}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <Icon>close</Icon>
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}
