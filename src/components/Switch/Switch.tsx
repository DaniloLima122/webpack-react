import * as React from 'react';
import { useId, useState } from 'react';


export interface SwitchProps {
	disabled?: boolean;
	id?: string,
	'aria-label': string,
	checked?: boolean,
	children?: React.ReactNode,
	onKeyDown: () => void;
	onChange?: () => void;
}

const Switch = React.forwardRef((props: SwitchProps, ref: React.Ref<HTMLInputElement>) => {

	const uniqueId = useId();

	const { disabled = false, checked, onChange = () => null, id = uniqueId, children, 'aria-label': ariaLabel } = props;

	const defaultChecked = checked ? checked : false;
	const [isChecked, setIsChecked] = useState(defaultChecked);

	const handleOnchange = () => {
		if(disabled) return;
		setIsChecked(prev => !prev);
		onChange();
	};


	return <>
		<label className='switch' htmlFor={id} aria-label={ariaLabel}>
			<div>
				{
					children && <label className='switch__label' htmlFor={id}>{children}</label>
				}

				<input
					id={id}
					disabled={disabled}
					aria-disabled={disabled}
					aria-checked={isChecked}
					ref={ref}
					onChange={handleOnchange}
					checked={isChecked}
					type="checkbox" />

				<div className={`switch_box ${isChecked && '--checked'}`}>
					<span className='switch_toggle'></span>
				</div>
			</div>
		</label>
	</>;

});

export default Switch;