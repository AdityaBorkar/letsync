const schema = { migrate, validate };
export default schema;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function migrate(schema: any) {}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
async function validate(schema: any) {}
