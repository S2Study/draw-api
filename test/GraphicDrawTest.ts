import * as assert from "power-assert";
import {StrokeFactory} from "../src/structures/Stroke";
import {FillFactory} from "../src/structures/Fill";
import {DashFactory} from "../src/structures/Dash";
import {StrokeStyleFactory} from "../src/structures/StrokeStyle";
import {GraphicFactory} from "../src/structures/Graphic";
import {structures} from "../src/index";
import Stroke = structures.Stroke;
import {MoveToFactory} from "../src/structures/MoveTo";
import {PathItemsUtil} from "../src/structures/PathItem";
import {GraphicsDrawFactory} from "../src/structures/GraphicsDraw";
import {TransformFactory} from "../src/structures/Transform";

describe("GraphicDrawのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = GraphicsDrawFactory.createInstance(
				[GraphicFactory.createInstance(null, FillFactory.createInstance(0x33))],
				TransformFactory.createInstance(2),
				3
			);
			it("compositionOperationが反映されていること。", () => {
				assert(data.compositeOperation === 3);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.a === 2);
			});
			it("graphicsが反映されていること。", () => {
				assert(data.graphics[0]!.fill!.color === 0x33);
			});
		});

		describe("値なし", () => {
			const data = GraphicsDrawFactory.createInstance();
			it("compositionOperationに0が設定されていること。", () => {
				assert(data.compositeOperation === 0);
			});
			it("transformが設定されていること。", () => {
				assert(data.transform.a === 1);
			});
			it("graphicsに空の配列が設定されていること。", () => {
				assert(data.graphics.length === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = GraphicsDrawFactory.createInstance(
				[GraphicFactory.createInstance(null, FillFactory.createInstance(0x33))],
				TransformFactory.createInstance(2),
				3
			).toJSON();

			it("compositionOperationが反映されていること。", () => {
				assert(data.compositeOperation === 3);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform[0] === 2);
			});
			it("graphicsが反映されていること。", () => {
				assert(data.graphics[0]!.fill!.color === 0x33);
			});

		});

		describe("初期値", () => {

			const data = GraphicsDrawFactory.createInstance().toJSON();

			it("compositionOperationがundefined。", () => {
				assert(data.compositeOperation === undefined);
			});
			it("transformがundefined。", () => {
				assert(data.transform === undefined);
			});
			it("graphicsがundefined。", () => {
				assert(data.graphics === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = GraphicsDrawFactory.fromJSON({
				graphics: [GraphicFactory.createInstance(null, FillFactory.createInstance(0x33)).toJSON()],
				transform: [2],
				compositeOperation: 3
			});
			it("compositionOperationが反映されていること。", () => {
				assert(data.compositeOperation === 3);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.a === 2);
			});
			it("graphicsが反映されていること。", () => {
				assert(data.graphics[0]!.fill!.color === 0x33);
			});
		});

		describe("値なし", () => {
			const data = GraphicsDrawFactory.fromJSON();

			it("compositionOperationに0が設定されていること。", () => {
				assert(data.compositeOperation === 0);
			});
			it("transformが設定されていること。", () => {
				assert(data.transform.a === 1);
			});
			it("graphicsに空の配列が設定されていること。", () => {
				assert(data.graphics.length === 0);
			});
		});

	});
});

