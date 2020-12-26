import React from 'react';
import MUIDialog from '@material-ui/core/Dialog';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

interface DialogProps{
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
}

export function Dialog(props: DialogProps) {
    const {children, open, onClose} = props

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        onClose();
    };

    return (
        <MUIDialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            {children}
        </MUIDialog>
    );
}