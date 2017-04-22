import * as assert from "power-assert";
import {FillFactory} from "../src/structures/Fill";
import {GraphicFactory} from "../src/structures/Graphic";
import {structures} from "../src/index";
import Stroke = structures.Stroke;
import {GraphicsDrawFactory} from "../src/structures/GraphicsDraw";
import {TransformFactory} from "../src/structures/Transform";
import {LayerFactory} from "../src/structures/Layer";
import {ClipFactory} from "../src/structures/Clip";
import GraphicsDraw = structures.GraphicsDraw;
import {MessageFactory} from "../src/structures/Message";

describe("Messageのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = MessageFactory.createInstance(
				[LayerFactory.createInstance([], TransformFactory.createInstance(5))],
				"aa",
				2,
				555,
				"bb",
				"cc"
			);
			it("canvasが反映されていること。", () => {
				assert(data.canvas[0].transform.x === 5);
			});
			it("idが反映されていること。", () => {
				assert(data.id === "aa");
			});
			it("seqが反映されていること。", () => {
				assert(data.seq === 2);
			});
			it("timeが反映されていること。", () => {
				assert(data.time === 555);
			});
			it("authorが反映されていること。", () => {
				assert(data.author === "bb");
			});
			it("titleが反映されていること。", () => {
				assert(data.title === "cc");
			});
		});

		describe("値なし", () => {
			const data = MessageFactory.createInstance();
			it("canvasに空の配列が設定されていること。", () => {
				assert(data.canvas.length === 0);
			});
			it("idが空であること。", () => {
				assert(data.id === "");
			});
			it("seqが-1であること。", () => {
				assert(data.seq === -1);
			});
			it("timeが設定されていること。", () => {
				assert(data.time !== null);
				assert(data.time !== undefined);
			});
			it("authorが空であること。", () => {
				assert(data.author === "");
			});
			it("titleが空であること。", () => {
				assert(data.title === "");
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = MessageFactory.createInstance(
				[LayerFactory.createInstance([], TransformFactory.createInstance(5))],
				"aa",
				2,
				555,
				"bb",
				"cc"
			).toJSON();

			it("canvasが反映されていること。", () => {
				assert(data.canvas[0].transform[0] === 5);
			});
			it("idが反映されていること。", () => {
				assert(data.id === "aa");
			});
			it("seqが反映されていること。", () => {
				assert(data.seq === 2);
			});
			it("timeが反映されていること。", () => {
				assert(data.time === 555);
			});
			it("authorが反映されていること。", () => {
				assert(data.author === "bb");
			});
			it("titleが反映されていること。", () => {
				assert(data.title === "cc");
			});

		});

		describe("初期値", () => {

			const data = MessageFactory.createInstance().toJSON();

			it("canvasに空の配列が設定されていること。", () => {
				assert(data.canvas === undefined);
			});
			it("idが空であること。", () => {
				assert(data.id === undefined);
			});
			it("seqが-1であること。", () => {
				assert(data.seq === undefined);
			});
			it("authorが空であること。", () => {
				assert(data.author === undefined);
			});
			it("titleが空であること。", () => {
				assert(data.title === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = MessageFactory.fromJSON({
				canvas: [LayerFactory.createInstance([], TransformFactory.createInstance(5)).toJSON()],
				id: "aa",
				seq: 2,
				time: 555,
				author: "bb",
				title: "cc"
			});
			it("canvasが反映されていること。", () => {
				assert(data.canvas[0].transform.x === 5);
			});
			it("idが反映されていること。", () => {
				assert(data.id === "aa");
			});
			it("seqが反映されていること。", () => {
				assert(data.seq === 2);
			});
			it("timeが反映されていること。", () => {
				assert(data.time === 555);
			});
			it("authorが反映されていること。", () => {
				assert(data.author === "bb");
			});
			it("titleが反映されていること。", () => {
				assert(data.title === "cc");
			});
		});

		describe("値なし", () => {
			const data = MessageFactory.fromJSON();

			it("canvasに空の配列が設定されていること。", () => {
				assert(data.canvas.length === 0);
			});
			it("idが空であること。", () => {
				assert(data.id === "");
			});
			it("seqが-1であること。", () => {
				assert(data.seq === -1);
			});
			it("timeが設定されていること。", () => {
				assert(data.time !== null);
				assert(data.time !== undefined);
			});
			it("authorが空であること。", () => {
				assert(data.author === "");
			});
			it("titleが空であること。", () => {
				assert(data.title === "");
			});
		});

	});
});

