import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {LinerGradientFactory} from "../src/structures/LinerGradient";

describe("LinerGradientのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = LinerGradientFactory.createInstance(
				1, 2, 3, 4, [ ColorStopFactory.createInstance(1) ]
			);
			it("x0が反映されていること。", () => {
				assert(data.x0 === 1);
			});
			it("y0が反映されていること。", () => {
				assert(data.y0 === 2);
			});
			it("x1が反映されていること。", () => {
				assert(data.x1 === 3);
			});
			it("y1が反映されていること。", () => {
				assert(data.y1 === 4);
			});
			it("colorStopが反映されていること。", () => {
				assert(data.colorStops[0].offset === 1);
			});
		});

		describe("値なし", () => {
			const data = LinerGradientFactory.createInstance();
			it("x0が「0」で補完されていること。", () => {
				assert(data.x0 === 0);
			});
			it("y0が「0」で補完されていること。", () => {
				assert(data.y0 === 0);
			});
			it("x1が「0」で補完されていること。", () => {
				assert(data.x1 === 0);
			});
			it("y1が「0」で補完されていること。", () => {
				assert(data.y1 === 0);
			});
			it("colorStopが空の配列で補完されていること。", () => {
				assert(data.colorStops.length === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = LinerGradientFactory.createInstance(
				1, 2, 3, 4, [ ColorStopFactory.createInstance(1) ]
			).toJSON();
			it("x0が反映されていること。", () => {
				assert(data.x0 === 1);
			});
			it("y0が反映されていること。", () => {
				assert(data.y0 === 2);
			});
			it("x1が反映されていること。", () => {
				assert(data.x1 === 3);
			});
			it("y1が反映されていること。", () => {
				assert(data.y1 === 4);
			});
			it("colorStopが反映されていること。", () => {
				assert(data.colorStops[0].offset === 1);
			});
		});

		describe("初期値", () => {

			const data = LinerGradientFactory.createInstance().toJSON();
			it("x0がundefined", () => {
				assert(data.x0 === undefined);
			});
			it("y0がundefined", () => {
				assert(data.y0 === undefined);
			});
			it("x1がundefined", () => {
				assert(data.x1 === undefined);
			});
			it("y1がundefined", () => {
				assert(data.y1 === undefined);
			});
			it("colorStopがundefined", () => {
				assert(data.colorStops === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = LinerGradientFactory.fromJSON({
				x0: 5,
				y0: 6,
				x1: 7,
				y1: 8,
				colorStops: [
					{
						offset: 1,
						color: "red"
					},
					{
						offset: 2,
						color: "green"
					},
				]
			});
			it("x0が反映されていること。", () => {
				assert(data.x0 === 5);
			});
			it("y0が反映されていること。", () => {
				assert(data.y0 === 6);
			});
			it("x1が反映されていること。", () => {
				assert(data.x1 === 7);
			});
			it("y1が反映されていること。", () => {
				assert(data.y1 === 8);
			});
			it("colorStopからColorStopのインスタンスが生成されていること。", () => {
				assert(data.colorStops.length === 2);
				assert(data.colorStops[1].toJSON().color === "green");
			});
		});

		describe("値なし", () => {
			const data = LinerGradientFactory.fromJSON();
			it("x0が「0」で補完されていること。", () => {
				assert(data.x0 === 0);
			});
			it("y0が「0」で補完されていること。", () => {
				assert(data.y0 === 0);
			});
			it("x1が「0」で補完されていること。", () => {
				assert(data.x1 === 0);
			});
			it("y1が「0」で補完されていること。", () => {
				assert(data.y1 === 0);
			});
			it("colorStopが空の配列で補完されていること。", () => {
				assert(data.colorStops.length === 0);
			});
		});

	});
});

