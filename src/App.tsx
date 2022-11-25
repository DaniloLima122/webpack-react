import * as React from 'react';
import Button from '@components/Button/Button';

const App = () => {

	const ref = React.useRef<HTMLButtonElement>();

	const event = () => {
		console.log('It works');
	};

	return (
		<Button onClick={event} ref={ref} variant='primary' disabled={false}>Cadastrar</Button>
	);
};


export default App;