import {structures} from "../DrawAPI";
import Clip = structures.Clip;
import {PathItemsFactory, PathItemsUtil} from "./PathItem";
import {DrawAPIUtils} from "../DrawAPIUtils";
import {TRANSFORM_DEFAULT, TransformFactory} from "./Transform";
class ClipImpl implements Clip {

	transform: structures.Transform;
	path: structures.PathItem[];

	constructor(
		transform: structures.Transform,
		path: structures.PathItem[]
	) {
		this.transform = transform;
		this.path = path;
	}

	toJSON(): any {

		const json: any = {};
		if (
			this.transform.a !== 1
		||	this.transform.b !== 0
		||	this.transform.c !== 0
		||	this.transform.d !== 1
		||	this.transform.x !== 0
		||	this.transform.y !== 0
		) {
			json.transform = this.transform.toJSON();
		}

		if (this.path.length !== 0) {
			json.path = PathItemsUtil.toArray(this.path);
		}
		return json;
	}
}
export class ClipFactoryStatic {

	createInstance(
		path?: structures.PathItem[] | null,
		transform?: structures.Transform | null
	): Clip {
		return new ClipImpl(
			DrawAPIUtils.complement(transform, TRANSFORM_DEFAULT),
			DrawAPIUtils.complement(path, [])
		);
	}

	fromJSON(
		json1?: any | null
	): Clip {

		const json: any = DrawAPIUtils.complement(json1, {});
		return this.createInstance(
			PathItemsFactory.createInstance(json.path),
			TransformFactory.fromJSON(json.transform)
		);
	}
}
export const ClipFactory: ClipFactoryStatic = new ClipFactoryStatic();
export default ClipFactory;