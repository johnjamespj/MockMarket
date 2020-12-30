import './protobuf'
import { decode } from './protobuf_expose'
import { PricingData } from './price_update'
// import { useEffect, useState } from 'react'

interface SendProps {
    subscribe?: string[];
    unsubscribe?: string[];
}

const WSS_URL = 'wss://streamer.finance.yahoo.com/'

export class WSTicker {
    private static instance: WSTicker = new WSTicker();

    public static getController(): WSTicker {
        return WSTicker.instance;
    }

    private symbls: Map<string, number>;
    private listeners: ((data: PricingData[]) => void)[];
    private wsConnection: WebSocket;
    private readyCompleter: Promise<void>;

    constructor() {
        this.wsConnection = new WebSocket(WSS_URL)
        this.symbls = new Map<string, number>()
        this.listeners = []

        this.readyCompleter = new Promise((res, rej) => {
            this.wsConnection.addEventListener('open', async () => {
                res();
            })
        });

        this.wsConnection.addEventListener('message', (event) => {
            const update = this.decode(event.data)
            this.listeners.forEach(listener => listener(update))
        })
    }

    public stream(symbl: string | string[], callback: (data: PricingData) => void): number {
        let symbolArray: string[];
        if (!Array.isArray(symbl))
            symbolArray = [symbl];
        else
            symbolArray = symbl

        this.listeners.push((pricingData: PricingData[]) => {
            symbolArray.forEach(x => {
                pricingData.forEach((value) => {
                    if (value.id === x)
                        callback(value);
                })
            })
        })

        return this.listeners.length - 1
    }

    public async addSymbols(symbl: string | string[]) {
        await this.readyCompleter;

        let symbolArray: string[];
        if (!Array.isArray(symbl))
            symbolArray = [symbl];
        else
            symbolArray = symbl


        let toAdd = this.addAllSymbolsToList(symbolArray)

        if (toAdd.length !== 0)
            this.send({
                subscribe: toAdd
            })
    }

    public async removeSymbols(symbl: string | string[]) {
        await this.readyCompleter;

        let symbolArray: string[];
        if (!Array.isArray(symbl))
            symbolArray = [symbl];
        else
            symbolArray = symbl


        let toRemove = this.removeAllSymbolsFromList(symbolArray)

        if (toRemove.length !== 0)
            this.send({
                unsubscribe: toRemove
            })
    }

    public clear(id: number) {
        this.listeners = [...this.listeners.slice(id), ...this.listeners.slice(id + 1)]
    }

    private addAllSymbolsToList(symbl: string[]): string[] {
        let toAdd: string[] = []
        symbl.forEach(x => {
            if (!this.symbls.has(x)) {
                this.symbls.set(x, 1)
                toAdd.push(x)
            } else
                this.symbls.set(x, (this.symbls.get(x) || 0) + 1)
        })
        return toAdd
    }

    private removeAllSymbolsFromList(symbl: string[]): string[] {
        let toRemove: string[] = []

        symbl.forEach(x => {
            const value = this.symbls.get(x) || 0

            if (value === 1) {
                this.symbls.delete(x)
                toRemove.push(x)
            } else if (value !== 0)
                this.symbls.set(x, value - 1)
        })

        return toRemove
    }

    private decode(str: string): PricingData[] {
        return decode(str).map<PricingData>((x: object) => PricingData.fromJSON(x))
    }

    private send(data: SendProps) {
        this.wsConnection.send(JSON.stringify(data))
    }
}

// interface SymbolState {
//     symbol: string;
//     priceUpdate: PricingData | null;
// }

// export function useRealtimeTicker(symbol: string) {
//     const wsTicker = WSTicker.getController()
    
//     const [_symbl, setSymbl] = useState<SymbolState>({
//         symbol: symbol,
//         priceUpdate: null
//     })

//     useEffect(() => {
//         let id = wsTicker.stream(_symbl.symbol, (data) => setSymbl(state => ({
//             priceUpdate: data,
//             symbol: _symbl.symbol
//         })))

//         return () => wsTicker.clear(id)
//     }, [])

//     return _symbl.priceUpdate
// }