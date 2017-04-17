import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../index";
import ColorStop = structures.ColorStop;
import RadialGradient = structures.RadialGradient;
import {ColorStopFactory} from "./ColorStop";

const EMPTY: any = {};
class RadialGradientImpl implements RadialGradient {

	x0: number;
	y0: number;
	r0: number;
	x1: number;
	y1: number;
	r1: number;
	colorStops: ColorStop[];

	constructor(
		x0: number,
		y0: number,
		r0: number,
		x1: number,
		y1: number,
		r1: number,
		colorStops: ColorStop[]
	) {
		this.x0 = x0 | 0;
		this.y0 = y0 | 0;
		this.r0 = r0;
		this.x1 = x1 | 0;
		this.y1 = y1 | 0;
		this.r1 = r1;
		this.colorStops = colorStops;
	}

	toJSON(): Partial<RadialGradient> {
		const result: Partial<RadialGradientImpl> = {};
		if (this.x0 !== 0) {
			result.x0 = this.x0;
		}
		if (this.y0 !== 0) {
			result.y0 = this.y0;
		}
		if (this.r0 !== 0) {
			result.r0 = this.r0;
		}
		if (this.x1 !== 0) {
			result.x1 = this.x1;
		}
		if (this.y1 !== 0) {
			result.y1 = this.y1;
		}
		if (this.r1 !== 0) {
			result.r1 = this.r1;
		}
		if (this.colorStops.length !== 0) {
			const stops = [];
			for (let stop of this.colorStops) {
				stops.push(stop.toJSON());
			}
			result.colorStops = stops;
		}
		return result;
	}
}

export class RadialGradientFactoryStatic {
	createInstance(
		x0?: number | null,
		y0?: number | null,
		r0?: number | null,
		x1?: number | null,
		y1?: number | null,
		r1?: number | null,
		colorStops?: ColorStop[] | null
	): RadialGradient {
		return new RadialGradientImpl (
			DrawAPIUtils.complementNumber(x0),
			DrawAPIUtils.complementNumber(y0),
			DrawAPIUtils.complementNumber(r0),
			DrawAPIUtils.complementNumber(x1),
			DrawAPIUtils.complementNumber(y1),
			DrawAPIUtils.complementNumber(r1),
			DrawAPIUtils.complement(colorStops, [])
		);
	}

	fromJSON(json1?: any | null): RadialGradient {

		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		const stops = [];
		if (!DrawAPIUtils.isNull(json.colorStops)) {
			for (let stop of json.colorStops) {
				stops.push(ColorStopFactory.fromJSON(stop));
			}
		}

		return this.createInstance(
			json.x0,
			json.y0,
			json.r0,
			json.x1,
			json.y1,
			json.r1,
			stops
		);
	}
}

export const RadialGradientFactory: RadialGradientFactoryStatic = new RadialGradientFactoryStatic();
export default RadialGradientFactory;