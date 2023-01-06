import styled from 'styled-components';
import Title from '../components/Title';
import { useLazyQuery, useQuery, NetworkStatus } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useComic } from './hooks/useComic';
import { IMAGE_QUERY } from '../graphql/queries'
import { useEffect } from 'react';

/* The grid: Four equal columns that floats next to each other */
const Column = styled.div`
  float: left;
  width: 25%;
  padding: 10px;

  img{
    opacity: 0.8;
    cursor: pointer;
  }
  img:hover{
    opacity: 1;

  }
`

/* Clear floats after the columns */
const Row = styled.div`
  :after{
    content: "";
    display: table;
    clear: both;

  }
`

const Container = styled.div`
  position: relative;
  display: none;

`

/* Expanding image text */
const Imgtext = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  color: white;
  font-size: 20px;

`
/* Closable button inside the image */
const Closebtn = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
  color: white;
  font-size: 35px;
  cursor: pointer;

`

const Wrapper = styled.div`
  // background-color: #444;
  // width: 60%;
  display: flex;
  flex-wrap: wrap;
  align-items: center; 
  justify-content: center;
  flex-direction: column;

  h1{
    margin: 5px;
  }
`


const CanvasWrapper = styled.div`
  display: flex;

`

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-item: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;

  button{
    margin-left: 10px;
    margin-right: 10px;
  }

`

const handleClickImg = (imgs) => {
  // Get the expanded image
  var expandImg = document.getElementById("expandedImg");
  // Get the image text
  var imgText = document.getElementById("imgtext");
  // Use the same src in the expanded image as the image being clicked on from the grid
  expandImg.src = imgs.src;
  // Use the value of the alt attribute of the clickable image as text inside the expanded image
  imgText.innerHTML = imgs.alt;
  // Show the container element (hidden with CSS)
  expandImg.parentElement.style.display = "block";
}



const Gallery = () => {
  const navigate = useNavigate();
  const goCreate = () => {
    navigate('/edit')
  }

  const { user } = useComic();

  //get data from backend 
  // const [queryImg, { loading, error, data: imgData, subscribeToMore }] = useLazyQuery(
  //   IMAGE_QUERY, {
  //   variables: {
  //     user: user.name
  //   }
  // })
  // await queryImg()
  const [queryImg, { loading, error, data: imgData, networkStatus }] = useLazyQuery(
    IMAGE_QUERY, {
    variables: { email: user.email },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  })


  const showImage = async () => {
    await queryImg(user.email)
    console.log(imgData)
    console.log(imgData.image.Image.length - 1)

    const reloadlink = imgData.image.Image[imgData.image.Image.length - 1].link ?? []
    const canvas_show = document.getElementById('canvas');
    const context_show = canvas_show.getContext('2d')

    const image = new Image();
    image.src = reloadlink;

    image.onload = () => {
      context_show.clearRect(0, 0, canvas_show.width, canvas_show.height)

      canvas_show.width = image.width;
      canvas_show.height = image.height;
      context_show.drawImage(image, 0, 0, canvas_show.width, canvas_show.height);
    }
  }

  
  // if (loading) return 'Loading...'
  // if (error) return 'Error! ${error.message}'

  return (
    <>
      <Title />
      <Wrapper>
        <h1>My Gallery</h1>

        <ButtonWrapper>

          <button className='gallery button' onClick={showImage}>Reload Picture</button>
          <button className='gallery button' onClick={goCreate}>Back to Create</button>

        </ButtonWrapper>
        <CanvasWrapper>
          {loading? <p>'Loading...'</p>
            : error? <p>'Error! ${error.message}'</p>
            :<canvas id='canvas'
              style={{ backgroundColor: '#fff'}}
              width='650px'
              height='500px'
            >Canvas_show</canvas>
          
          }

        </CanvasWrapper>

        <Row>
          {/* <Column>
            <img src="img_nature.jpg" alt="Nature" onClick={handleClickImg}/>
          </Column>
          <Column>
            <img src="img_snow.jpg" alt="Snow" onClick={handleClickImg} />
          </Column>
          <Column>
            <img src="img_mountains.jpg" alt="Mountains" onClick={handleClickImg} />
          </Column>
          <Column>
            <img src="img_lights.jpg" alt="Lights" onClick={handleClickImg} />
          </Column> */}
        </Row>


        <Container>
          {/* 
          <span onClick={parentElement.style.display='none'} className="closebtn">&times;</span>
  
  
          <img id="expandedImg" style="width:100%" /> */}

          <Imgtext />
        </Container>

      </Wrapper>
    </>
  )

}

export default Gallery;