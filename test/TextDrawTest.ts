import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {DashFactory} from "../src/structures/Dash";
import {FillFactory} from "../src/structures/Fill";
import {LinerGradientFactory} from "../src/structures/LinerGradient";
import {RadialGradientFactory} from "../src/structures/RadialGradient";
import {StrokeStyleFactory} from "../src/structures/StrokeStyle";
import {TextFactory} from "../src/structures/Text";
import {StrokeFactory} from "../src/structures/Stroke";
import {TextDrawFactory} from "../src/structures/TextDraw";
import {TransformFactory} from "../src/structures/Transform";

describe("TextDrawのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = TextDrawFactory.createInstance(
				TextFactory.createInstance("bbb"),
				TransformFactory.createInstance(5),
				3
			);
			it("textが反映されていること。", () => {
				assert(data.text.text === "bbb");
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.x === 5);
			});
			it("compositeOperationが反映されていること。", () => {
				assert(data.compositeOperation === 3);
			});
		});

		describe("値なし", () => {
			const data = TextDrawFactory.createInstance();
			it("textが設定されていること。", () => {
				assert(data.text !== null);
				assert(data.text !== undefined);
			});
			it("transformが設定されていること。", () => {
				assert(data.transform !== null);
				assert(data.transform !== undefined);
			});
			it("compositeOperationに0が設定されていること。", () => {
				assert(data.compositeOperation === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = TextDrawFactory.createInstance(
				TextFactory.createInstance("bbb"),
				TransformFactory.createInstance(5),
				3
			).toJSON();

			it("textが反映されていること。", () => {
				assert(data.text.text === "bbb");
			});
			it("transformが反映されていること。", () => {
				assert(data.transform[0] === 5);
			});
			it("compositeOperationが反映されていること。", () => {
				assert(data.compositeOperation === 3);
			});
		});

		describe("初期値", () => {

			const data = TextDrawFactory.createInstance().toJSON();

			it("textがundefined。", () => {
				assert(data.text === undefined);
			});
			it("transformがundefined。", () => {
				assert(data.transform === undefined);
			});
			it("compositeOperationがundefined。", () => {
				assert(data.compositeOperation === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = TextDrawFactory.fromJSON({
				text: TextFactory.createInstance("bbb").toJSON(),
				transform: TransformFactory.createInstance(5).toJSON(),
				compositeOperation: 3
			});
			it("textが反映されていること。", () => {
				assert(data.text.text === "bbb");
			});
			it("transformが反映されていること。", () => {
				assert(data.transform.x === 5);
			});
			it("compositeOperationが反映されていること。", () => {
				assert(data.compositeOperation === 3);
			});
		});

		describe("値なし", () => {
			const data = TextDrawFactory.fromJSON();
			it("textが設定されていること。", () => {
				assert(data.text !== null);
				assert(data.text !== undefined);
			});
			it("transformが設定されていること。", () => {
				assert(data.transform !== null);
				assert(data.transform !== undefined);
			});
			it("compositeOperationに0が設定されていること。", () => {
				assert(data.compositeOperation === 0);
			});
		});

	});
});

