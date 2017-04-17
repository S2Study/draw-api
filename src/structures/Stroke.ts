import {DrawAPIUtils} from "../DrawAPIUtils";
import {structures} from "../index";
import Fill = structures.Fill;
import Dash = structures.Dash;
import {FillFactory} from "./Fill";
import {DashFactory} from "./Dash";
import Stroke = structures.Stroke;
import StrokeStyle = structures.StrokeStyle;
import {StrokeStyleFactory} from "./StrokeStyle";

const EMPTY: any = {};
const EMPTY_FILL = FillFactory.createInstance();
const EMPTY_STYLE = StrokeStyleFactory.createInstance();

class StrokeImpl implements Stroke {

	fillStyle: Fill;
	dash: Dash | null;
	style: StrokeStyle;

	constructor(
		fillStyle: Fill,
		dash: Dash | null,
		style: StrokeStyle
	) {
		this.fillStyle = fillStyle;
		this.dash = dash;
		this.style = style;
	}

	toJSON(): Partial<Stroke> {
		const result: Partial<StrokeImpl> = {
			fillStyle: this.fillStyle.toJSON(),
			style: this.style.toJSON()
		};
		if (this.dash !== null ) {
			result.dash = this.dash;
		}
		return result;
	}
}

export class StrokeFactoryStatic {

	createInstance(
		fillStyle?: Fill | null,
		dash?: Dash | null,
		style?: StrokeStyle | null
	): Stroke {
		return new StrokeImpl(
			DrawAPIUtils.complement(fillStyle, EMPTY_FILL),
			DrawAPIUtils.complement(dash, null),
			DrawAPIUtils.complement(style, EMPTY_STYLE)
		);
	}

	fromJSON(json1?: any | null): Stroke {
		const json: any = DrawAPIUtils.complement(json1, EMPTY);
		return this.createInstance(
			FillFactory.fromJSON(json.fillStyle),
			DrawAPIUtils.isNull(json.dash) ? null : DashFactory.fromJSON(json.dash),
			StrokeStyleFactory.fromJSON(json.style)
		);
	}
}

export const StrokeFactory: StrokeFactoryStatic = new StrokeFactoryStatic();
export default StrokeFactory;