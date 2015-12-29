function getPathname(ev: Cycle.DOM.DOMEvent) {
    return (ev.target as HTMLAnchorElement).pathname;
}

export {
    getPathname
}
