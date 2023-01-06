import styled from 'styled-components';
import Title from '../components/Title';
import { FourFrame } from '../components/templates';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`

const Block = ({ template }) => {
	const navigate = useNavigate();

	const workingTemplate = () => {
		switch(template){
			case 'four-frame':
				return <FourFrame navigate={() => {navigate('/edit');}}/>;
			default:
				return (null);
		}
	}
	return (
		<Wrapper>
			<Title />
			<h1>Choose a block</h1>
			{workingTemplate()}
		</Wrapper>
	);
}

export default Block;