import React from 'react';
import Icon from '@material-ui/core/Icon';
import { makeStyles, withStyles, createStyles, Theme, Button } from '@material-ui/core';
import { joinClass } from 'helpers/joinClass';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        labelText: {
            color: theme.palette.action.active,
        },
        labelTextSelected: {
            color: theme.palette.primary.main,
        },
    }),
);


const RailButton = withStyles((theme: Theme) => createStyles({
    root: {
        textTransform: "capitalize",
        fontSize: 10,
        height: theme.size.navigationRailWidth,
        borderRadius: theme.shape.borderRadius,
        "&:hover": {
            backgroundColor: theme.palette.action.hover
        }
    },
    label: {
        display: "flex",
        flexDirection: "column",
    },
}))(Button)

interface RailItemProps {
    icon: string;
    text: string;
    selected: boolean;
}

export function RailItem({
    icon,
    text,
    selected
}: RailItemProps) {
    const classes = useStyles();

    const StyleRailButton = withStyles((theme) => {
        if (selected)
            return ({
                root: {
                    color: theme.palette.primary.main,
                    backgroundColor: theme.palette.action.selected,
                    "&:hover": {
                        backgroundColor: theme.palette.action.selected,
                    },
                }
            });


        else
            return ({ root: {} });
    })(RailButton);

    return (
        <StyleRailButton>
            <Icon color={selected ? "primary" : "inherit"}>{icon}</Icon>
            <div className={joinClass(classes.labelText, {
                [classes.labelTextSelected]: selected
            })}>{text}</div>
        </StyleRailButton>
    );
}
