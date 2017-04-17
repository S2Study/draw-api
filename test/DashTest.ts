import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {DashFactory} from "../src/structures/Dash";

describe("Dashのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = DashFactory.createInstance(
				[3, 4], 2
			);
			it("segmentsが反映されていること。", () => {
				assert(data.segments[0] === 3);
				assert(data.segments[1] === 4);
			});
			it("offsetが反映されていること。", () => {
				assert(data.offset === 2);
			});
		});

		describe("値なし", () => {
			const data = DashFactory.createInstance();
			it("segmentsが「[]」で補完されていること。", () => {
				assert(data.segments.length === 0);
			});
			it("offsetが「0」で補完されていること。", () => {
				assert(data.offset === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const json = DashFactory.createInstance(
				[3, 4], 2
			).toJSON();

			it("offsetが反映されていること。", () => {
				assert(json.offset === 2);
			});
			it("segmentsが反映されていること。", () => {
				assert(json.segments[0] === 3);
				assert(json.segments[1] === 4);
			});
		});

		describe("初期値", () => {

			const json = DashFactory.createInstance().toJSON();
			it("offsetがundefined。", () => {
				assert(json.offset === undefined);
			});
			it("segmentsがundefined。", () => {
				assert(json.segments === undefined);
			});
		});
	});

	describe("fromJSON", () => {
		describe("値指定", () => {
			const data = DashFactory.fromJSON({
				offset: 1,
				segments: [5, 6]
			});
			it("segmentsが反映されていること。", () => {
				assert(data.offset === 1);
			});
			it("offsetが反映されていること。", () => {
				assert(data.segments[0] === 5);
				assert(data.segments[1] === 6);
			});
		});

		describe("値なし", () => {
			const data = DashFactory.fromJSON();
			it("segmentsが「[]」で補完されていること。", () => {
				assert(data.segments.length === 0);
			});
			it("offsetが「0」で補完されていること。", () => {
				assert(data.offset === 0);
			});
		});
	});
});

