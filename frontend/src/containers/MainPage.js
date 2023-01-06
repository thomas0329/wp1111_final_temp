import Title from '../components/Title';
import Description from '../components/Description';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

const MainPage = () => {
	
	const navigate = useNavigate();
	return (
		<Wrapper onClick={() => {navigate('/login');}}>
			<Title />
			<Description />
		</Wrapper>
	);
};

export default MainPage;