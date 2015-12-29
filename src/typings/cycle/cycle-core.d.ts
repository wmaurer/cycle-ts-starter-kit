declare module Cycle.Core {
    interface CycleCoreStatic {
        run: any;
        Rx: any;
    }
}

declare var CycleCore: Cycle.Core.CycleCoreStatic;

declare module "@cycle/core" {
    export = CycleCore;
}
