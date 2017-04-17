import * as assert from "power-assert";
import {PointInfoImpl} from "../src/structures/PathItem";
import {LineToFactory} from "../src/structures/LineTo";

describe("LineToのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = LineToFactory.createInstance(
				3, 4
			);
			it("xが反映されていること。", () => {
				assert(data.x === 3);
			});
			it("yが反映されていること。", () => {
				assert(data.y === 4);
			});
		});

		describe("値なし", () => {
			const data = LineToFactory.createInstance();
			it("xが0で補完されていること。", () => {
				assert(data.x === 0);
			});
			it("yが0で補完されていること。", () => {
				assert(data.y === 0);
			});
		});
	});

	describe("pushToArray", () => {

		const data = LineToFactory.createInstance(
			3, 4
		);
		const array: number[] = [];
		const current = new PointInfoImpl();
		current.x = 10;
		current.y = 20;
		data.pushToArray(array, current);

		it("xがcurrent xからの相対座標であること。", () => {
			assert(array[0] === -7);
		});
		it("yがcurrent yからの相対座標であること。", () => {
			assert(array[1] === -16);
		});
		it("current xにxが設定されている。", () => {
			assert(current.x === 3);
		});
		it("current yにyが設定されている。", () => {
			assert(current.y === 4);
		});
	});
});

