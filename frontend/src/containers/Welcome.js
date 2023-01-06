import Title from '../components/Title';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useComic } from './hooks/useComic';

const BlockWrapper = styled.div`
	width: 100%;
	height: 100px;
	display: flex;
	justify-content: space-evenly;
`
const BlockPreview = styled.div`
	width: 100px;
	height: 100px;
	img {
		width: 100%;
		height: 100%;
	}
`
const ButtonWrapper = styled.div`
	width: 100%
	height: 100px;
	display: flex;
	justify-content: space-evenly;
`

const Wrapper = styled.div`
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

const Welcome = ({ name }) => {

	const { setCurrentTemplate } = useComic();
	const navigate = useNavigate();

	const handleClick = (event) => {
		setCurrentTemplate(event.currentTarget.id);
		navigate('/block');
	}

	const goCreate = () => {
		navigate('/edit')
	}


	const handleNext = () => {
		navigate('/gallery')
	}
	return (
		<>
		<Wrapper>
			<Title />
			<h2>Hi, {name}</h2>
			<ButtonWrapper>
				<button className = 'button'onClick={goCreate}>Create New</button>
				<button className = 'button'onClick={handleNext}>My Gallery</button>
			</ButtonWrapper>

			{/* <h1>Choose a template</h1>
			<BlockWrapper>
				<BlockPreview id='four-frame' onClick={handleClick}>
					<img src='templates/1.png' />
				</BlockPreview>
				<BlockPreview id='slanted' onClick={handleClick}>
					<img src='templates/2.png' />
				</BlockPreview>
				<BlockPreview id='three-frame' onClick={handleClick}>
					<img src='templates/3.png' />
				</BlockPreview>
			</BlockWrapper> */}
		</Wrapper>
		</>
	);
}

export default Welcome;