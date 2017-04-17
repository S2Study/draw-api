import * as assert from "power-assert";
import {PointInfoImpl} from "../src/structures/PathItem";
import {QuadraticCurveToFactory} from "../src/structures/QuadraticCurveTo";

describe("QuadraticCurveToのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = QuadraticCurveToFactory.createInstance(
				3, 4, 5, 6
			);
			it("cpxが反映されていること。", () => {
				assert(data.cpx === 3);
			});
			it("cpyが反映されていること。", () => {
				assert(data.cpy === 4);
			});
			it("xが反映されていること。", () => {
				assert(data.x === 5);
			});
			it("yが反映されていること。", () => {
				assert(data.y === 6);
			});
		});

		describe("値なし", () => {
			const data = QuadraticCurveToFactory.createInstance();
			it("cpxが0で補完されていること。", () => {
				assert(data.cpx === 0);
			});
			it("cpyが0で補完されていること。", () => {
				assert(data.cpy === 0);
			});
			it("xが0で補完されていること。", () => {
				assert(data.x === 0);
			});
			it("yが0で補完されていること。", () => {
				assert(data.y === 0);
			});
		});
	});

	describe("pushToArray", () => {

		const data = QuadraticCurveToFactory.createInstance(
			3, 4, 5, 6
		);
		const array: number[] = [];
		const current = new PointInfoImpl();
		current.x = 10;
		current.y = 20;
		data.pushToArray(array, current);

		it("cpxがcurrent xからの相対座標であること。", () => {
			assert(array[0] === -7);
		});
		it("cpyがcurrent yからの相対座標であること。", () => {
			assert(array[1] === -16);
		});
		it("xがcpxからの相対座標であること。", () => {
			assert(array[2] === 2);
		});
		it("yがcpyからの相対座標であること。", () => {
			assert(array[3] === 2);
		});
		it("current xにxが設定されている。", () => {
			assert(current.x === 5);
		});
		it("current yにyが設定されている。", () => {
			assert(current.y === 6);
		});
	});
});

