import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import React, {useRef, useState} from 'react';

export interface IPersonalDetails  {
	name: string; 
	email: string; 
	phone: string;
}

type PersonalDetailsProps = {
	onSubmit: (data: IPersonalDetails) => void;
};

const PersonalDetails: React.FC<PersonalDetailsProps> = ({onSubmit}) => {
	const nameRef = useRef() as React.RefObject<HTMLInputElement>;
	const emailRef = useRef() as React.RefObject<HTMLInputElement>;
	const phoneRef = useRef() as React.RefObject<HTMLInputElement>;
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!nameRef.current!.value ||
			!emailRef.current!.value ||
			!phoneRef.current!.value
		)
			return setError('All fields are required!');

		onSubmit({
			name: nameRef.current!.value,
			email: emailRef.current!.value,
			phone: phoneRef.current!.value,
		});
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Box
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='center'
          gap={1}
				>
					<FormControl fullWidth>
						<FormLabel>Name</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={nameRef}
							name='name'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Email</FormLabel>
						<OutlinedInput
							type='email'
							size='small'
							inputRef={emailRef}
							name='email'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Phone</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={phoneRef}
							name='phone'
							fullWidth
							required
						/>
					</FormControl>
					{error ? <Alert severity='error'>{error}</Alert> : null}
					<Button type='submit' variant='contained' sx={{mt: '25px'}} fullWidth>
						Submit And Next
					</Button>
				</Box>
			</form>
		</>
	);
};

export default React.memo(PersonalDetails);
