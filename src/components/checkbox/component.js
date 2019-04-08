import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { hotkeys } from 'react-keyboard-shortcuts';
import Declarations from '../declarations';
import * as C from '../../utils/constants';
import { declarationsPropTypes } from '../../utils/prop-types';
import { buildStyleObject } from '../../utils/string-utils';
import { getItemsPositioningClass } from '../../utils/items-positioning';
import alphabet from '../../utils/alphabet';
import './checkbox.scss';

class Checkbox extends Component {
	hot_keys = this.props.keyboardSelection
		? this.props.items.reduce(
				(_, item, i) => ({
					..._,
					[alphabet[i]]: { priority: 1, handler: () => this.onChange(i) },
				}),
				{}
		  )
		: {};

	constructor(props) {
		super(props);
		const { items, handleChange } = props;
		this.state = { items };
		this.onChange = index => {
			const { items: oldItems } = this.state;
			const items = [...oldItems];
			items[index] = { ...items[index], value: !items[index].value };
			this.setState({ items });
			handleChange(items);
		};
	}

	componentDidMount() {
		const { focused } = this.props;
		if (focused) this.nameInput.focus();
	}

	render() {
		const { items } = this.state;
		const {
			id,
			label,
			positioning,
			disabled,
			keyboardSelection,
			focused,
			declarations,
			style,
		} = this.props;
		const { fieldsetStyle, checkboxStyle } = style;
		return (
			<React.Fragment>
				<Declarations
					id={id}
					type={C.BEFORE_QUESTION_TEXT}
					declarations={declarations}
				/>
				<fieldset
					key={`checkbox-${id}`}
					className="checkbox-group"
					style={buildStyleObject(fieldsetStyle)}
				>
					<legend>{label}</legend>
					<Declarations
						id={id}
						type={C.AFTER_QUESTION_TEXT}
						declarations={declarations}
					/>
					{items.map(({ id: modId, label: modLabel, value }, i) => {
						return (
							<div
								key={`checkbox-${id}-${modId}`}
								className={`checkbox-modality ${getItemsPositioningClass(
									positioning
								)}`}
							>
								<input
									type="checkbox"
									id={`checkbox-${id}-${modId}`}
									ref={input => {
										if (focused && i === 0) this.nameInput = input;
									}}
									key={`checkbox-${id}-${modId}`}
									aria-labelledby={`input-label-${id}-${modId}`}
									className="checkbox-lunatic"
									checked={value}
									disabled={disabled}
									onChange={() => this.onChange(i)}
								/>
								<label
									htmlFor={`checkbox-${id}-${modId}`}
									id={`input-label-${id}-${modId}`}
									style={value ? buildStyleObject(checkboxStyle) : {}}
								>
									{keyboardSelection
										? `${alphabet[i].toUpperCase()} - ${modLabel}`
										: modLabel}
								</label>
							</div>
						);
					})}
				</fieldset>
				<Declarations id={id} type={C.DETACHABLE} declarations={declarations} />
			</React.Fragment>
		);
	}
}

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	items: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			value: PropTypes.bool.isRequired,
		})
	).isRequired,
	handleChange: PropTypes.func.isRequired,
	positioning: PropTypes.oneOf(['DEFAULT', 'HORIZONTAL', 'VERTICAL']),
	disabled: PropTypes.bool,
	keyboardSelection: PropTypes.bool,
	focused: PropTypes.bool,
	declarations: declarationsPropTypes,
	style: PropTypes.object,
};

Checkbox.defaultProps = {
	label: '',
	items: [],
	positioning: 'DEFAULT',
	disabled: false,
	keyboardSelection: false,
	focused: false,
	declarations: [],
	style: { fieldsetStyle: {}, checkboxStyle: {} },
};

export default Radium(hotkeys(Checkbox));
