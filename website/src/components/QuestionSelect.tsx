export default function QuestionSelect({
	title,
	options,
	suggest,
}: {
	title: string;
	options: { name: string; value: string }[];
	suggest: string;
}) {
	return (
		<div class="mt-16">
			<h3 class="text-2xl font-bold">{title}</h3>

			<div class="grid grid-cols-4 py-4 gap-4">
				{options.map((option) => (
					<div
						key={option.value}
						class="bg-neutral-800 hover:bg-neutral-700 rounded-md py-2 px-8 "
					>
						{option.name}
					</div>
				))}
			</div>

			<button class="underline underline-offset-4 text-base text-gray-500">
				Suggest a {suggest}
			</button>
		</div>
	);
}
