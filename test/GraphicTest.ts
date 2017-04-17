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

describe("Graphicのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = GraphicFactory.createInstance(
				[MoveToFactory.createInstance(1, 2)],
				FillFactory.createInstance(0x44),
				StrokeFactory.createInstance(FillFactory.createInstance(0x55))
			);
			it("fillが反映されていること。", () => {
				assert(data.fill!.color === 0x44);
			});
			it("strokeが反映されていること。", () => {
				assert(data.stroke!.fillStyle.color === 0x55);
			});
			it("pathが反映されていること。", () => {
				assert(data.path[0].type === 0);
			});
		});

		describe("値なし", () => {
			const data = GraphicFactory.createInstance();
			it("fillにnullが設定されていること。", () => {
				assert(data.fill === null);
			});
			it("strokeにnullが設定されていること。", () => {
				assert(data.stroke === null);
			});
			it("pathに空の配列が設定されていること。", () => {
				assert(data.path.length === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = GraphicFactory.createInstance(
				[MoveToFactory.createInstance(1, 2)],
				FillFactory.createInstance(0x44),
				StrokeFactory.createInstance(FillFactory.createInstance(0x55))
			).toJSON();

			it("fillが反映されていること。", () => {
				assert(data.fill!.color === 0x44);
			});
			it("strokeが反映されていること。", () => {
				assert(data.stroke!.fillStyle.color === 0x55);
			});
			it("pathが反映されていること。", () => {
				assert(data.path[0][0] === 0);
			});
		});

		describe("初期値", () => {

			const data = GraphicFactory.createInstance().toJSON();

			it("fillがundefined。", () => {
				assert(data.fill === undefined);
			});
			it("strokeがundefined。", () => {
				assert(data.stroke === undefined);
			});
			it("pathがundefined。", () => {
				assert(data.path === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = GraphicFactory.fromJSON({
				fill: FillFactory.createInstance(0x44).toJSON(),
				stroke: StrokeFactory.createInstance(FillFactory.createInstance(0x55)).toJSON(),
				path: PathItemsUtil.toArray([MoveToFactory.createInstance(1, 2)])
			});
			it("fillが反映されていること。", () => {
				assert(data.fill!.color === 0x44);
			});
			it("strokeが反映されていること。", () => {
				assert(data.stroke!.fillStyle.color === 0x55);
			});
			it("pathが反映されていること。", () => {
				assert(data.path[0].type === 0);
			});
		});

		describe("値なし", () => {
			const data = GraphicFactory.fromJSON();

			it("fillにnullが設定されていること。", () => {
				assert(data.fill === null);
			});
			it("strokeにnullが設定されていること。", () => {
				assert(data.stroke === null);
			});
			it("pathに空の配列が設定されていること。", () => {
				assert(data.path.length === 0);
			});
		});

	});
});

