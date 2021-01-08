import React from 'react'
import { Icon, ListItemText, ListItemIcon, withStyles, Theme, ListItem } from '@material-ui/core'

const StyledListItem = withStyles((theme: Theme) => ({
    root: {
        margin: theme.spacing(1),
        borderRadius: theme.shape.borderRadius,
    },
    selected: {
        color: theme.palette.primary.main,
        fontWeight: 'bolder',
    }
}))(ListItem)

export interface NavListItemProps {
    text: string
    icon: string
    selected: boolean
}

export function NavListItem({ text, icon, selected }: NavListItemProps) {
    return <StyledListItem button key={text} selected={selected} dense>
        <ListItemIcon>
            <Icon color={selected ? "primary" : "inherit"}>{icon}</Icon>
        </ListItemIcon>
        <ListItemText primary={text} />
    </StyledListItem>
}
