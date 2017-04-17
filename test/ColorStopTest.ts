import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";

describe("ColorStopのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = ColorStopFactory.createInstance(
				2, 0x11
			);
			it("colorが反映されていること。", () => {
				assert(data.color === 0x11);
			});
			it("offsetが反映されていること。", () => {
				assert(data.offset === 2);
			});
		});

		describe("値なし", () => {
			const data = ColorStopFactory.createInstance();
			it("colorが「0x00000000」で補完されていること。", () => {
				assert(data.color === 0x00000000);
			});
			it("offsetが「0」で補完されていること。", () => {
				assert(data.offset === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const json = ColorStopFactory.createInstance(
				2, 0x11
			).toJSON();
			it("offsetが反映されていること。", () => {
				assert(json.offset === 2);
			});
			it("colorが反映されていること。", () => {
				assert(json.color === 0x11);
			});
		});

		describe("初期値", () => {

			const json = ColorStopFactory.createInstance().toJSON();
			it("offsetがundefined。", () => {
				assert(json.color === undefined);
			});
			it("colorがundefined。", () => {
				assert(json.offset === undefined);
			});
		});
	});

	describe("fromJSON", () => {
		describe("値指定", () => {
			const data = ColorStopFactory.fromJSON({
				offset: 1,
				color: 0x11
			});
			it("colorが反映されていること。", () => {
				assert(data.offset === 1);
			});
			it("offsetが反映されていること。", () => {
				assert(data.color === 0x11);
			});
		});

		describe("値なし", () => {
			const data = ColorStopFactory.fromJSON();
			it("colorが「0x00000000」で補完されていること。", () => {
				assert(data.color === 0x00000000);
			});
			it("offsetが「0」で補完されていること。", () => {
				assert(data.offset === 0);
			});
		});
	});
});

