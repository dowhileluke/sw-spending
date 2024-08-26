import { ChangeEvent } from 'react'

export type LabeledOption<T extends string | number | boolean> = {
	label: string;
	value: T;
}

export type SelectProps<T extends string | number | boolean> = {
	value: T;
	options: Array<LabeledOption<T>>;
	onChange: (value: T) => void;
}

export function Select<T extends string | number | boolean>({ value, options, onChange }: SelectProps<T>) {
	function handleChange(e: ChangeEvent<HTMLSelectElement>) {
		const strValue = e.target.value
		const optionMatch = options.find(opt => strValue === opt.value.toString())

		if (optionMatch) {
			onChange(optionMatch.value)
		}
	}

	return (
		<select value={value.toString()} onChange={handleChange}>
			{options.map(opt => {
				const strValue = opt.value.toString()

				return (
					<option key={strValue} value={strValue}>
						{opt.label}
					</option>
				)
			})}
		</select>
	)
}
