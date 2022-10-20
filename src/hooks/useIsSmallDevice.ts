import {useEffect, useState} from 'react';

const useIsSmallDevice = () => {
	const [screenSize, setScreenSize] = useState<number>(900);
	useEffect(() => {
		window.addEventListener('resize', () => {
			setScreenSize(window.innerWidth);
		});
		return () => {
			window.removeEventListener('resize', () => {
				setScreenSize(window.innerWidth);
			});
		};
	}, []);
  return screenSize < 768;
};

export default useIsSmallDevice;
