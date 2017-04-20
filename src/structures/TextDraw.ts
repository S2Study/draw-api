import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
import TextDraw = structures.TextDraw;
import {TextFactory} from "./Text";
import Text = structures.Text;
import {TRANSFORM_DEFAULT, TransformFactory} from "./Transform";

const TEXT_DEFAULT = TextFactory.createInstance();
export class TextDrawImpl implements TextDraw {

	text: Text;
	transform: structures.Transform;
	compositeOperation: number;

	constructor (
		text: Text,
		transform: structures.Transform,
		compositeOperation: number
	) {
		this.text = text;
		this.transform = transform;
		this.compositeOperation = compositeOperation;
	}

	toJSON(): any {

		const json: any = {};
		if (this.text.text.length !== 0) {
			json.text = this.text.toJSON();
		}
		const transform = this.transform;
		if (
			transform.a !== 1
		||	transform.b !== 0
		||	transform.c !== 0
		||	transform.d !== 1
		||	transform.x !== 0
		||	transform.y !== 0
		) {
			json.transform = this.transform.toJSON();
		}
		if (this.compositeOperation !== 0) {
			json.compositeOperation = this.compositeOperation;
		}
		return json;
	}
}

export class TextDrawFactoryStatic {
	createInstance(
		text?: Text | null,
		transform?: structures.Transform | null,
		compositeOperation?: number | null
	): TextDraw {
		return new TextDrawImpl(
			DrawAPIUtils.complement(text, TEXT_DEFAULT),
			DrawAPIUtils.complement(transform, TRANSFORM_DEFAULT),
			DrawAPIUtils.complementNumber(compositeOperation)
		);
	}

	fromJSON(json1?: any | null): TextDraw {

		const json: any = DrawAPIUtils.complement(json1, {});
		return this.createInstance(
			DrawAPIUtils.isNull(json.text) ? null : TextFactory.fromJSON(json.text),
			DrawAPIUtils.isNull(json.transform) ? null : TransformFactory.fromJSON(json.transform),
			json.compositeOperation
		);

	}
}

export const TextDrawFactory: TextDrawFactoryStatic = new TextDrawFactoryStatic();
export default TextDrawFactory;