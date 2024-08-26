import { BarDatum } from '@nivo/bar'

export interface IStarship {
	url: string;
	name: string;
	cost_in_credits: string;

	/** a list of filmUrls */
	films: string[];
}

export type FilmItem = {
	filmId: number;
	filmNumeral: string;
}

export type CostBreakdown = {
	costs: BarDatum[];
	shipNames: string[];
}
