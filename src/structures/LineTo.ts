import {DrawAPIUtils} from "../DrawAPIUtils";
import LineTo = structures.LineTo;
import {structures} from "../index";
import PathItem = structures.PathItem;
class LineToImpl implements PathItem, LineTo {

	get type(): number {
		return 3 | 0;
	}

	x: number;
	y: number;

	constructor(
		x: number,
		y: number
	) {
		this.x = x | 0;
		this.y = y | 0;
	}

	pushToArray(array: number[], current: structures.PointInfo): void {
		array.push(
			this.x - current.x,
			this.y - current.y
		);
		current.x = this.x;
		current.y = this.y;
	}
}

export class LineToFactoryStatic {
	createInstance(
		x?: number | null,
		y?: number | null
	): LineTo {
		return new LineToImpl(
			DrawAPIUtils.complementNumber(x),
			DrawAPIUtils.complementNumber(y)
		);
	}
}

export const LineToFactory: LineToFactoryStatic = new LineToFactoryStatic();
export default LineToFactory;