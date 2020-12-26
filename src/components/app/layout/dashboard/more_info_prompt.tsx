import { Dialog } from 'components/dialog'
import { DialogTitle, DialogContent, DialogContentText } from '@material-ui/core'

interface MoreInfoPromptProps {
    open: boolean;
    onClose: () => void;
}

export function MoreInfoPrompt({
    open,
    onClose
}: MoreInfoPromptProps) {
    return <Dialog open={open} onClose={onClose}>
        <DialogTitle>
            More Info
        </DialogTitle>
        <DialogContent>
            <DialogContentText>
                A stock market, equity market or share market is the aggregation 
                of buyers and sellers of stocks (also called shares), which represent 
                ownership claims on businesses; these may include securities listed on 
                a public stock exchange, as well as stock that is only traded privately,
                such as shares of private companies which are sold to investors through 
                equity crowdfunding platforms. Investment in the stock market is most 
                often done via stockbrokerages and electronic trading platforms. 
                Investment is usually made with an investment strategy in mind. This
                application is a stimulation of a working stock market.
            </DialogContentText>
        </DialogContent>
    </Dialog>
}