import React, { useState } from 'react';
import { createStyles, fade, Theme, makeStyles, Icon, InputBase, IconButton, Toolbar, AppBar as MUIAppBar } from '@material-ui/core';
import { MoreInfoPrompt } from './more_info_prompt'
import { joinClass } from 'helpers/joinClass';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            color: 'rgb(250,250,250,0.65)',
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        search: {
            color: 'rgb(250,250,250,0.65)',
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
        trailingIcons: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
                marginLeft: theme.spacing(2)
            },
        },
        trailingIconStyle: {
            color: 'rgb(250,250,250,0.65)',
            marginRight: theme.spacing(1),
            marginLeft: theme.spacing(1),
        },
        drawerSpacer: {
            [theme.breakpoints.up('sm')]: {
                width: theme.size.drawerWidth,
            },
        },
        navrailDrawerSpacer: {
            [theme.breakpoints.up('sm')]: {
                width: theme.size.navigationRailWidth,
            },
        },
    }),
);

interface AppBarProps {
    navRailOpen: boolean;
    onMenuToggle: () => void;
}

export function AppBar({ navRailOpen, onMenuToggle }: AppBarProps) {
    const classes = useStyles();
    const [moreInfoPromptOpen, setMoreInfoPromptOpen] = useState(false)

    const handlePromptClose = () => {
        setMoreInfoPromptOpen((x: boolean) => !x)
    }

    return <div className={classes.root}>
        <MUIAppBar>
            <Toolbar>
                <MoreInfoPrompt open={moreInfoPromptOpen} onClose={handlePromptClose} />
                <div className={joinClass("", {
                    [classes.navrailDrawerSpacer]: navRailOpen,
                    [classes.drawerSpacer]: !navRailOpen
                })} />
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                    onClick={onMenuToggle}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <div className={classes.title} />
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <Icon>search</Icon>
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </div>
                <div className={classes.trailingIcons}>
                    <IconButton
                        edge="start"
                        className={classes.trailingIconStyle}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <Icon>notifications</Icon>
                    </IconButton>
                    <IconButton
                        edge="start"
                        className={classes.trailingIconStyle}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setMoreInfoPromptOpen(true)}
                    >
                        <Icon>info_outlined</Icon>
                    </IconButton>
                </div>
            </Toolbar>
        </MUIAppBar>
    </div>
}