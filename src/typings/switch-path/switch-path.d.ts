declare module 'switch-path' {
    function switchPath(sourcePath: string, routes: { [index: string]: any }): { path: string; value: any; };
    function switchPath<T>(sourcePath: string, routes: { [index: string]: T }): { path: string; value: T; };
    function switchPath<T>(sourcePath: string, routes: { [index: string]: () => T }): { path: string; value: T; };

    export = switchPath;
}
