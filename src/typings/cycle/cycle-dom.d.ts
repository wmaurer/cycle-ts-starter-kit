declare module Cycle.DOM {

    interface DOMEvent extends Event { }

    interface DOMDriver {
        select(selector: string): {
            observable: Rx.Observable<any>;
            events(eventType: string): Rx.Observable<DOMEvent>;
        }
    }

    interface CycleDOMStatic extends HyperscriptHelpers.HyperscriptHelpers {
        makeDOMDriver(container: string): DOMDriver;
        makeHTMLDriver(): any;
        h(...params): Object;
    }

}

declare var CycleDOM: Cycle.DOM.CycleDOMStatic;

declare module "@cycle/dom" {
    export = CycleDOM;
}
