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
import {ClipFactory} from "../src/structures/Clip";
import {TransformFactory} from "../src/structures/Transform";

describe("Clipのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = ClipFactory.createInstance(
				[MoveToFactory.createInstance(1, 2)],
				TransformFactory.createInstance(2)
			);
			it("pathが反映されていること。", () => {
				assert(data.path[0].type === 0);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.a === 2);
			});
		});

		describe("値なし", () => {
			const data = ClipFactory.createInstance();
			it("pathが空の配列となっていること。", () => {
				assert(data.path.length === 0);
			});
			it("transformが設定されていること。", () => {
				assert(data.transform !== null);
				assert(data.transform !== undefined);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = ClipFactory.createInstance(
				[MoveToFactory.createInstance(1, 2)],
				TransformFactory.createInstance(2)
			).toJSON();

			it("pathが反映されていること。", () => {
				assert(data.path[0][0] === 0);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform[0] === 2);
			});
		});

		describe("初期値", () => {

			const data = ClipFactory.createInstance().toJSON();

			it("pathがundefined。", () => {
				assert(data.path === undefined);
			});
			it("transformがundefined。", () => {
				assert(data.transform === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = ClipFactory.fromJSON({
				path: PathItemsUtil.toArray([MoveToFactory.createInstance(1, 2)]),
				transform: TransformFactory.createInstance(2).toJSON()
			});
			it("pathが反映されていること。", () => {
				assert(data.path[0].type === 0);
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.a === 2);
			});
		});

		describe("値なし", () => {
			const data = ClipFactory.fromJSON();

			it("pathが空の配列となっていること。", () => {
				assert(data.path.length === 0);
			});
			it("transformが設定されていること。", () => {
				assert(data.transform !== null);
				assert(data.transform !== undefined);
			});
		});

	});
});

