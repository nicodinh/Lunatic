import React from 'react';
import { shallow, mount } from 'enzyme';
import { CheckboxOne } from 'components';

const handleChange = jest.fn();
const options = [
	{ value: 'france', label: 'France' },
	{ value: 'italy', label: 'Italy' },
];
const response = { valueState: [{ valueType: 'COLLECTED', value: 'italy' }] };

const defaultProps = {
	id: 'id',
	label: 'label',
	handleChange,
	options,
	response,
};

describe('checkbox-one', () => {
	it('renders without crashing', () => {
		mount(<CheckboxOne {...defaultProps} />);
	});

	it('returns tooltip and keyboardSelection component', () => {
		shallow(<CheckboxOne {...defaultProps} tooltip keyboardSelection />);
	});

	it('renders firing useEffect', () => {
		const wrapper = mount(<CheckboxOne {...defaultProps} />);
		wrapper.setProps({ focused: true });
	});

	it('should trigger the change event', () => {
		const wrapper = shallow(<CheckboxOne {...defaultProps} />);
		wrapper
			.find('input')
			.first()
			.simulate('change');
		expect(handleChange).toHaveBeenCalled();
		expect(handleChange).toHaveBeenCalledWith({ '': 'france' });
	});
});
