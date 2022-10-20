import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import React, {useRef, useState} from 'react';

export interface IPaymentDetails {
	cardholder: string;
	card: string;
	expiry: string;
	cvv: string;
}

type PaymentDetailsProps = {
	onSubmit: (data: IPaymentDetails) => void;
};

const PaymentDetails: React.FC<PaymentDetailsProps> = ({onSubmit}) => {
	const cardholderRef = useRef() as React.RefObject<HTMLInputElement>;
	const cardRef = useRef() as React.RefObject<HTMLInputElement>;
	const expiryRef = useRef() as React.RefObject<HTMLInputElement>;
	const cvvRef = useRef() as React.RefObject<HTMLInputElement>;
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!cardholderRef.current!.value ||
			!cardRef.current!.value ||
			!expiryRef.current!.value ||
			!cvvRef.current!.value
		)
			return setError('All fields are required!');

		onSubmit({
			cardholder: cardholderRef.current!.value,
			card: cardRef.current!.value,
			expiry: expiryRef.current!.value,
			cvv: cvvRef.current!.value,
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
						<FormLabel>Card Holder Name</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={cardholderRef}
							name='cardholder'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Card Number</FormLabel>
						<OutlinedInput
							type='number'
							size='small'
							inputRef={cardRef}
							name='card'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Card Expiry</FormLabel>
						<OutlinedInput
							type='date'
							size='small'
							inputRef={expiryRef}
							name='expiry'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Card CVV</FormLabel>
						<OutlinedInput
							type='number'
							size='small'
							inputRef={cvvRef}
							name='cvv'
							fullWidth
							required
						/>
					</FormControl>
					{error ? <Alert severity='error'>{error}</Alert> : null}
					<Button type='submit' variant='contained' fullWidth sx={{mt: '25px'}}>Submit And Next</Button>
				</Box>
			</form>
		</>
	);
};

export default React.memo(PaymentDetails);
