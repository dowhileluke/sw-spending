import { toThousandGroup } from './to-thousand-group'

describe('thousands group fn', () => {
	it('condenses to millions', () => {
		expect(toThousandGroup(1_234_567)).toEqual('1.2M')
	})

	it('handles values <1 thousand', () => {
		expect(toThousandGroup(12)).toEqual('12.0')
	})

	it('tops out at values in the trillions', () => {
		expect(toThousandGroup(1_234_567_890_123_456)).toEqual('1234.6T')
	})

	// it('works with negative numbers', () => {
	// 	expect(toThousandGroup(-123_456)).toEqual('-123.5K')
	// })
})
