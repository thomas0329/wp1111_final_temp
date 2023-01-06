import styled from 'styled-components';
import Title from '../components/Title';
import { useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useComic } from './hooks/useComic';
import { IMAGE_QUERY } from '../graphql/queries'

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

const CanvasWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%
  position: relative
  margin-top: 20px
  
  canvas{
    position: absolute
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  align-item: center;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: 50%;
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
  const { user } = useComic();

  const [queryImg, { loading, error, data: imgData, subscribeToMore }] = useLazyQuery(
    IMAGE_QUERY,{
      variables: {
        user: user.name
      }
    })

  const reload = async () => {
    //get data from backend 
    console.log(user)
    await queryImg()
    if(error) console.log(error)
    console.log(imgData.image.Image)
    console.log(imgData.image.Image.length - 1)
    const reloadlink = imgData.image.Image[imgData.image.Image.length - 1].link
    // console.log(reloadlink)
    const canvas_show = document.getElementById('canvas');
   
    const context_show = canvas_show.getContext('2d')


    const image = new Image();
    image.src = reloadlink;
    
    image.onload = () => {
      context_show.clearRect(0, 0, canvas_show.width, canvas_show.height)
      
      canvas_show.width = image.width;
      canvas_show.height =  image.height;
      context_show.drawImage(image, 0, 0, canvas_show.width, canvas_show.height);
      // console.log(canvas_show.width)
      // console.log(canvas_show.height)
    }
  }

  const goCreate = () => {
    navigate('/edit')
  }

  return (
    <>
      <Title />
      <h1>My Gallery</h1>

      <ButtonWrapper>

        <button className = 'gallery button' onClick={reload}>Reload</button>
        <button className = 'gallery button' onClick={goCreate}>Back to Create</button>

      </ButtonWrapper>
      <CanvasWrapper>
        <canvas id='canvas'
          width='500px'
          height='500px'
          // style={{ backgroundColor: '#fff' }}
        >Canvas_show</canvas>

        {/* <canvas id='canvas_fig'
          width='500px'
          height='500px'
          style={{ backgroundColor: '#fff' }}

        >Canvas_fig</canvas>

        <canvas id='canvas'
          width='500px'
          height='500px'
          style={{ position: 'absolute' }}

        >Canvas3</canvas> */}
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

    </>
  )
}
export default Gallery;