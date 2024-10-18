import type { Props } from "./index.js";
interface LiveProps {
    endpoints: string[];
}
export default function live(props: LiveProps, superProps: Props): Promise<void>;
export {};
