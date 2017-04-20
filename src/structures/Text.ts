import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../DrawAPI";
import Fill = structures.Fill;
import Stroke = structures.Stroke;
import Text = structures.Text;
import {FillFactory} from "./Fill";
import {StrokeFactory} from "./Stroke";

export class TextImpl implements Text {

	x: number;
	y: number;
	fontFamily: string;
	size: number;
	weight: number;
	style: number;
	fill: Fill | null;
	stroke: Stroke | null;
	// align: string;
	// baseline: string;
	text: string;

	constructor(
		x: number,
		y: number,
		fontFamily: string,
		size: number,
		weight: number,
		style: number,
		fill: Fill | null,
		stroke: Stroke | null,
		text: string
	) {
		this.x = x | 0;
		this.y = y | 0;
		this.fontFamily = fontFamily;
		this.size = size;
		this.weight = weight;
		this.style = style;
		this.fill = fill;
		this.stroke = stroke;
		this.text = text;
	}

	toJSON(): any {

		const json: any = {};
		if (this.x !== 0) {
			json.x = this.x;
		}
		if (this.y !== 0) {
			json.y = this.y;
		}
		if (this.fontFamily !== "sans-serif") {
			json.fontFamily = this.fontFamily;
		}
		if (this.size !== 12) {
			json.size = this.size;
		}
		if (this.weight !== 4) {
			json.weight = this.weight;
		}
		if (this.style !== 0) {
			json.style = this.style;
		}
		if (this.fill !== null) {
			json.fill = this.fill.toJSON();
		}
		if (this.stroke !== null) {
			json.stroke = this.stroke.toJSON();
		}
		if (this.text.length !== 0) {
			json.text = this.text;
		}
		return json;
	}
}

export class TextFactoryStatic {

	createInstance(
		text?: string | null,
		x?: number | null,
		y?: number | null,
		size?: number | null,
		fill?: Fill | null,
		stroke?: Stroke | null,
		fontFamily?: string | null,
		weight?: number | null,
		style?: number | null
	): Text {

		return new TextImpl(
			DrawAPIUtils.complementNumber(x),
			DrawAPIUtils.complementNumber(y),
			DrawAPIUtils.complementString(fontFamily, "sans-serif"),
			DrawAPIUtils.complementNumber(size, 12),
			DrawAPIUtils.complementNumber(weight, 4),
			DrawAPIUtils.complementNumber(style, 0),
			DrawAPIUtils.complement(fill, null),
			DrawAPIUtils.complement(stroke, null),
			DrawAPIUtils.complementString(text)

		);
	}

	fromJSON(json1?: any | null): Text {
		const json: any = DrawAPIUtils.complement(json1, {});
		return this.createInstance(
			json.text,
			json.x,
			json.y,
			json.size,
			DrawAPIUtils.isNull(json.fill) ? null : FillFactory.fromJSON(json.fill),
			DrawAPIUtils.isNull(json.stroke) ? null : StrokeFactory.fromJSON(json.stroke),
			json.fontFamily,
			json.weight,
			json.style,
		);
	}
}

export const TextFactory: TextFactoryStatic = new TextFactoryStatic();
export default TextFactory;