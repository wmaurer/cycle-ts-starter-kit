declare module SuperAgent {

    interface Response extends NodeJS.ReadableStream {
        text: string;
        body: any;
        files: any;
        header: any;
        type: string;
        charset: string;
        status: number;
        statusType: number;
        info: boolean;
        ok: boolean;
        redirect: boolean;
        clientError: boolean;
        serverError: boolean;
        error: Error;
        accepted: boolean;
        noContent: boolean;
        badRequest: boolean;
        unauthorized: boolean;
        notAcceptable: boolean;
        notFound: boolean;
        forbidden: boolean;
        get(header: string): string;
    }

}
