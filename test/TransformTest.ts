import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {TransformFactory} from "../src/structures/Transform";

describe("Transformのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data =  TransformFactory.createInstance(
				2, 3, 4, 5, 6, 7
			);
			it("xが設定されていること。", () => {
				assert(data.x === 2);
			});
			it("yが設定されていること。", () => {
				assert(data.y === 3);
			});
			it("aが設定されていること。", () => {
				assert(data.a === 4);
			});
			it("bが設定されていること。", () => {
				assert(data.b === 5);
			});
			it("cが設定されていること。", () => {
				assert(data.c === 6);
			});
			it("dが設定されていること。", () => {
				assert(data.d === 7);
			});
		});

		describe("値なし", () => {
			const data = TransformFactory.createInstance();
			it("aが1。", () => {
				assert(data.a === 1);
			});
			it("bが0。", () => {
				assert(data.b === 0);
			});
			it("cが0。", () => {
				assert(data.c === 0);
			});
			it("dが1。", () => {
				assert(data.d === 1);
			});
			it("xが0。", () => {
				assert(data.x === 0);
			});
			it("yが0。", () => {
				assert(data.y === 0);
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data =  TransformFactory.createInstance(
				2, 3, 4, 5, 6, 7
			).toJSON();
			it("xが設定されていること。", () => {
				assert(data[0] === 2);
			});
			it("yが設定されていること。", () => {
				assert(data[1] === 3);
			});
			it("aが設定されていること。", () => {
				assert(data[2] === 4);
			});
			it("bが設定されていること。", () => {
				assert(data[3] === 5);
			});
			it("cが設定されていること。", () => {
				assert(data[4] === 6);
			});
			it("dが設定されていること。", () => {
				assert(data[5] === 7);
			});
		});

		describe("初期値", () => {

			const json = TransformFactory.createInstance().toJSON();
			it("空の配列が返る。", () => {
				assert(json.length === 0);
			});
		});
		describe("dが1", () => {

			const json = TransformFactory.createInstance(
				0, 0, 1, 0, 2, 1
			).toJSON();

			it("長さ5の配列が返る。", () => {
				assert(json.length === 5);
			});
		});
		describe("dが1,cが0", () => {

			const json = TransformFactory.createInstance(
				0, 0, 1, 3, 0, 1
			).toJSON();

			it("長さ4の配列が返る。", () => {
				assert(json.length === 4);
			});
		});
		describe("dが1,cが0,bが0", () => {

			const json = TransformFactory.createInstance(
				0, 0, 3, 0, 0, 1
			).toJSON();

			it("長さ3の配列が返る。", () => {
				assert(json.length === 3);
			});
		});
		describe("dが1,cが0,bが0,aが1", () => {

			const json = TransformFactory.createInstance(
				0, 3, 1, 0, 0, 1
			).toJSON();

			it("長さ2の配列が返る。", () => {
				assert(json.length === 2);
			});
		});
		describe("dが1,cが0,bが0,aが1,yが0", () => {

			const json = TransformFactory.createInstance(
				2, 0, 1, 0, 0, 1
			).toJSON();

			it("長さ1の配列が返る。", () => {
				assert(json.length === 1);
			});
		});
		describe("dが1,cが0,bが0,aが1,yが0,xが0", () => {

			const json = TransformFactory.createInstance(
				0, 0, 1, 0, 0, 1
			).toJSON();

			it("長さ0の配列が返る。", () => {
				assert(json.length === 0);
			});
		});
	});

	describe("fromJSON", () => {
		describe("値指定", () => {
			const data = TransformFactory.fromJSON([
				2, 3, 4, 5, 6, 7
			]);
			it("xが設定されていること。", () => {
				assert(data.x === 2);
			});
			it("yが設定されていること。", () => {
				assert(data.y === 3);
			});
			it("aが設定されていること。", () => {
				assert(data.a === 4);
			});
			it("bが設定されていること。", () => {
				assert(data.b === 5);
			});
			it("cが設定されていること。", () => {
				assert(data.c === 6);
			});
			it("dが設定されていること。", () => {
				assert(data.d === 7);
			});
		});

		describe("値なし", () => {
			const data = TransformFactory.fromJSON();
			it("aが1。", () => {
				assert(data.a === 1);
			});
			it("bが0。", () => {
				assert(data.b === 0);
			});
			it("cが0。", () => {
				assert(data.c === 0);
			});
			it("dが1。", () => {
				assert(data.d === 1);
			});
			it("xが0。", () => {
				assert(data.x === 0);
			});
			it("yが0。", () => {
				assert(data.y === 0);
			});
		});
	});
});

