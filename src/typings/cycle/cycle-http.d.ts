/// <reference path="../superagent/superagent.d.ts" />

declare module Cycle.HTTP {

    interface CycleHTTPStatic {
        makeHTTPDriver(options?: { eager: boolean }): HTTPDriver;
    }

    interface HTTPDriver {
        (request$: Request$): Responses$$;
    }

    type Request$ = Rx.Observable<Request> | Rx.Observable<string>;

    interface Response$ extends Rx.Observable<SuperAgent.Response> {
        request: Request
    }

    type Responses$$ = Rx.Observable<Response$>;

    interface Request {
        url: string;
        method?: string;
        query?: Object;
        send?: Object;
        headers?: any;
        accept?: string;
        type?: string;
        user?: string;
        password?: string;
        field?: Object;
        array?: any[];
        withCredentials?: boolean;
        redirects?: number;
        eager?: boolean;
    }

}

declare var CycleHTTP: Cycle.HTTP.CycleHTTPStatic;

declare module "@cycle/http" {
    export = CycleHTTP;
}
