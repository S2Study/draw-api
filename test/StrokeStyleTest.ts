import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {DashFactory} from "../src/structures/Dash";
import {FillFactory} from "../src/structures/Fill";
import {LinerGradientFactory} from "../src/structures/LinerGradient";
import {RadialGradientFactory} from "../src/structures/RadialGradient";
import {StrokeStyleFactory} from "../src/structures/StrokeStyle";

describe("StrokeStyleのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = StrokeStyleFactory.createInstance(
				1, 2, 3, 4, 5
			);
			it("thicknessが反映されていること。", () => {
				assert(data.thickness === 1);
			});
			it("capsが反映されていること。", () => {
				assert(data.caps === 2);
			});
			it("jointsが反映されていること。", () => {
				assert(data.joints === 3);
			});
			it("miterLimitが反映されていること。", () => {
				assert(data.miterLimit === 4);
			});
			it("ignoreScaleが反映されていること。", () => {
				assert(data.ignoreScale === 5);
			});
		});

		describe("値なし", () => {
			const data = StrokeStyleFactory.createInstance();
			it("thicknessに「1」が補完されていること。", () => {
				assert(data.thickness === 1);
			});
			it("capsに「1」が補完されていること。", () => {
				assert(data.caps === 1);
			});
			it("jointsに「1」が補完されていること。", () => {
				assert(data.joints === 1);
			});
			it("miterLimitに「10」が補完されていること。", () => {
				assert(data.miterLimit === 10);
			});
			it("ignoreScaleに「0」が補完されていること。", () => {
				assert(data.ignoreScale === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = StrokeStyleFactory.createInstance(
				10, 2, 3, 4, 5
			).toJSON();

			it("thicknessが反映されていること。", () => {
				assert(data.thickness === 10);
			});
			it("capsが反映されていること。", () => {
				assert(data.caps === 2);
			});
			it("jointsが反映されていること。", () => {
				assert(data.joints === 3);
			});
			it("miterLimitが反映されていること。", () => {
				assert(data.miterLimit === 4);
			});
			it("ignoreScaleが反映されていること。", () => {
				assert(data.ignoreScale === 5);
			});
		});

		describe("初期値", () => {

			const data = StrokeStyleFactory.createInstance().toJSON();

			it("thicknessがundefined。", () => {
				assert(data.thickness === undefined);
			});
			it("capsがundefined。", () => {
				assert(data.caps === undefined);
			});
			it("jointsがundefined。", () => {
				assert(data.joints === undefined);
			});
			it("miterLimitがundefined。", () => {
				assert(data.miterLimit === undefined);
			});
			it("ignoreScaleがundefined。", () => {
				assert(data.ignoreScale === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = StrokeStyleFactory.fromJSON({
				thickness: 1,
				caps: 2,
				joints: 3,
				miterLimit: 4,
				ignoreScale: 5,
			});
			it("thicknessが反映されていること。", () => {
				assert(data.thickness === 1);
			});
			it("capsが反映されていること。", () => {
				assert(data.caps === 2);
			});
			it("jointsが反映されていること。", () => {
				assert(data.joints === 3);
			});
			it("miterLimitが反映されていること。", () => {
				assert(data.miterLimit === 4);
			});
			it("ignoreScaleが反映されていること。", () => {
				assert(data.ignoreScale === 5);
			});
		});

		describe("値なし", () => {
			const data = StrokeStyleFactory.fromJSON();
			it("thicknessに「1」が補完されていること。", () => {
				assert(data.thickness === 1);
			});
			it("capsに「1」が補完されていること。", () => {
				assert(data.caps === 1);
			});
			it("jointsに「1」が補完されていること。", () => {
				assert(data.joints === 1);
			});
			it("miterLimitに「10」が補完されていること。", () => {
				assert(data.miterLimit === 10);
			});
			it("ignoreScaleに「0」が補完されていること。", () => {
				assert(data.ignoreScale === 0);
			});
		});

	});
});

