import * as assert from "power-assert";
import {structures} from "../src/index";
import Stroke = structures.Stroke;
import {GraphicsDrawFactory} from "../src/structures/GraphicsDraw";
import {TransformFactory} from "../src/structures/Transform";
import {LayerFactory} from "../src/structures/Layer";
import {ClipFactory} from "../src/structures/Clip";
import GraphicsDraw = structures.GraphicsDraw;

describe("Layerのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = LayerFactory.createInstance(
				[GraphicsDrawFactory.createInstance([], TransformFactory.createInstance(3))],
				TransformFactory.createInstance(4),
				ClipFactory.createInstance([], TransformFactory.createInstance(5))
			);
			it("drawsが反映されていること。", () => {
				assert((<GraphicsDraw>data.draws[0]).transform.a === 3);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.a === 4);
			});
			it("clipが反映されていること。", () => {
				assert(data.clip!.transform.a === 5);
			});
		});

		describe("値なし", () => {
			const data = LayerFactory.createInstance();
			it("drawsが空の配列。", () => {
				assert(data.draws.length === 0);
			});
			it("transformが設定されている。", () => {
				assert(data.transform !== null);
				assert(data.transform !== undefined);
			});
			it("clipにnullが設定されていること。", () => {
				assert(data.clip === null);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = LayerFactory.createInstance(
				[GraphicsDrawFactory.createInstance([], TransformFactory.createInstance(3))],
				TransformFactory.createInstance(4),
				ClipFactory.createInstance([], TransformFactory.createInstance(5))
			).toJSON();

			it("drawsが反映されていること。", () => {
				assert(data.draws[0].transform[0] === 3);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform[0] === 4);
			});
			it("clipが反映されていること。", () => {
				assert(data.clip!.transform[0] === 5);
			});

		});

		describe("初期値", () => {

			const data = LayerFactory.createInstance().toJSON();

			it("drawsが空の配列。", () => {
				assert(data.draws === undefined);
			});
			it("transformが設定されている。", () => {
				assert(data.transform === undefined);
			});
			it("clipにnullが設定されていること。", () => {
				assert(data.clip === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = LayerFactory.fromJSON({
				draws: [GraphicsDrawFactory.createInstance([], TransformFactory.createInstance(3)).toJSON()],
				transform: TransformFactory.createInstance(4).toJSON(),
				clip: ClipFactory.createInstance([], TransformFactory.createInstance(5).toJSON())
			});
			it("drawsが反映されていること。", () => {
				assert((<GraphicsDraw>data.draws[0]).transform.a === 3);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.a === 4);
			});
			it("clipが反映されていること。", () => {
				assert(data.clip!.transform.a === 5);
			});
		});

		describe("値なし", () => {
			const data = LayerFactory.fromJSON();

			it("drawsが空の配列。", () => {
				assert(data.draws.length === 0);
			});
			it("transformが設定されている。", () => {
				assert(data.transform !== null);
				assert(data.transform !== undefined);
			});
			it("clipにnullが設定されていること。", () => {
				assert(data.clip === null);
			});
		});

	});
});

