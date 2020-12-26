import React from 'react';
import { Avatar, createStyles, IconButton, makeStyles, Theme, Typography, List, Icon, Divider } from '@material-ui/core';
import sampleImage from 'assets/sample.jpeg';
import { Scrollbars } from 'react-custom-scrollbars';
import { NavListItem } from "./navlist_item";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userInfo: {
            display: 'grid',
            gridTemplateColumns: 'auto auto',
            gap: theme.spacing(1),
            margin: theme.spacing(1),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(3)
        },
        settingsIcon: {
            justifySelf: 'end'
        },
        list: {
            width: `calc(${theme.size.drawerWidth}px - ${2 * theme.spacing(1)}px)`
        },
    }),
);

export function NavDrawer() {
    const classes = useStyles();

    return (
        <Scrollbars
            autoHide
        >
            <div className={classes.userInfo}>
                <Avatar alt="Remy Sharp" src={sampleImage} />
                <IconButton className={classes.settingsIcon}>
                    <Icon>settings</Icon>
                </IconButton>
                <div>
                    <Typography variant="h4">
                        Andera Sator
                    </Typography>
                    <Typography variant="caption">
                        anderasator@gmail.com
                    </Typography>
                </div>
            </div>
            <Divider />
            <List className={classes.list}>
                <NavListItem
                    text="Dashboard"
                    icon="dashboard"
                    selected={false} />
                <NavListItem
                    text="Explore"
                    icon="explore"
                    selected={false} />
                <NavListItem
                    text="Wallet"
                    icon="account_balance_wallet"
                    selected={false} />
                <NavListItem
                    text="Favorite"
                    icon="favorite"
                    selected={true} />
                <NavListItem
                    text="Watctlist"
                    icon="watch_later"
                    selected={false} />
                <NavListItem
                    text="What If"
                    icon="equalizer"
                    selected={false} />
            </List>
            <Divider />
        </Scrollbars>
    );
}
