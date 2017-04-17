import * as assert from "power-assert";
import {PointInfoImpl} from "../src/structures/PathItem";
import {BezierCurveToFactory} from "../src/structures/BezierCurveTo";

describe("BezierCurveToのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = BezierCurveToFactory.createInstance(
				3, 4, 5, 6, 7, 8
			);
			it("cp1xが反映されていること。", () => {
				assert(data.cpx1 === 3);
			});
			it("cp1yが反映されていること。", () => {
				assert(data.cpy1 === 4);
			});
			it("cp2xが反映されていること。", () => {
				assert(data.cpx2 === 5);
			});
			it("cp2yが反映されていること。", () => {
				assert(data.cpy2 === 6);
			});
			it("xが反映されていること。", () => {
				assert(data.x === 7);
			});
			it("yが反映されていること。", () => {
				assert(data.y === 8);
			});
		});

		describe("値なし", () => {
			const data = BezierCurveToFactory.createInstance();
			it("cp1xが0で補完されていること。", () => {
				assert(data.cpx1 === 0);
			});
			it("cp1yが0で補完されていること。", () => {
				assert(data.cpy1 === 0);
			});
			it("cp2xが0で補完されていること。", () => {
				assert(data.cpx2 === 0);
			});
			it("cp2yが0で補完されていること。", () => {
				assert(data.cpy2 === 0);
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

		const data = BezierCurveToFactory.createInstance(
			3, 4, 5, 6, 7, 8
		);
		const array: number[] = [];
		const current = new PointInfoImpl();
		current.x = 10;
		current.y = 20;
		data.pushToArray(array, current);

		it("cp1xがcurrent xからの相対座標であること。", () => {
			assert(array[0] === -7);
		});
		it("cp1yがcurrent yからの相対座標であること。", () => {
			assert(array[1] === -16);
		});
		it("cp2xがcp1xからの相対座標であること。", () => {
			assert(array[2] === 2);
		});
		it("cp2yがcp1yからの相対座標であること。", () => {
			assert(array[3] === 2);
		});
		it("xがcp2xからの相対座標であること。", () => {
			assert(array[4] === 2);
		});
		it("yがcp2yからの相対座標であること。", () => {
			assert(array[5] === 2);
		});
		it("current xにxが設定されている。", () => {
			assert(current.x === 7);
		});
		it("current yにyが設定されている。", () => {
			assert(current.y === 8);
		});
	});
});

