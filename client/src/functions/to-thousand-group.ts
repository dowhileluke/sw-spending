const EXPONENT_LABEL: Record<number, string> = {
	0: '',
	1: 'K',
	2: 'M',
	3: 'B',
	4: 'T',
}

/** finds the highest relavant thousands grouping (e.g. millions) and returns the formatted value */
export function toThousandGroup(n: number) {
	let exponent = 0

	while (n / (1000 ** (exponent + 1)) >= 1 && exponent < 4) {
		exponent++
	}

  const base = n / (1000 ** exponent)
  
  return base.toFixed(1) + EXPONENT_LABEL[exponent]
}
