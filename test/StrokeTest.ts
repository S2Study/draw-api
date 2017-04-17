import * as assert from "power-assert";
import {StrokeFactory} from "../src/structures/Stroke";
import {FillFactory} from "../src/structures/Fill";
import {DashFactory} from "../src/structures/Dash";
import {StrokeStyleFactory} from "../src/structures/StrokeStyle";

describe("Strokeのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = StrokeFactory.createInstance(
				FillFactory.createInstance(0x13),
				DashFactory.createInstance([1, 2]),
				StrokeStyleFactory.createInstance(5)
			);
			it("fillStyleが反映されていること。", () => {
				assert(data.fillStyle.color === 0x13);
			});
			it("dashが反映されていること。", () => {
				assert(data.dash!.segments[1] === 2);
			});
			it("styleが反映されていること。", () => {
				assert(data.style.thickness === 5);
			});
		});

		describe("値なし", () => {
			const data = StrokeFactory.createInstance();
			it("fillStyleが補完されていること。", () => {
				assert(data.fillStyle !== null);
				assert(data.fillStyle !== undefined);
			});
			it("dashにnullが設定されていること。", () => {
				assert(data.dash === null);
			});
			it("styleが補完されていること。", () => {
				assert(data.style !== null);
				assert(data.style !== undefined);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = StrokeFactory.createInstance(
				FillFactory.createInstance(0x13),
				DashFactory.createInstance([1, 2]),
				StrokeStyleFactory.createInstance(5)
			).toJSON();

			it("fillStyleが反映されていること。", () => {
				assert(data.fillStyle.color === 0x13);
			});
			it("dashが反映されていること。", () => {
				assert(data.dash!.segments[1] === 2);
			});
			it("styleが反映されていること。", () => {
				assert(data.style.thickness === 5);
			});
		});

		describe("初期値", () => {

			const data = StrokeFactory.createInstance().toJSON();

			it("fillStyleが設定されていること。", () => {
				assert(data.fillStyle !== undefined);
			});
			it("dashがundefined。", () => {
				assert(data.dash === undefined);
			});
			it("styleが設定されていること。", () => {
				assert(data.style !== undefined );
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = StrokeFactory.fromJSON({
				fillStyle: FillFactory.createInstance(0x13).toJSON(),
				dash: DashFactory.createInstance([1, 2]).toJSON(),
				style: StrokeStyleFactory.createInstance(5).toJSON(),
			});
			it("fillStyleが反映されていること。", () => {
				assert(data.fillStyle.color === 0x13);
			});
			it("dashが反映されていること。", () => {
				assert(data.dash!.segments[1] === 2);
			});
			it("styleが反映されていること。", () => {
				assert(data.style.thickness === 5);
			});
		});

		describe("値なし", () => {
			const data = StrokeFactory.fromJSON();
			it("fillStyleが補完されていること。", () => {
				assert(data.fillStyle !== null);
				assert(data.fillStyle !== undefined);
			});
			it("dashにnullが設定されていること。", () => {
				assert(data.dash === null);
			});
			it("styleが補完されていること。", () => {
				assert(data.style !== null);
				assert(data.style !== undefined);
			});
		});

	});
});

