declare module History {

    interface HistoryStatic {
        createLocation(location: string, state: Object): Location;
    }

    type Hash = string;

    interface History {
        listenBefore: (hook: TransitionHook) => Function;
        listen: (listener: LocationListener) => Function;
        transitionTo: (location: Location) => void;
        push: (location: LocationDescriptor) => void;
        pushState: (location: LocationDescriptor) => void;
        replace: (location: LocationDescriptor) => void;
        go: (n: number) => void;
        goBack: () => void;
        goForward: () => void;
        createKey: () => LocationKey;
        createPath: (location: LocationDescriptor) => Path;
        createHref: (location: LocationDescriptor) => Href;
    }

    type HistoryOptions = Object;

    type Href = string;

    interface Location {
        pathname: Pathname;
        search: Search;
        query: Query;
        state?: LocationState;
        /**
         * An action describes the type of change to a URL. Possible values are:
         * - PUSH: indicates a new item was added to the history
         * - REPLACE: indicates the current item in history was altered
         * - POP: indicates there is a new current item, i.e. the "current pointer" changed
         */
        action?: string;
        key?: string;
    }

    interface LocationDescriptorObject {
        pathname: Pathname;
        search: Search;
        query: Query;
        state: LocationState;
    }

    type LocationDescriptor = LocationDescriptorObject | string;

    type LocationKey = string;

    interface LocationListener {
        (location: Location): void
    }

    type LocationState = Object;

    type Path = Pathname | Search | Hash;

    type Pathname = string;

    type Query = Object;

    type Search = Object;

    interface TransitionHook {
        (location: Location, callback: Function): any
    }
}

declare var _History: History.HistoryStatic;

declare module 'history' {
    export = _History;
}
