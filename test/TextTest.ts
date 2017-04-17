import * as assert from "power-assert";
import {ColorStopFactory} from "../src/structures/ColorStop";
import {DashFactory} from "../src/structures/Dash";
import {FillFactory} from "../src/structures/Fill";
import {LinerGradientFactory} from "../src/structures/LinerGradient";
import {RadialGradientFactory} from "../src/structures/RadialGradient";
import {StrokeStyleFactory} from "../src/structures/StrokeStyle";
import {TextFactory} from "../src/structures/Text";
import {StrokeFactory} from "../src/structures/Stroke";

describe("Textのテスト", () => {

	describe("createInstance", () => {

		describe("値指定", () => {
			const data = TextFactory.createInstance(
				"aaa",
				2,
				3,
				4,
				FillFactory.createInstance(0x43),
				StrokeFactory.createInstance(FillFactory.createInstance(0x44)),
				"serif",
				5,
				6
			);
			it("xが反映されていること。", () => {
				assert(data.x === 2);
			});
			it("yが反映されていること。", () => {
				assert(data.y === 3);
			});
			it("fontFamilyが反映されていること。", () => {
				assert(data.fontFamily === "serif");
			});
			it("sizeが反映されていること。", () => {
				assert(data.size === 4);
			});
			it("weightが反映されていること。", () => {
				assert(data.weight === 5);
			});
			it("styleが反映されていること。", () => {
				assert(data.style === 6);
			});
			it("fillが反映されていること。", () => {
				assert(data.fill!.color === 0x43);
			});
			it("strokeが反映されていること。", () => {
				assert(data.stroke!.fillStyle!.color === 0x44);
			});
			it("textが反映されていること。", () => {
				assert(data.text === "aaa");
			});
		});

		describe("値なし", () => {
			const data = TextFactory.createInstance();
			it("xに「0」が設定されていること。", () => {
				assert(data.x === 0);
			});
			it("yに「0」が設定されていること。", () => {
				assert(data.y === 0);
			});
			it("fontFamilyに「sans-serif」が設定されていること。", () => {
				assert(data.fontFamily === "sans-serif");
			});
			it("sizeに「12」が設定されていること。", () => {
				assert(data.size === 12);
			});
			it("weightに「4」が設定されていること。", () => {
				assert(data.weight === 4);
			});
			it("styleに「0」が設定されてこと。", () => {
				assert(data.style === 0);
			});
			it("fillに「null」が設定されていること。", () => {
				assert(data.fill === null);
			});
			it("strokeに「null」が設定されていること。", () => {
				assert(data.stroke === null);
			});
			it("textに空テキストが設定されていること。", () => {
				assert(data.text === "");
			});
		});
	});

	describe("toJSON", () => {

		describe("値あり", () => {

			const data = TextFactory.createInstance(
				"aaa",
				2,
				3,
				4,
				FillFactory.createInstance(0x43),
				StrokeFactory.createInstance(FillFactory.createInstance(0x44)),
				"serif",
				5,
				6
			).toJSON();

			it("xが反映されていること。", () => {
				assert(data.x === 2);
			});
			it("yが反映されていること。", () => {
				assert(data.y === 3);
			});
			it("fontFamilyが反映されていること。", () => {
				assert(data.fontFamily === "serif");
			});
			it("sizeが反映されていること。", () => {
				assert(data.size === 4);
			});
			it("weightが反映されていること。", () => {
				assert(data.weight === 5);
			});
			it("styleが反映されていること。", () => {
				assert(data.style === 6);
			});
			it("fillが反映されていること。", () => {
				assert(data.fill!.color === 0x43);
			});
			it("strokeが反映されていること。", () => {
				assert(data.stroke!.fillStyle!.color === 0x44);
			});
			it("textが反映されていること。", () => {
				assert(data.text === "aaa");
			});
		});

		describe("初期値", () => {

			const data = TextFactory.createInstance().toJSON();

			it("xがundefined。", () => {
				assert(data.thickness === undefined);
			});
			it("yがundefined。", () => {
				assert(data.caps === undefined);
			});
			it("fontFamilyがundefined。", () => {
				assert(data.joints === undefined);
			});
			it("sizeがundefined。", () => {
				assert(data.miterLimit === undefined);
			});
			it("weightがundefined。", () => {
				assert(data.ignoreScale === undefined);
			});
			it("styleがundefined。", () => {
				assert(data.ignoreScale === undefined);
			});
			it("fillがundefined。", () => {
				assert(data.ignoreScale === undefined);
			});
			it("strokeがundefined。", () => {
				assert(data.ignoreScale === undefined);
			});
			it("textがundefined。", () => {
				assert(data.ignoreScale === undefined);
			});
		});
	});

	describe("fromJSON", () => {

		describe("値指定", () => {
			const data = TextFactory.fromJSON({
				text: "aaa",
				x: 2,
				y: 3,
				size: 4,
				fill: FillFactory.createInstance(0x43).toJSON(),
				stroke: StrokeFactory.createInstance(FillFactory.createInstance(0x44)).toJSON(),
				fontFamily: "serif",
				weight: 5,
				style: 6
			});
			it("xが反映されていること。", () => {
				assert(data.x === 2);
			});
			it("yが反映されていること。", () => {
				assert(data.y === 3);
			});
			it("fontFamilyが反映されていること。", () => {
				assert(data.fontFamily === "serif");
			});
			it("sizeが反映されていること。", () => {
				assert(data.size === 4);
			});
			it("weightが反映されていること。", () => {
				assert(data.weight === 5);
			});
			it("styleが反映されていること。", () => {
				assert(data.style === 6);
			});
			it("fillが反映されていること。", () => {
				assert(data.fill!.color === 0x43);
			});
			it("strokeが反映されていること。", () => {
				assert(data.stroke!.fillStyle!.color === 0x44);
			});
			it("textが反映されていること。", () => {
				assert(data.text === "aaa");
			});
		});

		describe("値なし", () => {
			const data = TextFactory.fromJSON();
			it("xに「0」が設定されていること。", () => {
				assert(data.x === 0);
			});
			it("yに「0」が設定されていること。", () => {
				assert(data.y === 0);
			});
			it("fontFamilyに「sans-serif」が設定されていること。", () => {
				assert(data.fontFamily === "sans-serif");
			});
			it("sizeに「12」が設定されていること。", () => {
				assert(data.size === 12);
			});
			it("weightに「4」が設定されていること。", () => {
				assert(data.weight === 4);
			});
			it("styleに「0」が設定されてこと。", () => {
				assert(data.style === 0);
			});
			it("fillに「null」が設定されていること。", () => {
				assert(data.fill === null);
			});
			it("strokeに「null」が設定されていること。", () => {
				assert(data.stroke === null);
			});
			it("textに空テキストが設定されていること。", () => {
				assert(data.text === "");
			});
		});

	});
});

