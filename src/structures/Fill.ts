import {DrawAPIUtils} from "../DrawAPIUtils";
import Fill = structures.Fill;
import LinerGradient = structures.LinerGradient;
import {structures} from "../DrawAPI";
import RadialGradient = structures.RadialGradient;
import {LinerGradientFactory} from "./LinerGradient";
import {RadialGradientFactory} from "./RadialGradient";

const EMPTY: any = {};
class FillImpl implements Fill {

	color: number;
	linerGradient: LinerGradient | null;
	radialGradient: RadialGradient | null;

	constructor(
		color: number,
		linerGradient: LinerGradient | null,
		radialGradient: RadialGradient | null
	) {
		this.color = color;
		this.linerGradient = linerGradient;
		this.radialGradient = radialGradient;
	}

	toJSON(): Partial<Fill> {

		const result: Partial<FillImpl> = {};
		if (this.color !== 0x00000000) {
			result.color = this.color;
		}
		if (this.linerGradient !== null) {
			result.linerGradient = this.linerGradient;
		}
		if (this.radialGradient !== null) {
			result.radialGradient = this.radialGradient;
		}
		return result;
	}
}

export class FillFactoryStatic {
	createInstance(
		color?: number | null,
		linerGradient?: LinerGradient | null,
		radialGradient?: RadialGradient | null
	): Fill {
		return new FillImpl(
			DrawAPIUtils.complementNumber(color, 0x00000000),
			DrawAPIUtils.complement(linerGradient, null),
			DrawAPIUtils.complement(radialGradient, null)
		);
	}

	fromJSON(json1?: any | null): Fill {
		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		return this.createInstance(
			json.color,
			DrawAPIUtils.isNull(json.linerGradient) ? null : LinerGradientFactory.fromJSON(json.linerGradient),
			DrawAPIUtils.isNull(json.radialGradient) ? null : RadialGradientFactory.fromJSON(json.radialGradient)
		);
	}
}

export const FillFactory: FillFactoryStatic = new FillFactoryStatic();
export default FillFactory;