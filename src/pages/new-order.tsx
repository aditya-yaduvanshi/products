import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useSearchParams, useNavigate} from 'react-router-dom';
import DeliveryAddress, {IDeliveryAddress} from '../components/DeliveryAddress';
import PaymentDetails, {IPaymentDetails} from '../components/PaymentDetails';
import PersonalDetails, {IPersonalDetails} from '../components/PersonalDetails';
import ProductCard, {IProduct} from '../components/ProductCard';
import Thankyou from '../components/Thankyou';

interface IOrder {
	product?: IProduct;
	orderedBy?: IPersonalDetails;
	deliverTo?: IDeliveryAddress;
	paymentThrough?: IPaymentDetails;
}

const steps = ['Personal Details', 'Delivery Address', 'Payment Details'];

const NewOrder = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [activeStep, setActiveStep] = useState(
		searchParams.get('step') ? Number(searchParams.get('step')) - 1 : 0
	);
	const orderRef = useRef<IOrder>({});
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	useLayoutEffect(() => {
		if (!searchParams.get('product')) return navigate('/');
		if (orderRef.current.product) return;
		setLoading(true);
		fetch(`https://fakestoreapi.com/products/${searchParams.get('product')}`)
			.then((res) => res.json())
			.then((result) => {
				orderRef.current.product = result;
			})
			.catch((err) => {})
			.finally(() => setLoading(false));
	}, [orderRef]);

	useEffect(() => {
		searchParams.set('step', `${activeStep + 1}`);
		setSearchParams(searchParams);
	}, [activeStep]);

	const submitPersonalDetails = (data: IPersonalDetails) => {
		orderRef.current.orderedBy = data;
		setActiveStep(1);
	};

	const submitDeliveryAddress = (data: IDeliveryAddress) => {
		orderRef.current.deliverTo = data;
		setActiveStep(2);
	};

	const submitPaymentDetails = (data: IPaymentDetails) => {
		orderRef.current.paymentThrough = data;
		setActiveStep(3);
	};

	const renderStep = (step: number) => {
		switch (step) {
			case 0:
				return <PersonalDetails onSubmit={submitPersonalDetails} />;
			case 1:
				return <DeliveryAddress onSubmit={submitDeliveryAddress} />;
			case 2:
				return <PaymentDetails onSubmit={submitPaymentDetails} />;
			default:
				return <Thankyou />;
		}
	};

	if (loading)
		return (
			<Typography component='h1' variant='h1'>
				Loading...
			</Typography>
		);

	return (
		<>
			<Box sx={{p: '5%'}} display='flex' justifyContent='center' gap='5%'>
				<Box>
					{orderRef.current.product && (
						<ProductCard
							product={orderRef.current.product}
							hideBuyButton
							showAllDetails
							sx={{maxWidth: '240px'}}
						/>
					)}
				</Box>
				<Box>
					<Box display='flex' justifyContent='center' alignItems='center'>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</Box>
					<Box p='25px'>{renderStep(activeStep)}</Box>
				</Box>
			</Box>
		</>
	);
};

export default React.memo(NewOrder);
