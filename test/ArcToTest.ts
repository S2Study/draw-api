import * as assert from "power-assert";
import {ArcToFactory} from "../src/structures/ArcTo";
import {PointInfoImpl} from "../src/structures/PathItem";

describe("ArcToのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = ArcToFactory.createInstance(
				3, 4, 5, 6, 0.9
			);
			it("x1が反映されていること。", () => {
				assert(data.x1 === 3);
			});
			it("y1が反映されていること。", () => {
				assert(data.y1 === 4);
			});
			it("x2が反映されていること。", () => {
				assert(data.x2 === 5);
			});
			it("y2が反映されていること。", () => {
				assert(data.y2 === 6);
			});
			it("radiusが反映されていること。", () => {
				assert(data.radius === 0.9);
			});
		});

		describe("値なし", () => {
			const data = ArcToFactory.createInstance();
			it("x1が0で補完されていること。", () => {
				assert(data.x1 === 0);
			});
			it("y1が0で補完されていること。", () => {
				assert(data.y1 === 0);
			});
			it("x2が0で補完されていること。", () => {
				assert(data.x2 === 0);
			});
			it("y2が0で補完れていること。", () => {
				assert(data.y2 === 0);
			});
			it("radiusが0で補完されていること。", () => {
				assert(data.radius === 0);
			});
		});
	});

	describe("pushToArray", () => {

		const data = ArcToFactory.createInstance(
			3, 4, 5, 6, 0.9
		);
		const array: number[] = [];
		const current = new PointInfoImpl();
		current.x = 10;
		current.y = 20;
		data.pushToArray(array, current);

		it("x1がcurrent xからの相対座標であること。", () => {
			assert(array[0] === -7);
		});
		it("y1がcurrent yからの相対座標であること。", () => {
			assert(array[1] === -16);
		});
		it("x2がx1からの相対座標であること。", () => {
			assert(array[2] === 2);
		});
		it("y2がy1からの相対座標であること。", () => {
			assert(array[3] === 2);
		});
		it("radiusが設定されていること。", () => {
			assert(array[4] === 0.9);
		});
		it("current xにx2が設定されている。", () => {
			assert(current.x === 5);
		});
		it("current yにy2が設定されている。", () => {
			assert(current.y === 6);
		});
	});
});

