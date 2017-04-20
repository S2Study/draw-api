import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
import MoveTo = structures.MoveTo;
import PathItem = structures.PathItem;

class MoveToImpl implements PathItem, MoveTo {

	get type(): number {
		return 0 | 0;
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

export class MoveToFactoryStatic {

	createInstance(
		x?: number | null,
		y?: number | null
	): MoveTo {
		return new MoveToImpl(
			DrawAPIUtils.complementNumber(x),
			DrawAPIUtils.complementNumber(y)
		);
	}
}

export const MoveToFactory: MoveToFactoryStatic = new MoveToFactoryStatic();
export default MoveToFactory;