import {DrawAPIUtils} from "../DrawAPIUtils";
import {ArcToFactory} from "./ArcTo";
import {MoveToFactory} from "./MoveTo";
import {QuadraticCurveToFactory} from "./QuadraticCurveTo";
import {LineToFactory} from "./LineTo";
import {structures} from "../index";
import PathItem = structures.PathItem;
import {BezierCurveToFactory} from "./BezierCurveTo";
import PointInfo = structures.PointInfo;

export class PointInfoImpl implements PointInfo {
	type: number;
	x: number;
	y: number;
	constructor() {
		this.type = 0 | 0;
		this.x = 0 | 0;
		this.y = 0 | 0;
	}
}

export class PathItemsFactoryStatic {

	createInstance(
		array?: number[][] | null
	): PathItem[] {

		const resultTo: PathItem[] = [];
		if (DrawAPIUtils.isNull(array)) {
			return resultTo;
		}

		const current = new PointInfoImpl();
		for (let pathList of array!) {
			if (DrawAPIUtils.isNull(pathList)) {
				continue;
			}

			switch (pathList[0]) {

				case 0:
					this.createMoveTo(resultTo, pathList, current);
					break;

				case 1:
					this.createArcTo(resultTo, pathList, current);
					break;

				case 2:
					this.createQuadraticCurveTo(resultTo, pathList, current);
					break;

				case 3:
					this.createLineTo(resultTo, pathList, current);
					break;

				case 4:
					this.createBezierCurveTo(resultTo, pathList, current);
					break;
			}
		}
		return resultTo;
	}

	private createMoveTo(
		resultTo: PathItem[],
		array: number[],
		current: PointInfo
	): void {

		let i = 1 | 0;
		let len = ( array.length - 1 ) | 0;

		let x = current.x;
		let y = current.y;

		while (i < len) {

			x = ( x + array[i] ) | 0;
			y = ( y + array[i + 1]) | 0;

			resultTo.push(MoveToFactory.createInstance(
				x,
				y
			));
			i = ( i + 2 ) | 0;
		}

		current.x = x;
		current.y = y;
	}

	private createArcTo(
		resultTo: PathItem[],
		array: number[],
		current: PointInfo
	): void {

		let i = 1 | 0;
		let len = ( array.length - 4 ) | 0;

		let x2 = current.x;
		let y2 = current.y;
		let x1 = 0 | 0;
		let y1 = 0 | 0;

		while (i < len ) {

			x1 = ( x2 + array[i] ) | 0;
			y1 = ( y2 + array[i + 1]) | 0;

			x2 = ( x1 + array[i + 2] ) | 0;
			y2 = ( y1 + array[i + 3] ) | 0;

			resultTo.push(ArcToFactory.createInstance(
				x1,
				y1,
				x2,
				y2,
				array[i + 4]
			));
			i = ( i + 5 ) | 0;
		}

		current.x = x2;
		current.y = y2;
	}

	private createQuadraticCurveTo(
		resultTo: PathItem[],
		array: number[],
		current: PointInfo
	): void {

		let i = 1 | 0;
		let len = (array.length - 3) | 0;

		let x = current.x;
		let y = current.y;
		let cp1x = 0 | 0;
		let cp1y = 0 | 0;

		while (i < len) {

			cp1x = ( x + array[i] ) | 0;
			cp1y = ( y + array[i + 1]) | 0;

			x = ( cp1x + array[i + 2] ) | 0;
			y = ( cp1y + array[i + 3] ) | 0;

			resultTo.push(QuadraticCurveToFactory.createInstance(
				cp1x,
				cp1y,
				x,
				y
			));
			i = ( i + 4 ) | 0;
		}
		current.x = x;
		current.y = y;
	}

	private createLineTo(
		resultTo: PathItem[],
		array: number[],
		current: PointInfo
	): void {

		let i = 1 | 0;
		let len = (array.length - 1) | 0;

		let x = current.x;
		let y = current.y;

		while ( i < len) {

			x = ( x + array[i] ) | 0;
			y = ( y + array[i + 1]) | 0;

			resultTo.push(LineToFactory.createInstance(
				x,
				y
			));
			i = (i + 2) | 0;
		}

		current.x = x;
		current.y = y;
	}

	private createBezierCurveTo(
		resultTo: PathItem[],
		array: number[],
		current: PointInfo
	): void {

		let i = 1 | 0;
		let len = (array.length - 5) | 0;

		let x = current.x;
		let y = current.y;
		let cp1x = 0 | 0;
		let cp1y = 0 | 0;
		let cp2x = 0 | 0;
		let cp2y = 0 | 0;

		while ( i < len) {

			cp1x = ( x + array[i] ) | 0;
			cp1y = ( y + array[i + 1]) | 0;

			cp2x = ( cp1x + array[i + 2] ) | 0;
			cp2y = ( cp1y + array[i + 3] ) | 0;

			x = ( cp2x + array[i + 4] ) | 0;
			y = ( cp2y + array[i + 5] ) | 0;

			resultTo.push(BezierCurveToFactory.createInstance(
				cp1x,
				cp1y,
				cp2x,
				cp2y,
				x,
				y
			));
			i = (i + 6) | 0;
		}

		current.x = x;
		current.y = y;
	}
}
export const PathItemsFactory: PathItemsFactoryStatic = new PathItemsFactoryStatic();
export default PathItemsFactory;


export class PathItemsUtil {

	private static getArray(array: number[][], type: number, current: PointInfo): number[] {

		const len = array.length | 0;
		if (current.type === type && len !== 0 ) {
			return array[len - 1];
		}

		const result: number[] = [];
		result[0] = type;
		current.type = type;
		array.push(result);
		return result;
	}

	static toArray(items?: PathItem[] | null): number[][] {
		const current = new PointInfoImpl();
		const resultTo: number[][] = [];
		if (DrawAPIUtils.isNull(items)) {
			return [];
		}
		for (let item of items!) {
			const array = PathItemsUtil.getArray(resultTo, item.type, current);
			item.pushToArray(array, current);
		}
		return resultTo;
	}
}