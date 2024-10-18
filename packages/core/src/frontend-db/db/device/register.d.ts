import type { Props as SuperProps } from "../index.js";
interface RegisterProps {
}
export declare function register(props: RegisterProps, superProps: SuperProps): Promise<{
    device: {
        userId: string;
        deviceId: string;
        isActive: boolean;
    } | {
        userId: string;
        deviceId: string;
        isActive: boolean;
    };
    pubsub: {
        token: string;
        endpoints: string[];
    } | {
        token: string;
        endpoints: string[];
    };
}>;
export {};
