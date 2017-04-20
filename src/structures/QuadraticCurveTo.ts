import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
import QuadraticCurveTo = structures.QuadraticCurveTo;
import PathItem = structures.PathItem;

class QuadraticCurveToImpl implements PathItem, QuadraticCurveTo {

	get type(): number {
		return 2 | 0;
	}

	cpx: number;
	cpy: number;
	x: number;
	y: number;

	constructor(
		cpx: number,
		cpy: number,
		x: number,
		y: number
	) {
		this.cpx = cpx | 0;
		this.cpy = cpy | 0;
		this.x = x | 0;
		this.y = y | 0;
	}

	pushToArray(array: number[], current: structures.PointInfo): void {
		array.push(
			this.cpx - current.x,
			this.cpy - current.y,
			this.x - this.cpx,
			this.y - this.cpy,
		);
		current.x = this.x;
		current.y = this.y;
	}
}

export class QuadraticCurveToFactoryStatic {
	createInstance(
		cpx?: number | null,
		cpy?: number | null,
		x?: number | null,
		y?: number | null
	): QuadraticCurveTo {
		return new QuadraticCurveToImpl(
			DrawAPIUtils.complementNumber(cpx),
			DrawAPIUtils.complementNumber(cpy),
			DrawAPIUtils.complementNumber(x),
			DrawAPIUtils.complementNumber(y)
		);
	}
}

export const QuadraticCurveToFactory: QuadraticCurveToFactoryStatic = new QuadraticCurveToFactoryStatic();
export default QuadraticCurveToFactory;