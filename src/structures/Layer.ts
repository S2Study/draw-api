import {structures} from "../DrawAPI";
import Layer = structures.Layer;
import {DrawAPIUtils} from "../DrawAPIUtils";
import {TRANSFORM_DEFAULT, TransformFactory} from "./Transform";
import {GraphicsDrawFactory} from "./GraphicsDraw";
import {ClipFactory} from "./Clip";
class LayerImpl implements Layer {

	transform: structures.Transform;
	clip: structures.Clip | null;
	draws: structures.Draw[];

	constructor(
		draws: structures.Draw[],
		transform: structures.Transform,
		clip: structures.Clip | null
	) {
		this.draws = draws;
		this.clip = clip;
		this.transform = transform;
	}

	toJSON(): any {

		const json: any = {};
		if (!this.transform.isDefault) {
			json.transform = this.transform.toJSON();
		}
		if (this.draws.length !== 0) {
			const draws: any[] = [];
			for (let draw of this.draws) {
				draws.push(draw.toJSON());
			}
			json.draws = draws;
		}
		if (this.clip !== null) {
			json.clip = this.clip.toJSON();
		}
		return json;
	}
}

export class LayerFactoryStatic {
	createInstance(
		draws?: structures.Draw[] | null,
		transform?: structures.Transform | null,
		clip?: structures.Clip | null
	): Layer {
		return new LayerImpl(
			DrawAPIUtils.complement(draws, []),
			DrawAPIUtils.complement(transform, TRANSFORM_DEFAULT),
			DrawAPIUtils.complement(clip, null)
		);
	}
	fromJSON(
		json1?: any | null
	): Layer {

		const json: any = DrawAPIUtils.complement(json1, {});
		const draws: structures.Draw[] = [];
		if (!DrawAPIUtils.isNull(json.draws)) {
			for (let draw of json.draws) {
				draws.push(GraphicsDrawFactory.fromJSON(draw));
			}
		}
		return this.createInstance(
			draws,
			DrawAPIUtils.isNull(json.transform) ? null : TransformFactory.fromJSON(json.transform),
			DrawAPIUtils.isNull(json.clip) ? null : ClipFactory.fromJSON(json.clip)
		);
	}
}
export const LayerFactory: LayerFactoryStatic = new LayerFactoryStatic();
export default LayerFactory;