import styled from 'styled-components';

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	h1{
			margin: 0;
			// margin-right: 20px;
			font-size: 3em;
	}
`
const Title = () => {
	return (
		<Wrapper>
			<h1>DOOODLER</h1>
		</Wrapper>
	);
};

export default Title;