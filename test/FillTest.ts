import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {DashFactory} from "../src/structures/Dash";
import {FillFactory} from "../src/structures/Fill";
import {LinerGradientFactory} from "../src/structures/LinerGradient";
import {RadialGradientFactory} from "../src/structures/RadialGradient";

describe("Fillのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = FillFactory.createInstance(
				0x22,
				LinerGradientFactory.createInstance(1).toJSON(),
				RadialGradientFactory.createInstance(2).toJSON()
			);
			it("colorが反映されていること。", () => {
				assert(data.color === 0x22);
			});
			it("linerGradientが反映されていること。", () => {
				assert(data.linerGradient!.x0 === 1);
			});
			it("radialGradientが反映されていること。", () => {
				assert(data.radialGradient!.x0 === 2);
			});
		});

		describe("値なし", () => {
			const data = FillFactory.createInstance();
			it("colorが「0x00000000」で補完されていること。", () => {
				assert(data.color === 0x00000000);
			});
			it("linerGradientにnullが代入されていること。", () => {
				assert(data.linerGradient === null);
			});
			it("radialGradientにnullが代入されていること。", () => {
				assert(data.radialGradient === null);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = FillFactory.createInstance(
				0x22,
				LinerGradientFactory.createInstance(1).toJSON(),
				RadialGradientFactory.createInstance(2).toJSON()
			).toJSON();

			it("colorが反映されていること。", () => {
				assert(data.color === 0x22);
			});
			it("linerGradientが反映されていること。", () => {
				assert(data.linerGradient!.x0 === 1);
			});
			it("radialGradientが反映されていること。", () => {
				assert(data.radialGradient!.x0 === 2);
			});
		});

		describe("初期値", () => {

			const json = FillFactory.createInstance().toJSON();
			it("colorがundefined。", () => {
				assert(json.color === undefined);
			});
			it("linerGradientがundefined。", () => {
				assert(json.linerGradient === undefined);
			});
			it("radialGradientがundefined。", () => {
				assert(json.radialGradient === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = FillFactory.fromJSON({
				color: 0x22,
				linerGradient: LinerGradientFactory.createInstance(5).toJSON(),
				radialGradient: RadialGradientFactory.createInstance(4).toJSON()
			});
			it("colorが反映されていること。", () => {
				assert(data.color === 0x22);
			});
			it("linerGradientが反映されていること。", () => {
				assert(data.linerGradient!.x0 === 5);
			});
			it("radialGradientが反映されていること。", () => {
				assert(data.radialGradient!.x0 === 4);
			});
		});

		describe("値なし", () => {
			const data = FillFactory.fromJSON();
			it("colorが「0x00000000」で補完されていること。", () => {
				assert(data.color === 0x00000000);
			});
			it("linerGradientにnullが代入されていること。", () => {
				assert(data.linerGradient === null);
			});
			it("radialGradientにnullが代入されていること。", () => {
				assert(data.radialGradient === null);
			});
		});
	});
});

