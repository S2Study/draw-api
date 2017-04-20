import {DrawAPIUtils} from "../DrawAPIUtils";
import BezierCurveTo = structures.BezierCurveTo;
import {structures} from "../DrawAPI";
import PathItem = structures.PathItem;
class BezierCurveToImpl implements PathItem, BezierCurveTo {

	get type(): number {
		return 4 | 0;
	}

	cpx1: number;
	cpy1: number;
	cpx2: number;
	cpy2: number;
	x: number;
	y: number;

	constructor(
		cpx1: number,
		cpy1: number,
		cpx2: number,
		cpy2: number,
		x: number,
		y: number
	) {
		this.cpx1 = cpx1 | 0;
		this.cpy1 = cpy1 | 0;
		this.cpx2 = cpx2 | 0;
		this.cpy2 = cpy2 | 0;
		this.x = x | 0;
		this.y = y | 0;
	}

	pushToArray(array: number[], current: structures.PointInfo): void {
		array.push(
			this.cpx1 - current.x,
			this.cpy1 - current.y,
			this.cpx2 - this.cpx1,
			this.cpy2 - this.cpy1,
			this.x - this.cpx2,
			this.y - this.cpy2,
		);
		current.x = this.x;
		current.y = this.y;
	}
}

export class BezierCurveToFactoryStatic {
	createInstance(
		cp1x?: number | null,
		cp1y?: number | null,
		cp2x?: number | null,
		cp2y?: number | null,
		x?: number | null,
		y?: number | null
	): BezierCurveTo {

		return new BezierCurveToImpl(
			DrawAPIUtils.complementNumber(cp1x),
			DrawAPIUtils.complementNumber(cp1y),
			DrawAPIUtils.complementNumber(cp2x),
			DrawAPIUtils.complementNumber(cp2y),
			DrawAPIUtils.complementNumber(x),
			DrawAPIUtils.complementNumber(y)
		);

	}
}

export const BezierCurveToFactory: BezierCurveToFactoryStatic = new BezierCurveToFactoryStatic();
export default BezierCurveToFactory;