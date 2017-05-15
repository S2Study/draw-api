export namespace history {

	import Message = structures.Message;
	import Layer = structures.Layer;
	import Transform = structures.Transform;
	import Clip = structures.Clip;
	import Draw = structures.Draw;

	export interface DrawHistory {

		/**
		 * 履歴番号の一覧を取得する。
		 */
		getHistoryNumbers(): number[];

		/**
		 * 現在の履歴番号を取得する。
		 */
		getNowHistoryNumber(): number;

		/**
		 * 最終履歴番号を取得する。
		 */
		getLastHistoryNumber(): number;

		/**
		 * 初回の履歴番号を取得する。存在しない場合は-1が返る。
		 */
		getFirstHistoryNumber(): number;

		/**
		 * 指定された範囲の履歴を取得する。
		 * @param from
		 * @param to
		 */
		getMoments(from: number, to: number, ignoreLocal?: boolean): DrawMoment[];

		/**
		 * 履歴を計算し、現在のDrawMessageを生成する。
		 */
		generateMessage(ignoreLocal?: boolean | null ): Message;

		/**
		 * 指定されたhistoryNumber時点のレイヤーリストを取得する。
		 * @param historyNumber
		 */
		getLayers(historyNumber?: number | null, ignoreLocal?: boolean | null): string[];

		/**
		 * 更新イベントを待ち受けるリスナーを設定する。
		 * 指定されたcallBackは一度のみ呼び出される。
		 * 継続してイベントを受け取りたい場合は設定側で都度このメソッドを発行する必要がある。
		 * @param callback
		 */
		awaitUpdate(callback: (historyNumber: number) => void): void;

		/**
		 * 有効な履歴かどうか
		 * @param historyNumber
		 */
		isAvailable(historyNumber?: number | null ): boolean;

		/**
		 * 編集セッションを開始する。
		 * @param noWait 現在ロックしている編集セッションを強制的に解除するかどうか。
		 */
		lock(noWait?: boolean | null): Promise<DrawHistoryEditSession>;
	}

	export interface NumberGenerator {
		generateNumber(): number;
	}
	export interface KeyGenerator {
		generateKey(): string;
	}

	export interface DrawHistoryEditSession {

		/**
		 * セッションが有効かどうか
		 */
		isAlive(): boolean;

		/**
		 * 履歴番号を設定する。<br />
		 * 現在の履歴番号に指定値の履歴番号が存在しない場合は指定値以下で最も大きい履歴番号が設定される。
		 * 以降の更新メソッドが発生した際、指定値より大きい履歴が削除される。
		 * @param historyNumber
		 * @param clearFuture 指定されたhistoryNumberより先の履歴を削除するかどうか。デフォルト値はfalse
		 */
		setHistoryNumberNow(historyNumber: number, clearFuture?: boolean | null): number;

		/**
		 * 履歴をクリアする。
		 */
		clear(): void;

		/**
		 * 新しいレイヤーを追加する。
		 * @param layer
		 * @param isLocal
		 */
		addLayer(layer: Layer, isLocal?: boolean | null ): DrawMoment;

		/**
		 * 指定されたIDのレイヤーを削除する。
		 * @param layerId
		 */
		removeLayer(layerId: string): void;

		/**
		 * 編集履歴を積み上げる。
		 * 結果はcommit時に反映する。
		 */
		addMoment(): DrawMomentBuilder;

		/**
		 * 編集セッションを解放する。
		 */
		release(): void;
	}

	export interface DrawMomentBuilder {

		putLayerMoment(key: string): DrawLayerMomentBuilder;

		setSequence(sequence: string[]): DrawMomentBuilder;

		commit(): DrawMoment;
	}

	/**
	 * 履歴アイテム
	 */
	export interface DrawMoment {

		/**
		 * 履歴番号
		 */
		getHistoryNumber(): number;

		/**
		 * CanvasId毎の変更マッピング。
		 */
		getKeys(): string[];
		getLayerMoment(key: string): DrawLayerMoment | null;

		/**
		 * Canvasの表示順　背面であるほど小さい添字。
		 * 更新される毎に全件分設定され、ここにないCanvasは削除扱いとする。
		 */
		getSequence(): string[];
	}

	export interface DrawLayerMomentBuilder {

		setTransForm(transform: Transform): DrawLayerMomentBuilder;

		setClip(clip: Clip): DrawLayerMomentBuilder;

		addDraw(draw: Draw): DrawLayerMomentBuilder;

		addDraws(draw: Draw[]): DrawLayerMomentBuilder;

		commit(): DrawMomentBuilder;
	}

	/**
	 * Canvas毎の履歴アイテム
	 */
	export interface DrawLayerMoment {

		/**
		 * CanvasId
		 */
		getCanvasId(): string;

		/**
		 * Canvas全体の変形成分。
		 * 変更がある場合は毎回全体上書き。
		 */
		getTransform(): Transform | null;

		/**
		 * Canvasの切り抜き。
		 * 変更がある場合は毎回全体上書き。<br />
		 * 切り抜きしたくない場合はpathの値がnullな空のClipを設定する。
		 */
		getClip(): Clip | null;

		/**
		 * 書き込み履歴（追加分のみ）
		 */
		getDraws(): Draw[];
	}
}

export namespace renderer {
	import Draw = structures.Draw;
	import Clip = structures.Clip;
	import Transform = structures.Transform;
	export interface DrawchatRenderer {

		width: number;
		height: number;

		/**
		 * レイヤーの数を取得します。
		 */
		size(): number;

		/**
		 * レイヤーの前面＞背面の順序を変更する。
		 * @param order 元の添字を格納したリスト。リストの添字順にソートされる。
		 */
		sortLayer(order: number[]): void;

		/**
		 * 指定された添字のレイヤーを削除する。
		 * @param index
		 */
		removeLayer(index: number): void;

		/**
		 * レイヤーを新規に追加する。<br />
		 * 追加したレイヤーの添字
		 */
		addLayer(): number;

		/**
		 * 指定された添字のレイヤーを一から描画する。
		 * @param index 対象レイヤーの添字
		 * @param draws 差分描画内容
		 * @param transform 変形成分
		 * @param clip くりぬきの指定
		 */
		render(
			index: number,
			draws: Draw[],
			transform?: Transform | null,
			clip?: Clip | null): void;

		/**
		 * 指定された添字のレイヤーに対し、差分を描画する。
		 * @param index 対象レイヤーの添字
		 * @param draws 差分描画内容
		 */
		renderDiff(
			index: number,
			draws: Draw[]
		): void;

		/**
		 * 描画内容を全てクリアする。
		 */
		clear(): void;

		/**
		 * 画像をbase64化したデータを取得する。
		 */
		createImageDataURI(): string;

		/**
		 * 指定された添字のレイヤーを表示状態に設定する。
		 * 引数が指定されていない場合は全件表示。
		 * @param target
		 */
		show(target?: number[] | null): void;

		/**
		 * 指定された添字のレイヤーを非表示状態に設定する。
		 * 引数が指定されていない場合は全件非表示。
		 * @param target
		 */
		hide(target?: number[] | null): void;

		/**
		 * 指定されたピクセル座標の色成分を取得する。
		 * r,g,b,aの配列を返す。
		 */
		getPixelColor(
			x: number,
			y: number,
			layerIndex: number
		): number[];
	}
}

export namespace structures {

	export interface StructuresItem {
		toJSON(): any;
	}
	export interface Messages extends StructuresItem {
		message: Message[];
	}
	export interface Message extends StructuresItem {
		id: string;
		seq: number;
		author: string;
		time: number;
		title: string;
		canvas: Layer[];
	}
	export interface Layer extends StructuresItem {
		readonly transform: Transform;
		readonly clip: Clip | null;
		readonly draws: Draw[];
	}
	export interface Transform extends StructuresItem {
		readonly a: number;
		readonly b: number;
		readonly c: number;
		readonly d: number;
		readonly x: number;
		readonly y: number;
		readonly isDefault: boolean;
	}
	export interface Clip extends StructuresItem {
		readonly transform: Transform;
		readonly path: PathItem[];
	}
	export interface PointInfo {
		type: number;
		x: number;
		y: number;
	}
	export interface PathItem {
		readonly type: number;
		pushToArray(array: number[], current: PointInfo): void;
	}
	export interface MoveTo extends PathItem {
		readonly x: number;
		readonly y: number;
	}
	export interface ArcTo extends PathItem {
		readonly x1: number;
		readonly y1: number;
		readonly x2: number;
		readonly y2: number;
		readonly radius: number;
	}
	export interface LineTo extends PathItem {
		readonly x: number;
		readonly y: number;
	}
	export interface QuadraticCurveTo extends PathItem {
		readonly cpx: number;
		readonly cpy: number;
		readonly x: number;
		readonly y: number;
	}
	export interface BezierCurveTo extends PathItem {
		readonly cpx1: number;
		readonly cpy1: number;
		readonly cpx2: number;
		readonly cpy2: number;
		readonly x: number;
		readonly y: number;
	}

	export interface Draw extends StructuresItem {
		readonly transform: Transform;
		readonly compositeOperation: number;
	}
	export interface GraphicsDraw extends Draw {
		readonly graphics: Graphic[];
	}
	export interface Graphic extends StructuresItem {
		readonly fill: Fill | null;
		readonly stroke: Stroke | null;
		readonly path: PathItem[];
	}

	export interface Fill extends StructuresItem {
		readonly color: number;
		readonly linerGradient: LinerGradient | null;
		readonly radialGradient: RadialGradient | null;
	}
	export interface LinerGradient extends StructuresItem {
		readonly x0: number;
		readonly y0: number;
		readonly x1: number;
		readonly y1: number;
		readonly colorStops: ColorStop[];
	}
	export interface ColorStop extends StructuresItem {
		readonly offset: number;
		readonly color: number;
	}
	export interface RadialGradient extends StructuresItem {
		readonly x0: number;
		readonly y0: number;
		readonly r0: number;
		readonly x1: number;
		readonly y1: number;
		readonly r1: number;
		readonly colorStops: ColorStop[];
	}
	export interface Stroke extends StructuresItem {
		readonly fillStyle: Fill;
		readonly dash: Dash | null;
		readonly style: StrokeStyle;
	}
	export interface Dash extends StructuresItem {
		readonly segments: number[];
		readonly offset: number;
	}
	export interface StrokeStyle extends StructuresItem {
		readonly thickness: number;
		readonly caps: number;
		readonly joints: number;
		readonly miterLimit: number;
		readonly ignoreScale: number;
	}
	export interface TextDraw extends Draw {
		readonly text: Text;
	}
	export interface Text extends StructuresItem {
		readonly x: number;
		readonly y: number;
		readonly fontFamily: string;
		readonly size: number;
		readonly weight: number;
		readonly style: number;
		readonly fill: Fill | null;
		readonly stroke: Stroke | null;
		// readonly align: string;
		// readonly baseline: string;
		readonly text: string;
	}
}
