import { run } from '@cycle/core';
import { a, div, p, span } from '@cycle/dom';
import { filterLinks } from '@cycle/history';
import { Observable } from 'rx';
import switchPath = require('switch-path');
import { getPathname } from '../../utils';

interface MainSources { DOM: Cycle.DOM.DOMDriver; History: Cycle.History.HistoryDriver; }
interface MainSinks { DOM: Observable<Object>; History: Cycle.History.HistorySink; }
interface MainState { pageNumber: number; }

function intent(DOM: Cycle.DOM.DOMDriver): Observable<string> {
    return Observable.merge(
        DOM.select('.prev').events('click').filter(filterLinks).map(getPathname),
        DOM.select('.next').events('click').filter(filterLinks).map(getPathname)
    );
}

function view(model$: Observable<MainState>): Observable<Object> {
    return model$
        .map(({ pageNumber }) =>
            span([
                p(`Page ${pageNumber}`),
                div([
                    a('.prev', { href: `/${pageNumber - 1}`, style: { display: pageNumber <= 1 ? 'none' : 'inline'} }, 'prev'),
                    span(' '),
                    a('.next', { href: `/${pageNumber + 1}` }, 'next')
                ])
            ])
        );
}

function model(historyDriver: Cycle.History.HistoryDriver): Observable<MainState> {
    const routes = {
        '/:pageNumber': pageNumber => pageNumber
    };

    return historyDriver
        .map(x => x.pathname)
        .map(x => ({ pageNumber: +switchPath(x, routes).value }))
        .map(x => ({ pageNumber: isNaN(x.pageNumber) || x.pageNumber < 1 ? 1 : x.pageNumber }))
}

interface MainFn {
    (sources: MainSources): MainSinks
}

function _main(sources: MainSources): MainSinks {

    const actions$ = intent(sources.DOM);
    const state$ = model(sources.History);
    const view$ = view(state$);

    return {
        DOM: view$,
        History: actions$
    }
}

var main: MainFn = _main;

export {
    main as default,
    MainFn
}
