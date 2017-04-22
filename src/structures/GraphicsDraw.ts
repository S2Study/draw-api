import {structures} from "../DrawAPI";
import GraphicsDraw = structures.GraphicsDraw;
import {DrawAPIUtils} from "../DrawAPIUtils";
import {TRANSFORM_DEFAULT, TransformFactory} from "./Transform";
import {GraphicFactory} from "./Graphic";
import Graphic = structures.Graphic;

const EMPTY: any = {};
class GraphicsDrawImpl implements GraphicsDraw {

	compositeOperation: number;
	transform: structures.Transform;
	graphics: structures.Graphic[];

	constructor(
		compositeOperation: number,
		transform: structures.Transform,
		graphics: structures.Graphic[]
	) {
		this.compositeOperation = compositeOperation;
		this.transform = transform;
		this.graphics = graphics;
	}

	toJSON(): any {

		const json: any = {};
		if (this.compositeOperation !== 0 ) {
			json.compositeOperation = this.compositeOperation;
		}

		const transform = this.transform;
		if (!transform.isDefault) {
			json.transform = this.transform.toJSON();
		}

		if (this.graphics.length !== 0) {
			const array: any[] = [];
			json.graphics = array;
			for (let graphic of this.graphics) {
				array.push(graphic.toJSON());
			}
		}
		return json;
	}
}

export class GraphicsDrawFactoryStatic {

	createInstance(
		graphics?: structures.Graphic[] | null,
		transform?: structures.Transform | null,
		compositeOperation?: number | null,
	): GraphicsDraw {
		return new GraphicsDrawImpl(
			DrawAPIUtils.complementNumber(compositeOperation),
			DrawAPIUtils.complement(transform, TRANSFORM_DEFAULT),
			( graphics === null || graphics === undefined ) ? [] : graphics
		);
	}

	fromJSON(json1?: any | null): GraphicsDraw {

		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		let graphics: Graphic[] | null = null;
		if (!DrawAPIUtils.isNull(json.graphics)) {
			graphics = [];
			for (let graphic of json.graphics) {
				graphics.push(GraphicFactory.fromJSON(graphic));
			}
		}
		return this.createInstance(
			graphics,
			DrawAPIUtils.isNull(json.transform) ? null : TransformFactory.fromJSON(json.transform),
			json.compositeOperation
		);
	}
}

export const GraphicsDrawFactory: GraphicsDrawFactoryStatic = new GraphicsDrawFactoryStatic();
export default GraphicsDrawFactory;

