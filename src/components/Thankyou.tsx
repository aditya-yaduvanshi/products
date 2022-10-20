import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import React from 'react';
import { Link } from 'react-router-dom';

const Thankyou: React.FC = () => {
	return (
		<>
			<Box
				display='flex'
				justifyContent='center'
				alignItems='center'
				flexDirection='column'
				gap={2}
			>
				<Typography>Your order is successfully placed.</Typography>
				<Typography>Thankyou for shopping!</Typography>
				<Button component={Link} to='/' variant='contained' sx={{mt: '25px'}}>
					Back To Home
				</Button>
			</Box>
		</>
	);
};

export default React.memo(Thankyou);
