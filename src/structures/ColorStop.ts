import ColorStop = structures.ColorStop;
import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
class ColorStopImpl implements ColorStop {

	offset: number;
	color: number;

	constructor(
		offset: number,
		color: number
	) {
		this.offset = offset;
		this.color = color;
	}

	toJSON(): Partial<ColorStop> {
		const result: Partial<ColorStopImpl> = {};
		if (this.color !== 0x00000000) {
			result.color = this.color;
		}
		if (this.offset !== 0) {
			result.offset = this.offset;
		}
		return result;
	}
}

export class ColorStopFactoryStatic {

	createInstance(
		offset?: number | null,
		color?: number | null
	): ColorStop {
		return new ColorStopImpl(
			DrawAPIUtils.complementNumber(offset),
			DrawAPIUtils.complementNumber(color, 0x00000000)
		);
	}

	fromJSON(json1?: any | null): ColorStop {

		const json: any = DrawAPIUtils.complement(json1, {});
		return this.createInstance(
			json.offset,
			json.color
		);
	}
}
export const ColorStopFactory: ColorStopFactoryStatic = new ColorStopFactoryStatic();
export default ColorStopFactory;