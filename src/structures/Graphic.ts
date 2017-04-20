import {structures} from "../DrawAPI";
import Graphic = structures.Graphic;
import {DrawAPIUtils} from "../DrawAPIUtils";
import {PathItemsFactory, PathItemsUtil} from "./PathItem";
import {FillFactory} from "./Fill";
import {StrokeFactory} from "./Stroke";

const EMPTY: any = {};
class GraphicImpl implements Graphic {

	fill: structures.Fill | null;
	stroke: structures.Stroke | null;
	path: structures.PathItem[];

	constructor(
		fill: structures.Fill | null,
		stroke: structures.Stroke | null,
		path: structures.PathItem[]
	) {
		this.fill = fill;
		this.stroke = stroke;
		this.path = path;
	}

	toJSON(): any {
		const json: any = {};
		if (this.fill !== null ) {
			json.fill = this.fill.toJSON();
		}
		if (this.stroke !== null) {
			json.stroke = this.stroke.toJSON();
		}
		if (this.path.length !== 0) {
			json.path = PathItemsUtil.toArray(this.path);
		}
		return json;
	}
}

export class GraphicFactoryStatic {
	createInstance(
		path?: structures.PathItem[] | null,
		fill?: structures.Fill | null,
		stroke?: structures.Stroke | null
	): Graphic {
		return new GraphicImpl (
			DrawAPIUtils.complement(fill, null),
			DrawAPIUtils.complement(stroke, null),
			DrawAPIUtils.complement(path, [])
		);
	}
	fromJSON(json1?: any | null): Graphic {
		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		return this.createInstance(
			PathItemsFactory.createInstance(json.path),
			DrawAPIUtils.isNull(json.fill) ? null : FillFactory.fromJSON(json.fill),
			DrawAPIUtils.isNull(json.stroke) ? null : StrokeFactory.fromJSON(json.stroke)
		);
	}
}

export const GraphicFactory: GraphicFactoryStatic = new GraphicFactoryStatic();
export default GraphicFactory;