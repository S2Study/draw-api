import {structures} from "../index";
import {DrawAPIUtils} from "../DrawAPIUtils";
import Transform = structures.Transform;

class TransformImpl implements Transform {
	a: number;
	b: number;
	c: number;
	d: number;
	x: number;
	y: number;

	constructor(
		a: number,
		b: number,
		c: number,
		d: number,
		x: number,
		y: number
	) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.x = x;
		this.y = y;
	}

	toJSON(): any {

		const result: number[] = [];
		const writeY = this.y !== 0;
		const writeX = this.x !== 0 || writeY;
		const writeD = this.d !== 1 || writeX;
		const writeC = this.c !== 0 || writeD;
		const writeB = this.b !== 0 || writeC;
		const writeA = this.a !== 1 || writeB;

		if (!writeA) {
			return result;
		}
		result.push(this.a);
		if (!writeB) {
			return result;
		}
		result.push(this.b);
		if (!writeC) {
			return result;
		}
		result.push(this.c);
		if (!writeD) {
			return result;
		}
		result.push(this.d);
		if (!writeX) {
			return result;
		}
		result.push(this.x);
		if (!writeY) {
			return result;
		}
		result.push(this.y);
		return result;
	}
}

export class TransformFactoryStatic {

	createInstance(
		a?: number | null,
		b?: number | null,
		c?: number | null,
		d?: number | null,
		x?: number | null,
		y?: number | null
	): Transform {
		return new TransformImpl(
			DrawAPIUtils.complementNumber(a, 1),
			DrawAPIUtils.complementNumber(b, 0),
			DrawAPIUtils.complementNumber(c, 0),
			DrawAPIUtils.complementNumber(d, 1),
			DrawAPIUtils.complementNumber(x, 0),
			DrawAPIUtils.complementNumber(y, 0)
		);
	}

	fromJSON(json1?: any | null): Transform {
		const json = DrawAPIUtils.complement(json1, []);
		return this.createInstance(
			json[0],
			json[1],
			json[2],
			json[3],
			json[4],
			json[5]
		);
	}
}
export const TransformFactory: TransformFactoryStatic = new TransformFactoryStatic();
export const TRANSFORM_DEFAULT: Transform = TransformFactory.createInstance();
export default TransformFactory;