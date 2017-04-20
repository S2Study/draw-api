import {structures} from "../DrawAPI";
import Message = structures.Message;
import {DrawAPIUtils} from "../DrawAPIUtils";
import Layer = structures.Layer;
import {LayerFactory} from "./Layer";

class MessageImpl implements Message {

	id: string;
	seq: number;
	author: string;
	time: number;
	title: string;
	canvas: structures.Layer[];

	constructor(
		id: string,
		seq: number,
		author: string,
		time: number,
		title: string,
		canvas: structures.Layer[]
	) {
		this.id = id;
		this.seq = seq | 0;
		this.author = author;
		this.time = time;
		this.title = title;
		this.canvas = canvas;
	}

	toJSON(): any {

		const json: any = {};
		if (this.id.length !== 0) {
			json.id = this.id;
		}
		if (this.seq >= 0) {
			json.seq = this.seq;
		}
		if (this.author.length !== 0) {
			json.author = this.author;
		}
		if (this.title.length !== 0) {
			json.title = this.title;
		}
		json.time = this.time;
		if (this.canvas.length !== 0) {
			const canvas: any[] = [];
			for (let layer of this.canvas) {
				canvas.push(layer.toJSON());
			}
			json.canvas = canvas;
		}
		return json;
	}
}

export class MessageFactoryStatic {

	createInstance(
		canvas?: structures.Layer[] | null,
		id?: string | null,
		seq?: number | null,
		time?: number | null,
		author?: string | null,
		title?: string | null
	): Message {
		return new MessageImpl(
			DrawAPIUtils.complementString(id),
			DrawAPIUtils.complementNumber(seq, -1),
			DrawAPIUtils.complementString(author),
			DrawAPIUtils.complementNumber(time, Date.now()),
			DrawAPIUtils.complementString(title),
			( canvas === null || canvas === undefined ) ? [] : canvas
		);
	}

	fromJSON(json1?: any | null): Message {

		const json: any = DrawAPIUtils.complement(json1, {});
		const layers: Layer[] = [];
		if (!DrawAPIUtils.isNull(json.canvas)) {
			for (let layer of json.canvas) {
				layers.push(LayerFactory.fromJSON(layer));
			}
		}
		return this.createInstance(
			layers,
			json.id,
			json.seq,
			json.time,
			json.author,
			json.title
		);
	}
}
export const MessageFactory: MessageFactoryStatic = new MessageFactoryStatic();
export default MessageFactory;