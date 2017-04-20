import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
import {ColorStopFactory} from "./ColorStop";
import LinerGradient = structures.LinerGradient;
import ColorStop = structures.ColorStop;

const EMPTY: any = {};

export class LinerGradientImpl implements LinerGradient {

	x0: number;
	y0: number;
	x1: number;
	y1: number;
	colorStops: ColorStop[];

	constructor(
		x0: number,
		y0: number,
		x1: number,
		y1: number,
		colorStops: ColorStop[]
	) {
		this.x0 = x0 | 0;
		this.y0 = y0 | 0;
		this.x1 = x1 | 0;
		this.y1 = y1 | 0;
		this.colorStops = colorStops;
	}

	toJSON(): Partial<LinerGradient> {
		const result: Partial<LinerGradientImpl> = {};
		if (this.x0 !== 0) {
			result.x0 = this.x0;
		}
		if (this.y0 !== 0) {
			result.y0 = this.y0;
		}
		if (this.x1 !== 0) {
			result.x1 = this.x1;
		}
		if (this.y1 !== 0) {
			result.y1 = this.y1;
		}
		if (this.colorStops.length !== 0) {
			result.colorStops = [];
			for (let stop of this.colorStops) {
				result.colorStops.push(stop.toJSON());
			}
		}
		return result;
	}
}

export class LinerGradientFactoryStatic {

	createInstance(
		x0?: number | null,
		y0?: number | null,
		x1?: number | null,
		y1?: number | null,
		colorStops?: ColorStop[] | null
	): LinerGradient {
		return new LinerGradientImpl(
			DrawAPIUtils.complementNumber(x0),
			DrawAPIUtils.complementNumber(y0),
			DrawAPIUtils.complementNumber(x1),
			DrawAPIUtils.complementNumber(y1),
			DrawAPIUtils.complement(colorStops, [])
		);
	}

	fromJSON(json1?: any | null): LinerGradient {

		const stops = [];
		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		if (!DrawAPIUtils.isNull(json.colorStops)) {
			for (let stop of json.colorStops) {
				stops.push(ColorStopFactory.fromJSON(stop));
			}
		}
		return this.createInstance(
			json.x0,
			json.y0,
			json.x1,
			json.y1,
			stops
		);
	}
}

export const LinerGradientFactory: LinerGradientFactoryStatic = new LinerGradientFactoryStatic();
export default LinerGradientFactory;