import express = require('express');
import path = require('path');

const serialize = require('serialize-javascript');
import { run } from '@cycle/core';
import { html, head, title, body, div, script, makeHTMLDriver } from '@cycle/dom';
import { makeServerHistoryDriver } from '@cycle/history';
import compression = require('compression');
import { Observable } from 'rx';

import { MainFn } from './components/main';

const server = express();
server.use(compression())

if (process.env.NODE_ENV === 'production') {
    server.use('/build', express.static(path.join(__dirname, '/build')));
}

server.use('/static', express.static(path.join(__dirname, '/static')));

function prependHTML5Doctype(html) {
    return `<!doctype html>${html}`;
}

function wrapVTreeWithHTMLBoilerplate(vtree) {
    let clientSrc: string;
    if (process.env.NODE_ENV === 'development') {
        const hotLoadPort = process.env.HOT_LOAD_PORT || 8888;
        clientSrc =`http://localhost:${hotLoadPort}/build/client.js`;
    }
    if (process.env.NODE_ENV === 'production') {
        clientSrc = `/build/client.js`;
    }
    return (
        html([
            head([
                title('Cycle TS Starter Kit')
            ]),
            body([
                div('.app-container', [vtree]),
                script({ src: clientSrc, defer: true })
            ])
        ])
    );
}

function wrapAppResultWithBoilerplate(appFn: MainFn) {
    return function wrappedAppFn(sources) {
        const sinks = appFn(sources);
        const wrappedVTree$ = sinks.DOM.map(wrapVTreeWithHTMLBoilerplate);
        return {
            DOM: wrappedVTree$.take(1),
            History: sinks.History.take(1)
        };
    };
}

server.use((req, res, next) => {
    var app = require('./components/main').default;

    if (req.url === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        res.end();
        return;
    }
    console.log(`req: ${req.method} ${req.url}`);

    const wrappedAppFn = wrapAppResultWithBoilerplate(app);
    const { sources } = run(wrappedAppFn, {
        DOM: makeHTMLDriver(),
        History: makeServerHistoryDriver({ pathname: req.url, search: undefined, query: undefined })
    });
    const html$ = sources.DOM
        .map(prependHTML5Doctype);
    html$.subscribe(html => res.send(html));
});

var port = process.env.PORT || 8080;
server.listen(port, 'localhost', err => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(`Listening at http://localhost:${port}`);
});
