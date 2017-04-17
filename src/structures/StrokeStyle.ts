import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../index";
import StrokeStyle = structures.StrokeStyle;

const EMPTY: any = {};

export class StrokeStyleImpl implements StrokeStyle {

	thickness: number;
	caps: number;
	joints: number;
	miterLimit: number;
	ignoreScale: number;

	constructor(
		thickness: number,
		caps: number,
		joints: number,
		miterLimit: number,
		ignoreScale: number
	) {
		this.thickness = thickness;
		this.caps = caps | 0;
		this.joints = joints | 0;
		this.miterLimit = miterLimit;
		this.ignoreScale = ignoreScale | 0;
	}

	toJSON(): Partial<StrokeStyle> {
		const result: Partial<StrokeStyleImpl> = {};
		if (this.thickness !== 1) {
			result.thickness = this.thickness;
		}
		if (this.caps !== 1) {
			result.caps = this.caps;
		}
		if (this.joints !== 1) {
			result.joints = this.joints;
		}
		if (this.miterLimit !== 10.0) {
			result.miterLimit = this.miterLimit;
		}
		if (this.ignoreScale !== 0) {
			result.ignoreScale = this.ignoreScale;
		}
		return result;
	}
}

export class StrokeStyleFactoryStatic {

	createInstance(
		thickness?: number | null,
		caps?: number | null,
		joints?: number | null,
		miterLimit?: number | null,
		ignoreScale?: number | null
	): StrokeStyle {
		return new StrokeStyleImpl(
			DrawAPIUtils.complementNumber(thickness, 1),
			DrawAPIUtils.complementNumber(caps, 1),
			DrawAPIUtils.complementNumber(joints, 1),
			DrawAPIUtils.complementNumber(miterLimit, 10.0),
			DrawAPIUtils.complementNumber(ignoreScale, 0)
		);
	}

	fromJSON(json1?: any | null): StrokeStyle {

		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		return this.createInstance(
			json.thickness,
			json.caps,
			json.joints,
			json.miterLimit,
			json.ignoreScale
		);
	}
}

export const StrokeStyleFactory: StrokeStyleFactoryStatic = new StrokeStyleFactoryStatic();
export default StrokeStyleFactory;