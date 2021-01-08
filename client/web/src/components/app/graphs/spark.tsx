import { createStyles, makeStyles, withStyles } from '@material-ui/core';
import { useEffect, useMemo, useRef, useState } from 'react';
import sample from './spark-sample.json'

interface GraphProps {
    timestamp: number[];
    data: number[];

    width: number;
    height: number;

    range?: [start: number, end: number]
}

interface SparkGraphBaseProps extends GraphProps {
    close: number;
    strokeWidth?: number;
    pointerRadius?: number;
}

interface SparkGraphProps extends SparkGraphBaseProps {
    onFocus?: (dataPoint: DataPoint | null) => void;
}

type SparkGraphMiniProps = SparkGraphBaseProps;

interface DataPoint {
    point: Point;
    timestamp: number;
    dataPoint: number;
}

interface SectionData {
    type: 'red' | 'green';
    start: Point;
    end: Point;
    data: DataPoint[];
}

type Point = [x: number, y: number];

function arrayMin(arr: number[]) {
    return arr.reduce(function (p, v) {
        return (p < v ? p : v);
    });
}

function arrayMax(arr: number[]) {
    return arr.reduce(function (p, v) {
        return (p > v ? p : v);
    });
}

interface Size {
    width: number;
    height: number;
}

interface SparkGraphHookData {
    yClose: number;
    calculatedLineData: SectionData[];
    size: Size;
}

interface SparkGraphHookParams extends SparkGraphMiniProps {
    padding?: number;
}

function useSparkGraph({
    close,
    data,
    timestamp,
    width,
    height,
    range = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    padding = 5
}: SparkGraphHookParams): SparkGraphHookData {
    if (timestamp.length !== data.length)
        throw new Error("Timestamp array length should be equal to data point array")

    let xMin = Math.min(timestamp[0], range[0])
    let xMax = Math.max(timestamp[timestamp.length - 1], range[1])
    let xFactor = width / (xMax - xMin)

    let yMin = arrayMin(data)
    let yMax = arrayMax(data)
    let yFactor = height / (yMax - yMin)

    const transform = (x: number, y: number): Point => [
        (x - xMin) * xFactor + padding / 2,
        height - ((y - yMin) * yFactor) + padding / 2
    ]

    const yClose = useMemo(() => transform(0, close)[1], [
        close,
        data,
        timestamp,
        width,
        height,
        range
    ])

    const calculateIntersection = (a: Point, b: Point): Point => {
        const slope = (a[1] - b[1]) / (a[0] - b[0])
        return [
            (yClose - a[1] + slope * a[0]) / slope,
            yClose
        ]
    }

    const calculatedLineData = useMemo<SectionData[]>(() => {
        const sections: SectionData[] = []

        const dataPoints: DataPoint[] = data.map<DataPoint>((x, i) => ({
            timestamp: timestamp[i],
            dataPoint: data[i],
            point: transform(timestamp[i], data[i]),
        }))

        const seperatedDataPoints: DataPoint[][] = [];

        dataPoints.forEach(x => {
            const length = seperatedDataPoints.length
            if (length !== 0 && ((seperatedDataPoints[length - 1][0].dataPoint >= close
                && x.dataPoint >= close)
                || (seperatedDataPoints[length - 1][0].dataPoint < close
                    && x.dataPoint < close)))
                seperatedDataPoints[length - 1].push(x)
            else
                seperatedDataPoints.push([x])
        })

        seperatedDataPoints.forEach((x, i) => sections.push({
            type: x[0].dataPoint >= close ? 'green' : 'red',
            data: x,
            start: i === 0 ? x[0].point : sections[i - 1].end,
            end: i !== seperatedDataPoints.length - 1
                ? calculateIntersection(x[x.length - 1].point, seperatedDataPoints[i + 1][0].point)
                : x[x.length - 1].point
        }))

        return sections
    }, [close,
        data,
        timestamp,
        width,
        height,
        range])

    return {
        yClose,
        calculatedLineData,
        size: {
            height: height + padding * 2,
            width: width + padding * 2
        }
    }
}

export function SparkGraphMini({
    close,
    data,
    timestamp,
    width,
    height,
    range = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    strokeWidth = 0.5,
    pointerRadius = 3
}: SparkGraphMiniProps) {
    const ref = useRef<HTMLCanvasElement | null>(null)

    const {
        calculatedLineData,
        yClose,
        size
    } = useSparkGraph({
        close,
        data,
        timestamp,
        width,
        height,
        range,
        padding: pointerRadius * 2
    });

    const render = (ctx: CanvasRenderingContext2D) => {
        ctx.lineWidth = strokeWidth
        calculatedLineData.forEach((x, i) => {
            ctx.strokeStyle = x.type
            ctx.beginPath()
            ctx.moveTo(...x.start)
            x.data.forEach(data => ctx.lineTo(...data.point))
            ctx.lineTo(...x.end)
            ctx.stroke()

            if (i === 0)
                ctx.lineTo(x.start[0], yClose)

            if (i === calculatedLineData.length - 1)
                ctx.lineTo(x.end[0], yClose)

            var gradient;
            if (x.type === 'green') {
                gradient = ctx.createLinearGradient(0, 0, 0, yClose);
                gradient.addColorStop(0, "rgba(0, 255, 0, 0.5)");
                gradient.addColorStop(1, "white");
            } else {
                gradient = ctx.createLinearGradient(0, yClose, size.height, 0);
                gradient.addColorStop(0, "white");
                gradient.addColorStop(1, "rgba(255, 0, 0, 0.5)");
            }

            ctx.fillStyle = gradient
            ctx.closePath()
            ctx.fill()
        })

        let dataArray = calculatedLineData[calculatedLineData.length - 1].data

        const renderCircle = ({ point, dataPoint }: DataPoint) => {
            ctx.beginPath();
            ctx.fillStyle = dataPoint >= close ? 'green' : 'red'
            ctx.arc(...point, pointerRadius, 0, 2 * Math.PI);
            ctx.fill();
        }

        renderCircle(dataArray[dataArray.length - 1])
    }

    const renderCloseLine = (ctx: CanvasRenderingContext2D) => {
        ctx.beginPath()
        ctx.strokeStyle = 'black'
        ctx.setLineDash([5, 5]);
        ctx.moveTo(0, yClose)
        ctx.lineTo(size.width, yClose)
        ctx.stroke()

        // unset values
        ctx.setLineDash([0, 0])
    }

    const clear = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, size.width, size.height)

    useEffect(() => {
        const ctx = ref?.current?.getContext('2d');

        if (ctx) {
            clear(ctx)
            render(ctx)
            renderCloseLine(ctx)
        }
    })

    return (
        <canvas
            ref={ref}
            width={size.width}
            height={size.height}
        />
    )
}

const radius = 6
const useStyles = makeStyles(() =>
    createStyles({
        circle: {
            borderRadius: '100%',
            position: 'absolute',
            width: radius,
            height: radius
        },
        root: {
            position: 'relative'
        },
        canvasGraphLayers: {
            position: 'absolute',
            top: 0,
            left: 0
        },
    }),
)

export function SparkGraph({
    close,
    data,
    timestamp,
    width,
    height,
    onFocus = () => { },
    range = [Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER],
    strokeWidth = 1,
    pointerRadius = 3,
}: SparkGraphProps) {
    const graphLayerRef = useRef<HTMLCanvasElement | null>(null)
    const graphLayerPointerRef = useRef<HTMLCanvasElement | null>(null)

    const [posIndex, setPosIndex] = useState<number>(-1)
    const classes = useStyles()

    const {
        calculatedLineData,
        yClose,
        size
    } = useSparkGraph({
        close,
        data,
        timestamp,
        width,
        height,
        range,
        padding: pointerRadius * 2
    });

    const pointArry = useMemo(() => {
        const ary: [number, DataPoint][] = []
        calculatedLineData.forEach(x => {
            x.data.forEach(x => {
                ary.push([x.point[0], x])
            })
        })
        return ary
    }, [calculatedLineData])

    const findTheClosest = (goal = 0, arry = pointArry) => {
        const point = arry.reduce(function (prev, curr) {
            return (Math.abs(curr[0] - goal) < Math.abs(prev[0] - goal) ? curr : prev);
        })
        return arry.findIndex(x => point[1].dataPoint === x[1].dataPoint)
    }

    const renderCircle = (ctx: CanvasRenderingContext2D, { point, dataPoint }: DataPoint): void => {
        ctx.beginPath();
        ctx.fillStyle = dataPoint >= close ? 'green' : 'red'
        ctx.arc(...point, pointerRadius, 0, 2 * Math.PI);
        ctx.fill();
    }

    const render = (ctx: CanvasRenderingContext2D) => {
        ctx.lineWidth = strokeWidth
        calculatedLineData.forEach((x, i) => {
            ctx.strokeStyle = x.type
            ctx.beginPath()
            ctx.moveTo(...x.start)
            x.data.forEach(data => ctx.lineTo(...data.point))
            ctx.lineTo(...x.end)
            ctx.stroke()
        })

        ctx.lineWidth = strokeWidth
        ctx.beginPath()
        ctx.strokeStyle = 'black'
        ctx.setLineDash([5, 5]);
        ctx.moveTo(0, yClose)
        ctx.lineTo(size.width, yClose)
        ctx.stroke()

        // unset values
        ctx.setLineDash([0, 0])

        //render end pointer
        renderCircle(ctx, pointArry[pointArry.length - 1][1])
    }

    function getMousePos(e: React.PointerEvent<HTMLCanvasElement>) {
        var rect = graphLayerRef?.current?.getBoundingClientRect()

        if (rect)
            return {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        return { x: 0, y: 0 }
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
        setPosIndex(findTheClosest(getMousePos(e).x))
    }

    const clear = (ctx: CanvasRenderingContext2D) => ctx.clearRect(0, 0, size.width, size.height)

    useEffect(() => {
        const ctx = graphLayerRef?.current?.getContext('2d');

        if (ctx) {
            clear(ctx)
            render(ctx)
        }
    }, [calculatedLineData])

    useEffect(() => {
        if (posIndex !== -1)
            onFocus(pointArry[posIndex][1])
        else
            onFocus(null)
    }, [posIndex])

    const renderPointer = (ctx: CanvasRenderingContext2D, pointIndex: number) => {
        if (pointIndex !== -1)
            renderCircle(ctx, pointArry[pointIndex][1]);
    }

    useEffect(() => {
        const ctx = graphLayerPointerRef?.current?.getContext('2d')

        if (ctx) {
            clear(ctx)
            renderPointer(ctx, posIndex)
        }
    }, [posIndex])

    return (
        <div className={classes.root} style={{
            width: size.width,
            height: size.height
        }}>
            <canvas
                ref={graphLayerRef}
                width={size.width}
                height={size.height}
                className={classes.canvasGraphLayers}
            />
            <canvas
                ref={graphLayerPointerRef}
                width={size.width}
                height={size.height}
                className={classes.canvasGraphLayers}
            />
            <canvas
                width={size.width}
                height={size.height}
                className={classes.canvasGraphLayers}
                onPointerMove={handlePointerMove}
                onPointerLeave={() => setPosIndex(-1)}
            />
        </div>
    )
}

function fixNumber(num: number) {
    return Math.round(num * 100) / 100
}

export function SparkGraphTest() {
    const [pointData, setPointData] = useState<DataPoint | null>(null)

    const close = sample.meta.chartPreviousClose;
    const timestamp = sample.timestamp;
    const data = sample.indicators.quote[0].open.map(x => x === null ? close : x);
    const currentPrice = sample.meta.regularMarketPrice

    console.log(sample.timestamp.length)

    return <div>
        <SparkGraph
            close={close}
            data={data}
            timestamp={timestamp}
            width={500}
            height={230}
        />
    </div>
}