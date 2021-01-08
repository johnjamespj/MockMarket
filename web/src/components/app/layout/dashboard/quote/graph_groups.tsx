import { Button, ButtonGroup, createStyles, makeStyles, Theme, withStyles, Card } from "@material-ui/core"
import { SparkGraph } from 'components/app/graphs/spark'
import React from "react";

export type ValidRange =
    | "1d"
    | "5d"
    | "1mo"
    | "3mo"
    | "6mo"
    | "1y"
    | "2y"
    | "5y"
    | "10y"
    | "ytd"
    | "max"

export type ValidInterval =
    | "1m"
    | "2m"
    | "5m"
    | "15m"
    | "30m"
    | "60m"
    | "90m"
    | "1h"
    | "1d"
    | "5d"
    | "1wk"
    | "1mo"
    | "3mo"

type IntervalRangeMap = { [P in ValidRange]: ValidInterval; };

export const intervalRangeMap: IntervalRangeMap = {
    "1d": "5m",
    "5d": "15m",
    "1mo": "1d",
    "3mo": "1d",
    "6mo": "5d",
    "1y": "1wk",
    "2y": "1mo",
    "5y": "3mo",
    "10y": "3mo",
    "ytd": "1d",
    "max": "1mo"
}

export interface GraphGroupsProps {
    validRanges: ValidRange[];
    selectedRange: ValidRange;

    onRangeChange: (newRange: ValidRange) => void;
    openData: number[];
    timestamps: number[];
    previousClose: number;
}

const width = 350
const height = 140
const radius = 2
export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: width + 4 * radius + theme.spacing(1) * 4,
            padding: theme.spacing(1)
        },
        graph: {
            padding: theme.spacing(1)
        },
        buttons: {
            alignSelf: 'center'
        }
    }),
)

const StyledButton = withStyles((theme: Theme) => ({
    label: {
        fontSize: theme.typography.overline.fontSize
    }
}))(Button)

const SECONDS_IN_DAY = 86400

const seconds_in_year = (year: number) => (new Date(year, 11, 31, 23, 59, 59).getTime() - new Date(year, 0).getTime()) / 1000

/**
 * Graph Group for stock quotes
 * 
 * 1d => 5m, 
 * 5d => 15m, 
 * 1mo => 1d, 
 * 3mo => 1d,
 * 6mo => 5d,
 * 1y => 1wk,
 * 2y => 1mo,
 * 5y => 3mo,
 * 10y => 3mo,
 * ytd => 1d,
 * max => 1mo
 */
export function GraphGroups({
    validRanges,
    selectedRange,
    previousClose,
    onRangeChange,
    openData,
    timestamps
}: GraphGroupsProps) {
    const classes = useStyles();
    let range: [number, number] = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER]

    if (selectedRange === '1d')
        range = [timestamps[0], timestamps[0] + SECONDS_IN_DAY]
    else if (selectedRange === 'ytd')
        range = [timestamps[0], timestamps[0] + seconds_in_year(new Date(timestamps[0]).getFullYear())]

    return <div className={classes.root}>
        <div className={classes.graph}>
            <SparkGraph
                close={previousClose}
                timestamp={timestamps}
                data={openData}
                height={height}
                width={width}
                pointerRadius={radius}
                range={range}
            />
        </div>
        <div className={classes.buttons}>
            <ButtonGroup color="primary" aria-label="outlined primary button group" className={classes.buttons}>
                {validRanges.map(x =>
                    <StyledButton size="small" variant={x === selectedRange ? "contained" : "outlined"} onClick={() => onRangeChange(x)}>
                        {x}
                    </StyledButton>
                )}
            </ButtonGroup>
        </div>
    </div>
}
