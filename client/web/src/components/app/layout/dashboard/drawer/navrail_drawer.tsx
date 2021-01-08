import React from 'react'
import sampleImage from 'assets/sample.jpeg'
import { Scrollbars } from 'react-custom-scrollbars'
import { RailItem } from "./rail_item"
import { makeStyles, Theme, createStyles, Avatar } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        navRailRoot: {
            display: 'flex',
            flexDirection: 'column',
            alignContent: 'start',
            alignItems: 'center',
            padding: theme.spacing(1),
            gap: theme.spacing(1),
            paddingTop: theme.spacing(2)
        },
    }),
)


export function NavRailDrawer() {
    const classes = useStyles()

    return <Scrollbars autoHide>
        <div className={classes.navRailRoot}>
            <Avatar alt="Remy Sharp" src={sampleImage} />
            <RailItem
                text="Dashboard"
                icon="dashboard"
                selected={false} />
            <RailItem
                text="Explore"
                icon="explore"
                selected={false} />
            <RailItem
                text="Wallet"
                icon="account_balance_wallet"
                selected={false} />
            <RailItem
                text="Favorite"
                icon="favorite"
                selected={true} />
            <RailItem
                text="Watctlist"
                icon="watch_later"
                selected={false} />
            <RailItem
                text="What If"
                icon="equalizer"
                selected={false} />
        </div>
    </Scrollbars>
}
