
// export namespace editor {
//
// 	/**
// 	 * Color definition
// 	 */
// 	export interface Color {
// 		r: number;
// 		g: number;
// 		b: number;
// 	}
//
// 	/**
// 	 * Definition of properties to set in the editor.
// 	 */
// 	export interface DrawEditorProperties {
//
// 		/**
// 		 * Specify fill or stroke color
// 		 */
// 		color: Color;
//
// 		/**
// 		 *
// 		 */
// 		thickness: number;
//
// 		/**
// 		 * Specify font size in pixel value
// 		 */
// 		fontSize: number;
//
// 		/**
// 		 * Font family name
// 		 */
// 		fontFamily: string;
//
// 		/**
// 		 * Specify font thickness
// 		 */
// 		fontWeight: number;
//
// 		/**
// 		 * Designation of font style such as italic
// 		 */
// 		fontStyle: string;
//
// 		/**
// 		 * Specifying transparency
// 		 */
// 		alpha: number;
//
// 		/**
// 		 * Path types
// 		 * 0: moveTo <br />
// 		 * 1: arcTo <br />
// 		 * 2: quadraticCurveTo <br />
// 		 * 3: lineTo <br />
// 		 * 4: bezierCurveTo <br />
// 		 */
// 		pathType: number;
// 	}
//
// 	export interface EventListener<F extends Function> {
// 		on(listener: F): DrawEditorEventListeners;
// 		once(listener: F): DrawEditorEventListeners;
// 		off(listener: F): DrawEditorEventListeners;
// 	}
//
// 	/**
// 	 * プロパティ変更の通知を受け取るリスナーの定義
// 	 */
// 	export interface ChangePropertiesListener {
// 		( properties: DrawEditorProperties ): void;
// 	}
// 	/**
// 	 * プロパティ変更通知に関するアクセスを行うインターフェースの定義
// 	 */
// 	export interface ChangeProperties extends EventListener<ChangePropertiesListener> { }
//
// 	/**
// 	 * モード変更の通知を受け取るリスナーの定義
// 	 */
// 	export interface ModeChangeListener {
// 		( layerNumber: number ): void;
// 	}
// 	/**
// 	 * モード変更通知に関するアクセスを行うインターフェースの定義
// 	 */
// 	export interface ModeChange extends EventListener<ModeChangeListener> { }
//
// 	/**
// 	 * レイヤー変更の通知を受け取るリスナーの定義
// 	 */
// 	export interface ChangeCurrentLayerListener {
// 		( mode: number ): void;
// 	}
// 	/**
// 	 * レイヤー変更通知に関するアクセスを行うインターフェースの定義
// 	 */
// 	export interface ChangeCurrentLayer extends EventListener<ChangeCurrentLayerListener> { }
//
// 	/**
// 	 * キャンバスの変更通知を受け取るリスナーの定義
// 	 */
// 	export interface UpdateListener {
// 		(): void;
// 	}
// 	/**
// 	 * キャンバスの変更通知に関するアクセスを行うインターフェースの定義
// 	 */
// 	export interface Update extends EventListener<UpdateListener> { }
// 	/**
// 	 * エディタイベントへのアクセスを行うインターフェス
// 	 */
// 	export interface DrawEditorEventListeners {
//
// 		/**
// 		 * プロパティ変更通知
// 		 */
// 		readonly changeProperties: ChangeProperties;
//
// 		/**
// 		 * 編集モード編集通知
// 		 */
// 		readonly changeMode: ModeChange;
//
// 		/**
// 		 * 編集レイヤー変更通知
// 		 */
// 		readonly changeCurrentLayer: ChangeCurrentLayer;
//
// 		/**
// 		 * 更新通知
// 		 */
// 		readonly update: Update;
// 	}
//
// 	export interface DrawEditorModeChanger {
//
// 		/**
// 		 * モードチェンジ中
// 		 */
// 		readonly CHANGING: number;
//
// 		/**
// 		 * 消しゴムツールを示す定数
// 		 */
// 		readonly ERASER_MODE: number;
//
// 		/**
// 		 * 塗りツールを示す定数
// 		 */
// 		readonly FILL_MODE: number;
//
// 		/**
// 		 * 線ツールを示す定数
// 		 */
// 		readonly STROKE_MODE: number;
//
// 		/**
// 		 * クリップツールを示す定数
// 		 */
// 		readonly CLIP_MODE: number;
//
// 		/**
// 		 * テキストツールを示す定数
// 		 */
// 		readonly TEXT_MODE: number;
//
// 		/**
// 		 * 手のひらツールを示す定数
// 		 */
// 		readonly HAND_TOOL_MODE: number;
//
// 		/**
// 		 * スポイトツールを示す定数
// 		 */
// 		readonly EYEDROPPER_MODE: number;
//
// 		/**
// 		 * 現在のモードを取得する。
// 		 */
// 		getMode(): number;
//
// 		/**
// 		 * モード変更
// 		 */
// 		changeMode(mode: number): Promise<any>;
//
// 		isAliveMode(mode: number): boolean;
// 	}
//
// 	export interface DrawEditorLayers {
//
// 		/**
// 		 * レイヤー数
// 		 */
// 		layerCount(): Promise<number>;
//
// 		/**
// 		 * レイヤー切り替え
// 		 * @param index
// 		 */
// 		setCurrent(index: number): Promise<any>;
//
// 		/**
// 		 * 現在レイヤー
// 		 */
// 		getCurrent(): Promise<number>;
//
// 		/**
// 		 * 指定レイヤーの表示
// 		 * @param index
// 		 */
// 		show(index: number): void;
//
// 		/**
// 		 * 指定レイヤーの非表示
// 		 * @param index
// 		 */
// 		hide(index: number): void;
//
// 		/**
// 		 * レイヤー全非表示
// 		 */
// 		hideAll(): void;
//
// 		/**
// 		 * レイヤーの全表示
// 		 */
// 		showAll(): void;
//
// 		/**
// 		 * レイヤーの削除
// 		 * @param index
// 		 */
// 		remove(index: number): Promise<any>;
//
// 		/**
// 		 *  レイヤーの追加
// 		 */
// 		addLayer(): Promise<any>;
//
// 		/**
// 		 * レイヤーの順序移動
// 		 * @param index
// 		 */
// 		moveTo(index: number): Promise<any>;
// 	}
//
// 	export interface DrawEditorCanvas {
//
// 		/**
// 		 * MouseDownもしくはTouchStartイベントを通知する。
// 		 * Canvasの左上を0,0とした座標を設定する。
// 		 * @param x
// 		 * @param y
// 		 */
// 		touchStart(x: number, y: number): void;
//
// 		/**
// 		 * ドラッグもしくはTouchMoveイベントを通知する。
// 		 * @param x
// 		 * @param y
// 		 */
// 		touchMove(x: number, y: number): void;
//
// 		/**
// 		 * MouseUpもしくはTouchEndイベントを取得する。
// 		 * Canvasの左上を0,0とした座標を設定する。
// 		 * @param x
// 		 * @param y
// 		 */
// 		touchEnd(x: number, y: number): void;
//
// 		/**
// 		 * テキストを設定する。
// 		 * @param text
// 		 */
// 		setText(text: string): void;
//
// 		/**
// 		 * 座標設定の履歴を元に戻す。
// 		 */
// 		backward(): void;
// 	}
//
// 	export interface DrawEditor {
//
// 		/**
// 		 * Canvasの幅
// 		 */
// 		getWidth(): number;
//
// 		/**
// 		 * Canvasの高さ
// 		 */
// 		getHeight(): number;
//
// 		/**
// 		 * Undo
// 		 */
// 		undo(): Promise<any>;
//
// 		/**
// 		 * Undoが可能かどうか
// 		 */
// 		canUndo(): boolean;
//
// 		/**
// 		 * Redo
// 		 */
// 		redo(): Promise<any>;
//
// 		/**
// 		 * Redoが可能かどうか
// 		 */
// 		canRedo(): boolean;
//
// 		/**
// 		 * 明示的に再描画する。
// 		 */
// 		reRender(): void;
//
// 		/**
// 		 * イベント受付、描画を停止する
// 		 */
// 		stop(): void;
//
// 		/**
// 		 * イベント受付、描画を開始する。
// 		 */
// 		start(): void;
//
// 		/**
// 		 * メインキャンバス
// 		 */
// 		readonly canvas: DrawEditorCanvas;
//
// 		/**
// 		 * 設定値
// 		 */
// 		readonly properties: DrawEditorProperties;
//
// 		/**
// 		 * レイヤー
// 		 */
// 		readonly layers: DrawEditorLayers;
//
// 		/**
// 		 * モードチェンジャー
// 		 */
// 		readonly mode: DrawEditorModeChanger;
//
// 		/**
// 		 * イベントリスナー
// 		 */
// 		readonly events: DrawEditorEventListeners;
//
// 		/**
// 		 * 画像URIを取得する。
// 		 */
// 		createImageURI(): Promise<string>;
//
// 		/**
// 		 * 履歴を計算し、現在のDrawMessageを生成する。
// 		 */
// 		generateMessage(): Promise<structures.Message>;
// 	}
// }



// export namespace updater {
// 	import Transform = structures.Transform;
// 	import ColorStop = structures.ColorStop;
// 	export interface DrawchatUpdater {
//
// 		/**
// 		 * レイヤーを追加し、追加されたレイヤーのIDを取得する。
// 		 */
// 		addLayer(): Promise<string>;
//
// 		/**
// 		 * 指定されたレイヤーを削除する。
// 		 * @param layerId
// 		 */
// 		removeLayer(layerId: string): Promise<any>;
//
// 		/**
// 		 * レイヤーIDのリストを取得する。
// 		 */
// 		getLayers(): string[];
//
// 		/**
// 		 * 変形トランザクションを開始する。
// 		 * @param layerId
// 		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
// 		 * デフォルト値はtrue
// 		 */
// 		beginTransform(layerId: string, commit?: boolean | null): Promise<TransformTransaction>;
//
// 		/**
// 		 * 切り抜きトランザクションを開始する。
// 		 * @param layerId
// 		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
// 		 * デフォルト値はtrue
// 		 */
// 		beginClip(layerId: string, commit?: boolean | null ): Promise<ClipTransaction>;
//
// 		/**
// 		 * 描画トランザクションを開始する。
// 		 * @param layerId
// 		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
// 		 * デフォルト値はtrue
// 		 */
// 		beginPath(layerId: string, commit?: boolean | null ): Promise<DrawPathTransaction>;
//
// 		/**
// 		 * テキストトランザクションを開始する。
// 		 * @param layerId
// 		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
// 		 * デフォルト値はtrue
// 		 */
// 		beginText(layerId: string, commit?: boolean | null ): Promise<TextTransaction>;
//
// 		/**
// 		 * 表示順変更トランザクションを開始する。
// 		 * @param commit 直前の未コミットトランザクションが存在する場合、コミットするかキャンセルするかどうか。
// 		 * デフォルト値はtrue
// 		 */
// 		beginChangeSequence(commit?: boolean | null ): Promise<ChangeSequenceTransaction>;
//
// 		/**
// 		 * Undoが可能かどうかの判定
// 		 */
// 		canUndo(): boolean;
//
// 		/**
// 		 * Redoが可能かどうかの判定
// 		 */
// 		canRedo(): boolean;
//
// 		/**
// 		 * 一つ前の状態に戻す。
// 		 */
// 		undo(): Promise<any>;
//
// 		/**
// 		 * 戻した変更を進める。
// 		 */
// 		redo(): Promise<any>;
// 	}
//
// 	/**
// 	 * トランザクション
// 	 */
// 	export interface DrawTransaction {
//
// 		/**
// 		 * トランザクションが有効かどうか
// 		 */
// 		isAlive(): boolean;
//
// 		/**
// 		 * 変更内容をキャンセルする。
// 		 */
// 		cancel( duration?: boolean | null ): void;
//
// 		/**
// 		 * 変更内容を確定する。
// 		 */
// 		commit( duration?: boolean | null ): void;
//
// 		/**
// 		 * 直前までの変更を履歴に反映する。
// 		 */
// 		flush(): void;
//
// 		/**
// 		 * savePointを設定する。
// 		 */
// 		setSavePoint(): void;
//
// 		/**
// 		 * savePointに戻す。
// 		 */
// 		restoreSavePoint(): void;
// 	}
//
// 	/**
// 	 * 変形トランザクション
// 	 */
// 	export interface TransformTransaction extends DrawTransaction {
//
// 		/**
// 		 * 変形成分を設定
// 		 * @param transform
// 		 */
// 		setMatrix(transform: Transform): TransformTransaction;
//
// 		/**
// 		 * 変換マトリックスに並行移動を加えます。
// 		 * @param tx
// 		 * @param ty
// 		 * @returns {Transform}
// 		 */
// 		translate(tx: number, ty: number): TransformTransaction;
//
// 		/**
// 		 * 変換マトリックスにX軸方向への変倍を加えます。
// 		 * @param scaleX
// 		 * @returns {Transform}
// 		 */
// 		scaleX(scaleX: number): TransformTransaction;
//
// 		/**
// 		 * 変換マトリックスにY軸方向への変倍を加えます。
// 		 * @param scaleY
// 		 * @returns {Transform}
// 		 */
// 		scaleY(scaleY: number): TransformTransaction;
// 		/**
// 		 * 変換マトリックスに変倍を加えます。
// 		 * @param scaleX
// 		 * @param scaleY
// 		 * @returns {Transform}
// 		 */
// 		scale(scaleX: number, scaleY: number): TransformTransaction;
//
// 		/**
// 		 * 変換マトリックスに回転成分を加えます。
// 		 * @param rad
// 		 * @returns {Transform}
// 		 */
// 		rotate(transform: Transform, rad: number): TransformTransaction;
//
// 		/**
// 		 * マトリックスにX軸方向へのゆがみ成分を加えます。
// 		 * @param radX
// 		 * @returns {Transform}
// 		 */
// 		skewX(transform: Transform, radX: number): TransformTransaction;
//
// 		/**
// 		 * マトリックスにY軸方向へのゆがみ成分を加えます。
// 		 * @param radY
// 		 * @returns {Transform}
// 		 */
// 		skewY(transform: Transform, radY: number): TransformTransaction;
//
// 		/**
// 		 * マトリックスにゆがみ成分を加えます。
// 		 * @param radX
// 		 * @param radY
// 		 * @returns {Transform}
// 		 */
// 		skew(radX: number, radY: number): TransformTransaction;
//
// 		/**
// 		 * Matrixを結合します。
// 		 * @param transform
// 		 * @returns {Transform}
// 		 */
// 		concat(transform: Transform): TransformTransaction;
// 	}
//
// 	/**
// 	 * 線描画トランザクション
// 	 */
// 	export interface PathTransaction extends DrawTransaction {
//
// 		/**
// 		 * 現在の起点を移動する。何もしなければ最初は0,0
// 		 * @param x
// 		 * @param y
// 		 */
// 		moveTo(
// 			x: number,
// 			y: number
// 		): PathTransaction;
//
// 		/**
// 		 * 円弧を描画する。
// 		 * @param x1
// 		 * @param y1
// 		 * @param x2
// 		 * @param y2
// 		 * @param radius
// 		 */
// 		arcTo(
// 			x1: number,
// 			y1: number,
// 			x2: number,
// 			y2: number,
// 			radius: number
// 		): PathTransaction;
//
// 		/**
// 		 * 直線を描画する。
// 		 * @param x
// 		 * @param y
// 		 */
// 		lineTo(
// 			x: number,
// 			y: number
// 		): PathTransaction;
//
// 		/**
// 		 * 2次ベジェ曲線を描画する。
// 		 * @param cpx
// 		 * @param cpy
// 		 * @param x
// 		 * @param y
// 		 */
// 		quadraticCurveTo (
// 			cpx: number,
// 			cpy: number,
// 			x: number,
// 			y: number
// 		): PathTransaction;
//
// 		/**
// 		 * 3次ベジェ曲線を描画する。
// 		 * @param cpx1
// 		 * @param cpy1
// 		 * @param cpx2
// 		 * @param cpy2
// 		 * @param x
// 		 * @param y
// 		 */
// 		bezierCurveTo (
// 			cpx1: number,
// 			cpy1: number,
// 			cpx2: number,
// 			cpy2: number,
// 			x: number,
// 			y: number
// 		): PathTransaction;
// 	}
//
// 	/**
// 	 * 線描画トランザクション
// 	 */
// 	export interface ClipTransaction extends PathTransaction {
//
// 		/**
// 		 * 現在の起点を移動する。何もしなければ最初は0,0
// 		 * @param x
// 		 * @param y
// 		 */
// 		moveTo(
// 			x: number,
// 			y: number
// 		): ClipTransaction;
//
// 		/**
// 		 * 円弧を描画する。
// 		 * @param x1
// 		 * @param y1
// 		 * @param x2
// 		 * @param y2
// 		 * @param radius
// 		 */
// 		arcTo(
// 			x1: number,
// 			y1: number,
// 			x2: number,
// 			y2: number,
// 			radius: number
// 		): ClipTransaction;
//
// 		/**
// 		 * 直線を描画する。
// 		 * @param x
// 		 * @param y
// 		 */
// 		lineTo(
// 			x: number,
// 			y: number
// 		): ClipTransaction;
//
// 		/**
// 		 * 2次ベジェ曲線を描画する。
// 		 * @param cpx
// 		 * @param cpy
// 		 * @param x
// 		 * @param y
// 		 */
// 		quadraticCurveTo (
// 			cpx: number,
// 			cpy: number,
// 			x: number,
// 			y: number
// 		): ClipTransaction;
//
// 		/**
// 		 * 3次ベジェ曲線を描画する。
// 		 * @param cpx1
// 		 * @param cpy1
// 		 * @param cpx2
// 		 * @param cpy2
// 		 * @param x
// 		 * @param y
// 		 */
// 		bezierCurveTo (
// 			cpx1: number,
// 			cpy1: number,
// 			cpx2: number,
// 			cpy2: number,
// 			x: number,
// 			y: number
// 		): ClipTransaction;
//
// 		/**
// 		 * 直前までの変更を履歴に反映する。
// 		 */
// 		flush(): void;
//
// 	}
//
// 	/**
// 	 * 線描画トランザクション
// 	 */
// 	export interface DrawPathTransaction extends PathTransaction {
// 		/**
// 		 * 既存の描画内容との合成方法を指定する。
// 		 * 0:source-over 両方のイメージの領域が描画される。重なった部分は新規イメージとなる。（初期値）<br />
// 		 * 1:source-atop 現在イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
// 		 * 2:source-in 重なった領域のみが描画される。重なった部分は新規イメージとなる。<br />
// 		 * 3:source-out 新規イメージの領域のみが描画される。重なった部分は描画されない。<br />
// 		 * 4:destination-atop 新規イメージの領域のみが描画される。重なった部分は現在イメージとなる。<br />
// 		 * 5:destination-in 重なった領域のみが描画される。重なった部分は現在イメージとなる。<br />
// 		 * 6:destination-out 現在イメージの領域のみが描画される。重なった部分は描画されない。<br />
// 		 * 7:destination-over 両方のイメージの領域が描画される。重なった部分は現在イメージとなる。<br />
// 		 * 8:lighter 両方のイメージの領域が描画される。重なった部分は混色して描画される。<br />
// 		 * 9:copy 新規イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
// 		 * 10:xor 両方のイメージの領域が描画される。重なった部分は描画されない。<br />
// 		 * @param compositeOperation
// 		 */
// 		setCompositeOperation(compositeOperation: number): DrawPathTransaction;
//
// 		/**
// 		 * 塗りの色を設定する。
// 		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
// 		 * @param color
// 		 */
// 		setFill(color: string): DrawPathTransaction;
//
// 		/**
// 		 * 線形グラデーションを設定する。
// 		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
// 		 * @param x0
// 		 * @param y0
// 		 * @param x1
// 		 * @param y1
// 		 * @param colorStops
// 		 */
// 		setFillLinerGradient(
// 			x0: number,
// 			y0: number,
// 			x1: number,
// 			y1: number,
// 			colorStops?: ColorStop[] | null
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 円形グラデーションを設定する。
// 		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
// 		 * @param x0
// 		 * @param y0
// 		 * @param r0
// 		 * @param x1
// 		 * @param y1
// 		 * @param r1
// 		 * @param colorStops
// 		 */
// 		setFillRadialGradient(
// 			x0: number,
// 			y0: number,
// 			r0: number,
// 			x1: number,
// 			y1: number,
// 			r1: number,
// 			colorStops?: ColorStop[] | null
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 線の色を設定する。
// 		 * @param color
// 		 */
// 		setStrokeColor(color: string): DrawPathTransaction;
//
// 		/**
// 		 * 破線を設定。引数がいずれもnullの場合は破線なし。
// 		 * @param segments
// 		 * @param offset
// 		 */
// 		setStrokeDash(
// 			segments?: number[] | null,
// 			offset?: number | null
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 線スタイルを設定。
// 		 * @param thickness 太さ
// 		 * @param caps 線端の形
// 		 * @param joints 接点の形
// 		 * @param miterLimit
// 		 * @param ignoreScale
// 		 */
// 		setStrokeStyle(
// 			thickness?: number | null,
// 			caps?: number | null,
// 			joints?: number | null,
// 			miterLimit?: number | null,
// 			ignoreScale?: number | null
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 現在の起点を移動する。何もしなければ最初は0,0
// 		 * @param x
// 		 * @param y
// 		 */
// 		moveTo(
// 			x: number,
// 			y: number
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 円弧を描画する。
// 		 * @param x1
// 		 * @param y1
// 		 * @param x2
// 		 * @param y2
// 		 * @param radius
// 		 */
// 		arcTo(
// 			x1: number,
// 			y1: number,
// 			x2: number,
// 			y2: number,
// 			radius: number
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 直線を描画する。
// 		 * @param x
// 		 * @param y
// 		 */
// 		lineTo(
// 			x: number,
// 			y: number
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 2次ベジェ曲線を描画する。
// 		 * @param cpx
// 		 * @param cpy
// 		 * @param x
// 		 * @param y
// 		 */
// 		quadraticCurveTo (
// 			cpx: number,
// 			cpy: number,
// 			x: number,
// 			y: number
// 		): DrawPathTransaction;
//
// 		/**
// 		 * 3次ベジェ曲線を描画する。
// 		 * @param cpx1
// 		 * @param cpy1
// 		 * @param cpx2
// 		 * @param cpy2
// 		 * @param x
// 		 * @param y
// 		 */
// 		bezierCurveTo (
// 			cpx1: number,
// 			cpy1: number,
// 			cpx2: number,
// 			cpy2: number,
// 			x: number,
// 			y: number
// 		): DrawPathTransaction;
// 	}
//
// 	/**
// 	 * 全面、背面入れ替えのトランザクション
// 	 */
// 	export interface ChangeSequenceTransaction extends DrawTransaction {
//
// 		/**
// 		 * 指定されたレイヤーを最前面へ移動する。
// 		 * @param layerId
// 		 */
// 		toFirst(layerId: string): ChangeSequenceTransaction;
//
// 		/**
// 		 * 指定されたレイヤーを前面へ移動する。
// 		 * @param layerId
// 		 */
// 		toPrev(layerId: string): ChangeSequenceTransaction;
// 		/**
// 		 * 指定されたレイヤーを背面へ移動する。
// 		 * @param layerId
// 		 */
// 		toBack(layerId: string): ChangeSequenceTransaction;
// 		/**
// 		 * 指定されたレイヤーを最背面へ移動する。
// 		 * @param layerId
// 		 */
// 		toLast(layerId: string): ChangeSequenceTransaction;
// 		/**
// 		 * レイヤーの順序を移動する。
// 		 * @param layerId
// 		 * @param index
// 		 */
// 		toMove(layerId: string, index: number): ChangeSequenceTransaction;
// 	}
//
// 	/**
// 	 * テキスト編集トランザクション
// 	 */
// 	export interface TextTransaction extends DrawTransaction {
//
// 		/**
// 		 * 既存の描画内容との合成方法を指定する。
// 		 * 0:source-over 両方のイメージの領域が描画される。重なった部分は新規イメージとなる。（初期値）<br />
// 		 * 1:source-atop 現在イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
// 		 * 2:source-in 重なった領域のみが描画される。重なった部分は新規イメージとなる。<br />
// 		 * 3:source-out 新規イメージの領域のみが描画される。重なった部分は描画されない。<br />
// 		 * 4:destination-atop 新規イメージの領域のみが描画される。重なった部分は現在イメージとなる。<br />
// 		 * 5:destination-in 重なった領域のみが描画される。重なった部分は現在イメージとなる。<br />
// 		 * 6:destination-out 現在イメージの領域のみが描画される。重なった部分は描画されない。<br />
// 		 * 7:destination-over 両方のイメージの領域が描画される。重なった部分は現在イメージとなる。<br />
// 		 * 8:lighter 両方のイメージの領域が描画される。重なった部分は混色して描画される。<br />
// 		 * 9:copy 新規イメージの領域のみが描画される。重なった部分は新規イメージとなる。<br />
// 		 * 10:xor 両方のイメージの領域が描画される。重なった部分は描画されない。<br />
// 		 * @param compositeOperation
// 		 */
// 		setCompositeOperation(compositeOperation: number): TextTransaction;
//
// 		setPosition(x: number, y: number): TextTransaction;
//
// 		/**
// 		 * テキストの塗りを設定する。
// 		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
// 		 * @param color
// 		 */
// 		setFill(color: string): TextTransaction;
// 		/**
// 		 * テキストの線形グラデーションを設定する。
// 		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
// 		 * @param x0
// 		 * @param y0
// 		 * @param x1
// 		 * @param y1
// 		 * @param colorStops
// 		 */
// 		setFillLinerGradient(
// 			x0: number,
// 			y0: number,
// 			x1: number,
// 			y1: number,
// 			colorStops?: ColorStop[] | null
// 		): TextTransaction;
// 		/**
// 		 * テキストの円形グラデーションを設定する。
// 		 * 線形・円形グラデーション・ベタ塗りは混在は混在しない。
// 		 * @param x0
// 		 * @param y0
// 		 * @param r0
// 		 * @param x1
// 		 * @param y1
// 		 * @param r1
// 		 * @param colorStops
// 		 */
// 		setFillRadialGradient(
// 			x0: number,
// 			y0: number,
// 			r0: number,
// 			x1: number,
// 			y1: number,
// 			r1: number,
// 			colorStops?: ColorStop[] | null
// 		): TextTransaction;
//
// 		/**
// 		 * 線の色を設定する。
// 		 * @param color
// 		 */
// 		setStrokeColor(color: string): TextTransaction;
// 		/**
// 		 * テキストを追加する。
// 		 * @param text
// 		 */
// 		push(text: string): TextTransaction;
// 		/**
// 		 * baselineを設定する。何も設定しなければ通常のベースライン。
// 		 * @param baseline
// 		 */
// 		setBaseline(baseline?: string | null ): TextTransaction;
// 		/**
// 		 * テキストの揃えを設定する。
// 		 * @param align
// 		 */
// 		setAlign(align?: string | null ): TextTransaction;
//
// 		/**
// 		 * フォントファミリーを設定する。
// 		 * @param fontFamily
// 		 */
// 		setFontFamily(fontFamily: string): TextTransaction;
//
// 		/**
// 		 * フォントサイズを設定する。
// 		 * @param size
// 		 */
// 		setSize(size: number): TextTransaction;
//
// 		/**
// 		 * フォント太さを設定する。
// 		 * @param weight
// 		 */
// 		setWeight(weight: number): TextTransaction;
//
// 		/**
// 		 * フォントスタイルを設定する。
// 		 * @param style
// 		 */
// 		setStyle(style: number): TextTransaction;
// 	}
// }
// export namespace viewer {
// 	import DrawchatRenderer = renderer.DrawchatRenderer;
// 	import DrawHistory = history.DrawHistory;
// 	import Layer = structures.Layer;
// 	/**
// 	 * 編集内容と描画をリアルタイムで結びつけるクラス。
// 	 */
// 	export interface DrawchatViewer {
//
// 		/**
// 		 * 描画内容を全てクリアする。
// 		 */
// 		clear(): void;
//
// 		/**
// 		 * 画像をbase64化したデータを取得する。
// 		 */
// 		createImageDataURI(): string;
//
// 		/**
// 		 * 指定された添字のレイヤーを表示状態に設定する。
// 		 * 引数が指定されていない場合は全件表示。
// 		 * @param target
// 		 */
// 		show(target?: number[] | null ): void;
//
// 		/**
// 		 * 指定された添字のレイヤーを非表示状態に設定する。
// 		 * 引数が指定されていない場合は全件非表示。
// 		 * @param target
// 		 */
// 		hide(target?: number[] | null ): void;
//
// 		/**
// 		 * 指定されたピクセル座標の色成分を取得する。
// 		 * r,g,b,aの配列を返す。
// 		 */
// 		getPixelColor(x: number, y: number, layerIndex: number): number[];
//
// 		/**
// 		 * DrawchatHistoryとの同期を開始する。
// 		 */
// 		start(): void;
//
// 		/**
// 		 * DrawchatHistoryとの同期を停止する。
// 		 */
// 		stop(): void;
//
// 		/**
// 		 * 描画内容を1から再レンダリングする。
// 		 */
// 		refresh(): void;
// 	}
//
// 	export interface DrawchatViewerFactory {
// 		createInstance(
// 			renderer: DrawchatRenderer,
// 			core?: DrawHistory | null): DrawchatViewer;
// 	}
//
// 	export interface NamedLayer extends Layer {
// 		layerId: string;
// 	}
//
// 	export interface LayerMap {
// 		[key: string]: NamedLayer | null | undefined;
// 	}
// }

export * from "./DrawAPI";

import {DrawAPIUtils} from "./DrawAPIUtils";
import {DrawAPIUtilsStatic} from "./DrawAPIUtils";
import {BezierCurveToFactoryStatic} from "./structures/BezierCurveTo";
import {ClipFactoryStatic} from "./structures/Clip";
import {DashFactoryStatic} from "./structures/Dash";
import {FillFactoryStatic} from "./structures/Fill";
import {GraphicFactoryStatic} from "./structures/Graphic";
import {GraphicsDrawFactoryStatic} from "./structures/GraphicsDraw";
import {LayerFactoryStatic} from "./structures/Layer";
import {LinerGradientFactoryStatic} from "./structures/LinerGradient";
import {LineToFactoryStatic} from "./structures/LineTo";
import {MessageFactoryStatic} from "./structures/Message";
import {MoveToFactoryStatic} from "./structures/MoveTo";
import {QuadraticCurveToFactoryStatic} from "./structures/QuadraticCurveTo";
import {RadialGradientFactoryStatic} from "./structures/RadialGradient";
import {StrokeFactoryStatic} from "./structures/Stroke";
import {StrokeStyleFactoryStatic} from "./structures/StrokeStyle";
import {TextFactoryStatic} from "./structures/Text";
import {TextDrawFactoryStatic} from "./structures/TextDraw";
import {TransformFactoryStatic} from "./structures/Transform";
import {ArcToFactoryStatic} from "./structures/ArcTo";
import {ColorStopFactoryStatic} from "./structures/ColorStop";

export const DrawUtils: DrawAPIUtilsStatic = DrawAPIUtils;

export const DrawAPIStatic = {
	ArcTo: new ArcToFactoryStatic(),
	BezierCurveTo: new BezierCurveToFactoryStatic(),
	Clip: new ClipFactoryStatic(),
	ColorStop: new ColorStopFactoryStatic(),
	Dash: new DashFactoryStatic(),
	Fill: new FillFactoryStatic(),
	Graphic: new GraphicFactoryStatic(),
	GraphicsDraw: new GraphicsDrawFactoryStatic(),
	Layer: new LayerFactoryStatic(),
	LinerGradient: new LinerGradientFactoryStatic(),
	LineTo: new LineToFactoryStatic(),
	Message: new MessageFactoryStatic(),
	MoveTo: new MoveToFactoryStatic(),
	QuadraticCurveTo: new QuadraticCurveToFactoryStatic(),
	RadialGradient: new RadialGradientFactoryStatic(),
	Stroke: new StrokeFactoryStatic(),
	StrokeStyle: new StrokeStyleFactoryStatic(),
	Text: new TextFactoryStatic(),
	TextDraw: new TextDrawFactoryStatic(),
	Transform: new TransformFactoryStatic(),
	Utils: DrawAPIUtils
};
export default DrawAPIStatic;
