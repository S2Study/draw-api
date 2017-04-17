export class DrawAPIUtilsStatic {

	/**
	 * Nullもしくはundefinedかを判断する。
	 * @param val
	 * @returns {boolean}
	 */
	isNull(val: any): boolean {
		return val === null || val === undefined;
	}

	/**
	 * 1文字以上の文字列が存在するかを判断する。
	 * @param val
	 * @returns {boolean}
	 */
	isEmpty(val: string | null | undefined): boolean {
		return val === null || val === undefined || val.length === 0;
	}

	/**
	 * 有理数かどうかを判断する。
	 * @param val
	 * @returns {boolean}
	 */
	isRational(val: number | null | undefined ): boolean {
		return val !== null && val !== undefined && isNaN(val) === false && isFinite(val) === true;
	}

	/**
	 * Map内に値があるかどうかを判断する。
	 * @param key
	 * @param map
	 * @returns {boolean}
	 */
	containsKey(key: any, map: any): boolean {
		return key !== null && key !== undefined && map !== null && map !== undefined && map[key] !== null && map[key] !== undefined;
	}

	/**
	 * nullもしくはundefinedの場合defaultValで補完する。
	 * @param val
	 * @param defaultVal
	 * @returns {V|undefined}
	 */
	complement<V>(val: V | null | undefined, defaultVal: V): V {
		return ( val === null || val === undefined ) ? defaultVal : val;
	}

	/**
	 * nullもしくはundefinedの場合defaultValで補完するdefaultValが指定されてない場合は0を補完する。
	 * @param val
	 * @param defaultVal
	 * @returns {number}
	 */
	complementNumber(val?: number | null , defaultVal?: number | null): number {
		return ( val === null || val === undefined ) ? ( ( defaultVal === null || defaultVal === undefined ) ? 0 : defaultVal) : val;
	}

	/**
	 * nullもしくはundefinedの場合defaultValで補完するdefaultValが指定されてない場合は空文字を補完する。
	 * @param val
	 * @param defaultVal
	 * @returns {string|string}
	 */
	complementString(val?: string | null , defaultVal?: string | null): string {
		return ( val === null || val === undefined ) ? ( ( defaultVal === null || defaultVal === undefined ) ? "" : defaultVal) : val;
	}
}
export const DrawAPIUtils: DrawAPIUtilsStatic = new DrawAPIUtilsStatic();