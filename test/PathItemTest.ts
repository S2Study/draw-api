import * as assert from "power-assert";
import {PathItemsFactory, PathItemsUtil, PointInfoImpl} from "../src/structures/PathItem";
import {MoveToFactory} from "../src/structures/MoveTo";
import {structures} from "../src/index";
import MoveTo = structures.MoveTo;
import ArcTo = structures.ArcTo;
import QuadraticCurveTo = structures.QuadraticCurveTo;
import LineTo = structures.LineTo;
import BezierCurveTo = structures.BezierCurveTo;
import {LineToFactory} from "../src/structures/LineTo";

describe("PathItemのテスト", () => {

	describe("PathItemFactory", () => {

		describe("値無し", () => {
			const data = PathItemsFactory.createInstance();
			it("空の配列が返ること。", () => {
				assert(data.length === 0);
			});
		});

		describe("moveTo", () => {
			const data = PathItemsFactory.createInstance(
				[[0, 1, 2, 3, 4]]
			);
			it("typeが0であること。", () => {
				assert(data[0].type === 0);
				assert(data[1].type === 0);
			});
			it("xが反映されていること。", () => {
				assert((<MoveTo>data[0]).x === 1);
				assert((<MoveTo>data[1]).x === 4);
			});
			it("yが反映されていること。", () => {
				assert((<MoveTo>data[0]).y === 2);
				assert((<MoveTo>data[1]).y === 6);
			});
		});

		describe("arcTo", () => {
			const data = PathItemsFactory.createInstance(
				[[1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]]
			);
			it("typeが1であること。", () => {
				assert(data[0].type === 1);
				assert(data[1].type === 1);
			});
			it("x1が反映されていること。", () => {
				assert((<ArcTo>data[0]).x1 === 1);
				assert((<ArcTo>data[1]).x1 === 10);
			});
			it("y1が反映されていること。", () => {
				assert((<ArcTo>data[0]).y1 === 2);
				assert((<ArcTo>data[1]).y1 === 13);
			});
			it("x2が反映されていること。", () => {
				assert((<ArcTo>data[0]).x2 === 4);
				assert((<ArcTo>data[1]).x2 === 18);
			});
			it("y2が反映されていること。", () => {
				assert((<ArcTo>data[0]).y2 === 6);
				assert((<ArcTo>data[1]).y2 === 22);
			});
			it("rが反映されていること。", () => {
				assert((<ArcTo>data[0]).radius === 5);
				assert((<ArcTo>data[1]).radius === 10);
			});
		});

		describe("quadraticCurveTo", () => {
			const data = PathItemsFactory.createInstance(
				[[2, 1, 2, 3, 4, 5, 6, 7, 8]]
			);
			it("typeが2であること。", () => {
				assert(data[0].type === 2);
				assert(data[1].type === 2);
			});
			it("cpxが反映されていること。", () => {
				assert((<QuadraticCurveTo>data[0]).cpx === 1);
				assert((<QuadraticCurveTo>data[1]).cpx === 9);
			});
			it("cpyが反映されていること。", () => {
				assert((<QuadraticCurveTo>data[0]).cpy === 2);
				assert((<QuadraticCurveTo>data[1]).cpy === 12);
			});
			it("xが反映されていること。", () => {
				assert((<QuadraticCurveTo>data[0]).x === 4);
				assert((<QuadraticCurveTo>data[1]).x === 16);
			});
			it("yが反映されていること。", () => {
				assert((<QuadraticCurveTo>data[0]).y === 6);
				assert((<QuadraticCurveTo>data[1]).y === 20);
			});
		});

		describe("lineTo", () => {
			const data = PathItemsFactory.createInstance(
				[[3, 1, 2, 3, 4]]
			);
			it("typeが3であること。", () => {
				assert(data[0].type === 3);
				assert(data[1].type === 3);
			});
			it("xが反映されていること。", () => {
				assert((<LineTo>data[0]).x === 1);
				assert((<LineTo>data[1]).x === 4);
			});
			it("yが反映されていること。", () => {
				assert((<LineTo>data[0]).y === 2);
				assert((<LineTo>data[1]).y === 6);
			});
		});

		describe("bezierCurveTo", () => {
			const data = PathItemsFactory.createInstance(
				[[4, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]]
			);
			it("typeが4であること。", () => {
				assert((<BezierCurveTo>data[0]).type === 4);
				assert((<BezierCurveTo>data[1]).type === 4);
			});
			it("cp1xが反映されていること。", () => {
				assert((<BezierCurveTo>data[0]).cpx1 === 1);
				assert((<BezierCurveTo>data[1]).cpx1 === 16);
			});
			it("cp1yが反映されていること。", () => {
				assert((<BezierCurveTo>data[0]).cpy1 === 2);
				assert((<BezierCurveTo>data[1]).cpy1 === 20);
			});
			it("cp2xが反映されていること。", () => {
				assert((<BezierCurveTo>data[0]).cpx2 === 4);
				assert((<BezierCurveTo>data[1]).cpx2 === 25);
			});
			it("cp2yが反映されていること。", () => {
				assert((<BezierCurveTo>data[0]).cpy2 === 6);
				assert((<BezierCurveTo>data[1]).cpy2 === 30);
			});
			it("xが反映されていること。", () => {
				assert((<BezierCurveTo>data[0]).x === 9);
				assert((<BezierCurveTo>data[1]).x === 36);
			});
			it("yが反映されていること。", () => {
				assert((<BezierCurveTo>data[0]).y === 12);
				assert((<BezierCurveTo>data[1]).y === 42);
			});
		});

		describe("複数種類", () => {
			const data = PathItemsFactory.createInstance(
				[[0, 1, 2], [3, 3, 4]]
			);
			it("typeの解析が正しいこと。", () => {
				assert(data[0].type === 0);
				assert(data[1].type === 3);
			});
			it("直前種別からの相対パスであること。", () => {
				assert((<MoveTo>data[0]).x === 1);
				assert((<MoveTo>data[0]).y === 2);
				assert((<LineTo>data[1]).x === 4);
				assert((<LineTo>data[1]).y === 6);
			});
		});
	});

	describe("toArray", () => {

		describe("値なし", () => {
			const data = PathItemsUtil.toArray(
				[]
			);
			it("空の配列が返却されること。", () => {
				assert(data.length === 0);
			});
		});

		describe("toArray", () => {

			const data = PathItemsUtil.toArray([
				LineToFactory.createInstance(1 , 2),
				LineToFactory.createInstance(3 , 4),
				MoveToFactory.createInstance(5 , 6),
			]);

			it("同一種別が連続する場合は同一array。", () => {
				assert(data[0][0] === 3);
				assert(data[0][1] === 1);
				assert(data[0][2] === 2);
				assert(data[0][3] === 2);
				assert(data[0][4] === 2);
			});
			it("種別が異なる場合は別のarray。", () => {
				assert(data[1][0] === 0);
				assert(data[1][1] === 2);
				assert(data[1][2] === 2);
			});
		});
	});
});

