import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 300px;
  height: 300px;
  align-self: center;
  display: flex;
  flex-wrap: wrap;
`
const Block = styled.div`
  width: 150px;
  height: 150px;
  border: 3px black solid;
  box-sizing: border-box;
`

const FourFrame = ({ navigate }) => {

  return(
    <Wrapper>
      <Block id='upperLeft' onClick={navigate} />
      <Block id='upperRight' onClick={navigate} />
      <Block id='lowerLeft' onClick={navigate} />
      <Block id='lowerRight' onClick={navigate} />
    </Wrapper>
  );
}

export { FourFrame };