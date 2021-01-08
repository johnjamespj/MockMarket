import { useState } from "react";
import { GraphGroups, ValidInterval, ValidRange } from "./graph_groups";
import sample from './quote-sample.json';

interface SampleChartGroupData {
    previousClose: number;
    openData: number[];
    timestamps: number[];
    selectedRange: ValidRange;
}

function getSampleData(x: ValidRange) {
    return {
        timestamps: sample.chart[x].timestamp,
        openData: sample.chart[x].indicators.quote[0].open,
        previousClose: sample.chart[x].meta.chartPreviousClose,
        selectedRange: x,
    }
}

function GraphGroupsTest() {
    const [chartData, setChartData] = useState<SampleChartGroupData>(getSampleData('1d'))

    return <GraphGroups
        validRanges={[
            "1d",
            "5d",
            "1mo",
            "6mo",
            "1y",
            "10y",
            "ytd",
            "max"
        ]}
        onRangeChange={(x) => setChartData(getSampleData(x))}
        selectedRange={chartData.selectedRange}
        previousClose={chartData.previousClose}
        openData={chartData.openData}
        timestamps={chartData.timestamps}
    />
}

export function Test() {
    return <GraphGroupsTest />
}