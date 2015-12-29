/// <reference path="../history/history.d.ts" />

import RacktHistory = History;

declare module Cycle.History {

    interface CycleHistoryStatic {
        makeHistoryDriver(options: RacktHistory.HistoryOptions): HistoryDriver;
        makeServerHistoryDriver(startingLocation: RacktHistory.Location): HistoryDriver;
        filterLinks(event: Event): boolean;
    }

    type HistoryDriver = Rx.Observable<RacktHistory.Location> & RacktHistory.History;

    type HistorySink = Rx.Observable<string> | Rx.Observable<HistoryUrl>;

    interface HistoryUrl {
        url: string;
        state: Object;
        query: Object;
    }

}

declare var CycleHistory: Cycle.History.CycleHistoryStatic;

declare module "@cycle/history" {
    export = CycleHistory;
}
