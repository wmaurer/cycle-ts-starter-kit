declare module NodeEnt {

    interface NodeEntStatic {
        encode(str: string, opts: IEncodeOptions);
        decode(str: string);
    }

    interface IEncodeOptions {
        numeric: boolean;
        named: boolean;
        special: { [index: string]: boolean };
    }

}

declare var NodeEnt: NodeEnt.NodeEntStatic;

declare module "ent" {
    export = NodeEnt;
}
