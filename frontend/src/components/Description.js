import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	h4{
		margin: 0;
		color: #50545D
	}
`

const Description = () => {
	return (
		<Wrapper>
			<h4>Click anywhere to continue</h4>
		</Wrapper>
	);
};

export default Description;