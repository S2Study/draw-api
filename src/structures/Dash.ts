import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
import Dash = structures.Dash;

const EMPTY: any = {};
class DashImpl implements Dash {

	segments: number[];
	offset: number;

	constructor(
		segments: number[],
		offset: number
	) {
		this.segments = segments;
		this.offset = offset;
	}

	toJSON(): Partial<Dash> {
		const result: Partial<DashImpl> = {};
		if (this.offset !== 0 ) {
			result.offset = this.offset;
		}
		if (this.segments.length !== 0) {
			result.segments = this.segments;
		}
		return result;
	}
}

export class DashFactoryStatic {
	createInstance(
		segments?: number[] | null,
		offset?: number | null
	): Dash {
		return new DashImpl(
			DrawAPIUtils.complement(segments, []),
			DrawAPIUtils.complementNumber(offset, 0)
		);
	}

	fromJSON(json1?: any | null): Dash {
		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		return this.createInstance(
			json.segments,
			json.offset
		);
	}
}
export const DashFactory: DashFactoryStatic = new DashFactoryStatic();
export default DashFactory;
