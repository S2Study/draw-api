export class DrawAPIUtilsStatic {

	isNull(val: any): boolean {
		return val === null || val === undefined;
	}

	isEmpty(val: string | null | undefined): boolean {
		return val === null || val === undefined || val.length === 0;
	}

	isRational(val: number | null | undefined ): boolean {
		return val !== null && val !== undefined && isNaN(val) === false && isFinite(val) === true;
	}

	containsKey(key: any, map: any): boolean {
		return key !== null && key !== undefined && map !== null && map !== undefined && map[key] !== null && map[key] !== undefined;
	}

	complement<V>(val: V | null | undefined, defaultVal: V): V {
		return ( val === null || val === undefined ) ? defaultVal : val;
	}

	complementNumber(val?: number | null , defaultVal?: number | null): number {
		return ( val === null || val === undefined ) ? ( ( defaultVal === null || defaultVal === undefined ) ? 0 : defaultVal) : val;
	}

	complementString(val?: string | null , defaultVal?: string | null): string {
		return ( val === null || val === undefined ) ? ( ( defaultVal === null || defaultVal === undefined ) ? "" : defaultVal) : val;
	}
}
export const DrawAPIUtils: DrawAPIUtilsStatic = new DrawAPIUtilsStatic();