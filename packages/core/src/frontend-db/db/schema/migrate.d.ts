import type { Props } from "../index.js";
interface MigrateSchemaProps {
    version: number;
}
export default function migrate(props: MigrateSchemaProps, superProps: Props): Promise<void>;
export {};
