import {structures} from "../DrawAPI";
import {DrawAPIUtils} from "../DrawAPIUtils";
import Transform = structures.Transform;

class TransformImpl implements Transform {

	a: number;
	b: number;
	c: number;
	d: number;
	x: number;
	y: number;
	isDefault: boolean;

	constructor(
		a: number,
		b: number,
		c: number,
		d: number,
		x: number,
		y: number,
		isDefault: boolean
	) {
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.x = x;
		this.y = y;
		this.isDefault = isDefault;
	}

	toJSON(): any {

		const result: number[] = [];
		if (this.isDefault) {
			return result;
		}
		const writeD = this.d !== 1;
		const writeC = this.c !== 0 || writeD;
		const writeB = this.b !== 0 || writeC;
		const writeA = this.a !== 1 || writeB;
		const writeY = this.y !== 0 || writeA;
		const writeX = this.x !== 0 || writeY;

		if (!writeX) {
			return result;
		}
		result.push(this.x);
		if (!writeY) {
			return result;
		}
		result.push(this.y);
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
		return result;
	}
}

export class TransformFactoryStatic {

	createInstance(
		x?: number | null,
		y?: number | null,
		a?: number | null,
		b?: number | null,
		c?: number | null,
		d?: number | null
	): Transform {

		const a1 = DrawAPIUtils.complementNumber(a, 1);
		const b1 = DrawAPIUtils.complementNumber(b, 0);
		const c1 = DrawAPIUtils.complementNumber(c, 0);
		const d1 = DrawAPIUtils.complementNumber(d, 1);
		const x1 = DrawAPIUtils.complementNumber(x, 0);
		const y1 = DrawAPIUtils.complementNumber(y, 0);

		return new TransformImpl(
			a1,
			b1,
			c1,
			d1,
			x1,
			y1,
			a1 === 1 && b1 === 0 && c1 === 0 && d1 === 1 && x1 === 0 && y1 === 0
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