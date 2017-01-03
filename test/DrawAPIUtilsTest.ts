import * as assert from "power-assert";
import {DrawAPIUtils} from "../src/DrawAPIUtils";

describe("isNullのテスト", () => {

	describe("nullを入力", () => {
		it("trueが返る。", () => {
			assert( DrawAPIUtils.isNull(null) === true );
		});
	});

	describe("undefinedを入力", () => {
		it("trueが返る。", () => {
			assert( DrawAPIUtils.isNull(undefined) === true );
		});
	});

	describe("有効な値を入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isNull("a") === false );
		});
	});
});

describe("isEmptyのテスト", () => {

	describe("nullを入力", () => {
		it("trueが返る。", () => {
			assert( DrawAPIUtils.isEmpty(null) === true );
		});
	});

	describe("undefinedを入力", () => {
		it("trueが返る。", () => {
			assert( DrawAPIUtils.isEmpty(undefined) === true );
		});
	});

	describe("空文字を入力", () => {
		it("trueが返る。", () => {
			assert( DrawAPIUtils.isEmpty("") === true );
		});
	});

	describe("有効な値を入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isEmpty("a") === false );
		});
	});

});

describe("isRationalのテスト", () => {

	describe("nullを入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isRational(null) === false );
		});
	});

	describe("undefinedを入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isRational(undefined) === false );
		});
	});

	describe("NaNを入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isRational(Number.NaN) === false );
		});
	});

	describe("Infinityを入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isRational(Infinity) === false );
		});
	});

	describe("有効な値を入力", () => {
		it("falseが返る。", () => {
			assert( DrawAPIUtils.isRational(15) === true );
		});
	});

});

describe("containsKeyのテスト", () => {

	describe("mapにnullを入力", () => {
		it("falseが返る。", () => {
			assert(DrawAPIUtils.containsKey("b", null) === false);
		});
	});

	describe("mapにundefinedを入力", () => {
		it("falseが返る。", () => {
			assert(DrawAPIUtils.containsKey("b", undefined) === false);
		});
	});

	describe("keyにnullを入力", () => {
		it("falseが返る。", () => {
			assert(DrawAPIUtils.containsKey(null, { "b": 1, "c": 2 }) === false);
		});
	});

	describe("keyにundefinedを入力", () => {
		it("falseが返る。", () => {
			assert(DrawAPIUtils.containsKey(undefined, { "b": 1, "c": 2 }) === false);
		});
	});

	describe("mapに存在しない内容を入力", () => {
		it("falseが返る。", () => {
			assert(DrawAPIUtils.containsKey("d", { "b": 1, "c": 2 }) === false);
		});
	});

	describe("mapに存在する内容を入力", () => {
		it("falseが返る。", () => {
			assert(DrawAPIUtils.containsKey("b", { "b": 1, "c": 2 }) === true);
		});
	});

});

describe("complementのテスト", () => {

	describe("valにnullを入力", () => {
		it("defaultValueで指定した値が返る。", () => {
			assert(DrawAPIUtils.complement(null, "b") === "b");
		});
	});

	describe("valにundefinedを入力", () => {
		it("defaultValueで指定した値が返る。", () => {
			assert(DrawAPIUtils.complement(undefined, "b") === "b");
		});
	});

	describe("valに有効な値を入力", () => {
		it("valで指定した値が返る。", () => {
			assert(DrawAPIUtils.complement<string>("c", "b") === "c" );
		});
	});

});

describe("complementNumberのテスト", () => {

	describe("defaultValueがnull", () => {

		describe("valにnullを入力", () => {
			it("0が返る。", () => {
				assert(DrawAPIUtils.complementNumber(null, null) === 0 );
			});
		});

		describe("valにundefinedを入力", () => {
			it("0が返る。", () => {
				assert(DrawAPIUtils.complementNumber(undefined, null) === 0 );
			});
		});

		describe("valに有効な値を入力", () => {
			it("valで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementNumber(3, null) === 3 );
			});
		});

	});

	describe("defaultValueがundefined", () => {

		describe("valにnullを入力", () => {
			it("0が返る。", () => {
				assert(DrawAPIUtils.complementNumber(null, undefined) === 0 );
			});
		});

		describe("valにundefinedを入力", () => {
			it("0が返る。", () => {
				assert(DrawAPIUtils.complementNumber(undefined, undefined) === 0 );
			});
		});

		describe("valに有効な値を入力", () => {
			it("valで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementNumber(2, undefined) === 2 );
			});
		});

	});

	describe("defaultValueが有効な値", () => {

		describe("valにnullを入力", () => {
			it("defaultValueで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementNumber(null, 5) === 5 );
			});
		});

		describe("valにundefinedを入力", () => {
			it("defaultValueで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementNumber(undefined, 5) === 5 );
			});
		});

		describe("valに有効な値を入力", () => {
			it("valで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementNumber(7, 5) === 7 );
			});
		});

	});
});

describe("complementStringのテスト", () => {

	describe("defaultValueがnull", () => {

		describe("valにnullを入力", () => {
			it("空文字が返る。", () => {
				assert(DrawAPIUtils.complementString(null, null) === "" );
			});
		});

		describe("valにundefinedを入力", () => {
			it("空文字が返る。", () => {
				assert(DrawAPIUtils.complementString(undefined, null) === "" );
			});
		});

		describe("valに有効な値を入力", () => {
			it("valで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementString("bbb", null) === "bbb" );
			});
		});

	});

	describe("defaultValueがundefined", () => {

		describe("valにnullを入力", () => {
			it("空文字が返る。", () => {
				assert(DrawAPIUtils.complementString(null, undefined) === "" );
			});
		});

		describe("valにundefinedを入力", () => {
			it("空文字が返る。", () => {
				assert(DrawAPIUtils.complementString(undefined, undefined) === "" );
			});
		});

		describe("valに有効な値を入力", () => {
			it("valで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementString(undefined, undefined) === "" );
			});
		});

	});

	describe("defaultValueが有効な値", () => {

		describe("valにnullを入力", () => {
			it("defaultValueで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementString(null, "bbb") === "bbb" );
			});
		});

		describe("valにundefinedを入力", () => {
			it("defaultValueで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementString(undefined, "bbb") === "bbb" );
			});
		});

		describe("valに有効な値を入力", () => {
			it("valで指定した値が返る。", () => {
				assert(DrawAPIUtils.complementString("ccc", "bbb") === "ccc" );
			});
		});

	});

});

