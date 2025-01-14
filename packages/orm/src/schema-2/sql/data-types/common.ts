export interface FieldOptions<RT> {
	onCreate?: () => RT;
	onUpdate?: () => RT;
}
