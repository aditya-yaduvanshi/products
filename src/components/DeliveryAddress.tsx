import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import React, {useRef, useState} from 'react';

export interface IDeliveryAddress {
	house: string;
	landmark: string;
	area: string;
	city: string;
	state: string;
	country: string;
	pincode: string;
}

type DeliveryAddressProps = {
	onSubmit: (data: IDeliveryAddress) => void;
};

const DeliveryAddress: React.FC<DeliveryAddressProps> = ({onSubmit}) => {
	const houseRef = useRef() as React.RefObject<HTMLInputElement>;
	const landmarkRef = useRef() as React.RefObject<HTMLInputElement>;
	const areaRef = useRef() as React.RefObject<HTMLInputElement>;
	const cityRef = useRef() as React.RefObject<HTMLInputElement>;
	const stateRef = useRef() as React.RefObject<HTMLInputElement>;
	const countryRef = useRef() as React.RefObject<HTMLInputElement>;
	const pincodeRef = useRef() as React.RefObject<HTMLInputElement>;
	const [error, setError] = useState('');

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!houseRef.current!.value ||
			!landmarkRef.current!.value ||
			!areaRef.current!.value ||
			!cityRef.current!.value ||
			!stateRef.current!.value ||
			!stateRef.current!.value ||
			!stateRef.current!.value
		)
			return setError('All fields are required!');

		onSubmit({
			house: houseRef.current!.value,
			landmark: landmarkRef.current!.value,
			area: areaRef.current!.value,
			city: cityRef.current!.value,
			state: stateRef.current!.value,
			country: stateRef.current!.value,
			pincode: stateRef.current!.value,
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
						<FormLabel>House/Building/Flat No.</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={houseRef}
							name='house'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Landmark</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={landmarkRef}
							name='landmark'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Area/Locality</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={areaRef}
							name='area'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>City</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={cityRef}
							name='city'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>State</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={stateRef}
							name='state'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Country</FormLabel>
						<OutlinedInput
							type='text'
							size='small'
							inputRef={countryRef}
							name='country'
							fullWidth
							required
						/>
					</FormControl>
					<FormControl fullWidth>
						<FormLabel>Pincode</FormLabel>
						<OutlinedInput
							type='number'
							size='small'
							inputRef={pincodeRef}
							name='pincode'
							fullWidth
							required
						/>
					</FormControl>
					{error ? <Alert severity='error'>{error}</Alert> : null}
					<Button type='submit' variant='contained' fullWidth sx={{mt: '25px'}}>
						Save And Next
					</Button>
				</Box>
			</form>
		</>
	);
};

export default React.memo(DeliveryAddress);
