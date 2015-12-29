import { run } from '@cycle/core'
import { makeDOMDriver } from '@cycle/dom'
import { makeHistoryDriver } from '@cycle/history';
import { Observable } from 'rx';

import app from './components/main';

function clientSideApp(sources) {
    const sinks = app(sources);
    sinks.DOM = sinks.DOM.skip(1);
    return sinks;
}

const drivers = {
    DOM: makeDOMDriver('.app-container'),
    History: makeHistoryDriver({
        hash: false,
        queries: true,
    })
};

run(clientSideApp, drivers);
