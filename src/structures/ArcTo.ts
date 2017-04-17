import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../index";
import ArcTo = structures.ArcTo;
import PathItem = structures.PathItem;
import PointInfo = structures.PointInfo;

class ArcToImpl implements PathItem, ArcTo {

	get type(): number {
		return 1 | 0;
	}

	x1: number;
	y1: number;
	x2: number;
	y2: number;
	radius: number;

	constructor(
		x1: number,
		y1: number,
		x2: number,
		y2: number,
		radius: number
	) {
		this.x1 = x1 | 0;
		this.y1 = y1 | 0;
		this.x2 = x2 | 0;
		this.y2 = y2 | 0;
		this.radius = radius;
	}

	pushToArray(array: number[], currentPoint: PointInfo): void {
		array.push(
			this.x1 - currentPoint.x,
			this.y1 - currentPoint.y,
			this.x2 - this.x1,
			this.y2 - this.y1,
			this.radius
		);
		currentPoint.x = this.x2;
		currentPoint.y = this.y2;
	}
}

export class ArcToFactoryStatic {
	createInstance(
		x1?: number | null,
		y1?: number | null,
		x2?: number | null,
		y2?: number | null,
		radius?: number | null
	): ArcTo {
		return new ArcToImpl(
			DrawAPIUtils.complementNumber(x1),
			DrawAPIUtils.complementNumber(y1),
			DrawAPIUtils.complementNumber(x2),
			DrawAPIUtils.complementNumber(y2),
			DrawAPIUtils.complementNumber(radius),
		);
	}
}

export const ArcToFactory: ArcToFactoryStatic = new ArcToFactoryStatic();
export default ArcToFactory;