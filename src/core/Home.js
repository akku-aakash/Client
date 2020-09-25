import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { Container, Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import Cardd from './Cardd';
import Cardd1 from './Cardd1';
import Cardd2 from './Cardd2';
import '../style/home.css'
import AliceCarousel from 'react-alice-carousel'
import "react-alice-carousel/lib/alice-carousel.css";
import Ballon from '../images_icons/Baloons.svg'
import Deco from '../images_icons/bunting.svg'
import Serv from '../images_icons/rocking.svg'
import Cel from '../images_icons/cel.jfif'
import Cel1 from '../images_icons/cell1.jfif'
import Menu from './Menu'
import Loading from '../homeCore/LoadingPage';
import {FaUsers, FaUserGraduate, FaRegBuilding, FaUniversity} from 'react-icons/fa'

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])
  const [productByExp, setProductByExp] = useState([]);

  const loadProductBySell = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/products/by/category?category=5f5f13b20f137d00170ba26c`)
      .then(res => {
        setProductBySell(res.data);
        setLoading(false);
      })
      .catch(err => {
        toast.error(`Server Error`, err);
      });

  }

  const loadProductByArrival = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/products/by/category?category=5f5f13d60f137d00170ba26e`)
      .then(res => {
        setProductByArrival(res.data);
      })
      .catch(err => {
        toast.error(`Server Error`, err);
      });

  }

  const loadProductByExp = () => {

    axios
      .get(`${process.env.REACT_APP_API_URL}/products/by/category?category=5f5f13c80f137d00170ba26d`)
      .then(res => {
        setProductByExp(res.data);
      })
      .catch(err => {
        toast.error(`Server Error`, err);
      });

  }


  useEffect(() => {
    loadProductByArrival()
    loadProductBySell()
    loadProductByExp()
  }, [])

  const state = {
    galleryItems: productByArrival.map((product, i) => (<Cardd key={i} product={product} />)),
  }

  const state1 = {
    galleryItems: productBySell
      .map((product, i) => {
        return (
          <div>
            <Cardd1 key={i} product={product} />
          </div>
        )
      }
      )
  }

  const state2 = {
    galleryItems: productByExp
      .map((product, i) => {
        return (
          <div>
            <Cardd2 key={i} product={product} />
          </div>
        )
      }
      )
  }

  const responsive = {
    0: { items: 1 },
    800: { items: 2 },
    1200: { items: 3 },
  }

  return (
    <div className="homee">
      <Helmet>
        <title>Diy Decor box, unique gift ideas, surprise and experiences pan India</title>
        <meta name="description" content="Buy online birthday decoration kit, diy decor box for an anniversary, baby shower and festivals. Explore unique gift ideas, birthday gifts, surprise gifts, virtual gifts. Book birthday and surprise planners, candlelight dinners, home surprises, and pan India experiences and activities for couples, families, and corporates." />
        <meta name="keywords" content="diy decor box birthday decoration kit birthday decoration kit online unique gifts unique gift ideas birthday gifts anniversary gifts surprise gifts virtual gift ideas virtual gifts online surprise planners surprise party planners book surprises book experiences " />
        <meta name="author" content="Bunny Bash" />
        <meta name="robots" content="index, follow"></meta>
      </Helmet>
      <ToastContainer />
      <div className="home">
        <Container fluid>
          <Row>
            <Col sm={12} md={4}>
              <div className="home1">
                <a href="https://wa.link/963jrk" rel="noopener noreferrer" target="_blank"><i className="fa fa-whatsapp"></i></a>
                <a href="https://www.facebook.com/bunnybash.in/" rel="noopener noreferrer" target="_blank"><i className="fa fa-facebook"></i></a>
                <a href="https://www.instagram.com/bunnybash_india/" rel="noopener noreferrer" target="_blank" ><i className="fa fa-instagram"></i></a>
                <a href="https://www.linkedin.com/company/bunny-bash-events-and-rentals/" rel="noopener noreferrer" target="_blank"><i className="fa fa-linkedin"></i></a>
                <a href="https://twitter.com/bunnybash_in" rel="noopener noreferrer" target="_blank"><i className="fa fa-twitter"></i></a>
                <a href="https://twitter.com/bunnybash_in" rel="noopener noreferrer" target="_blank"><i className="fa fa-youtube-play"></i></a>
              </div>
            </Col>
            <Col sm={12} md={4}>
              <p><b><i className="fa fa-map-marker"></i> Central Office:</b> 22/1, Kalkere Main Road, Bengaluru</p>
            </Col>
            <Col sm={12} md={4}>
              <p><b><i className="fa fa-phone"></i> Call on WhatsApp:</b> 7760 299 299</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Menu />
      <div className="home6">
        <div className="home64">
          <h2>Welcome To BunnyBash</h2>
          <h4>Parties | Rentals | Moments</h4>
        </div>
        <div className="home61">
          <img src={Ballon} alt=" " />
        </div>
        <div className="home62">
          <img src={Serv} alt=" " />
        </div>
        <div className="home63">
          <img src={Deco} alt=" " />
        </div>
      </div>
      <div className="home9">
        <h2 style={{ textAlign: 'center' }}>TOP DIY KITS</h2>
        <div className="home91">
          <div className="home94">
            <div className="home92">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <h1><i className="fa fa-gift"></i></h1>
            <div className="home93">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        {
          loading ? <Loading /> :
            <div className="home10">
              <AliceCarousel
                items={state.galleryItems}
                responsive={responsive}
                autoPlayInterval={5000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseTrackingEnabled={true}
                playButtonEnabled={false}
                disableAutoPlayOnAction={true}
                dotsDisabled={true}
              />
            </div>
        }
        <div className="home12">
          <Link to='/products/diykit'> <p className="home121">View More</p></Link>
        </div>
      </div>
      <div className="home11">
        <h2 style={{ textAlign: 'center' }}>TOP UNIQUE GIFTS</h2>
        <div className="home111">
          <div className="home114">
            <div className="home112">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <h1><i className="fa fa-star-half-o"></i></h1>
            <div className="home113">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        {
          loading ? <Loading /> :
            <div className="home115">
              <AliceCarousel
                items={state1.galleryItems}
                responsive={responsive}
                autoPlayInterval={5000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseTrackingEnabled={true}
                playButtonEnabled={false}
                disableAutoPlayOnAction={true}
                dotsDisabled={true}
              />
            </div>
        }
        <div className="home12">
          <Link to='/products/unique/gifts'> <p className="home121">View More</p></Link>
        </div>
      </div>
      <div className="home1111">
        <h2 style={{ textAlign: 'center', letterSpacing: '1.5px', fontWeight: 'bold' }}>TOP EXPERIENCES</h2>
        <div className="home111">
          <div className="home114">
            <div className="home112">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <h1><i className="fa fa-star-half-o"></i></h1>
            <div className="home113">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        {
          loading ? <Loading /> :
            <div className="home115">
              <AliceCarousel
                items={state2.galleryItems}
                responsive={responsive}
                autoPlayInterval={5000}
                autoPlayDirection="rtl"
                autoPlay={true}
                fadeOutAnimation={true}
                mouseTrackingEnabled={true}
                playButtonEnabled={false}
                disableAutoPlayOnAction={true}
                dotsDisabled={true}
              />
            </div>
        }
        <div className="home12">
          <Link to='/products/experience'> <p className="home121">View More</p></Link>
        </div>
      </div>
      <div className="home14">
        <div className="home91">
          <div className="home94">
            <div className="home92">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
            <h1><i className="fa fa-gift"></i></h1>
            <div className="home93">
              <p></p>
              <p></p>
              <p></p>
              <p></p>
            </div>
          </div>
        </div>
        <Container>
          <Row>
            <Col sm={12} lg={6}>
              <div className="home141">
                <div className="home142">
                  <img src={Cel1} alt="" />
                </div>
                <div className="home143">
                  <p>date</p>
                  <h3>Photo Bootth theme at home.</h3>
                  <button><a >Explore <i className="fa fa-arrow-circle-right"></i></a></button>
                </div>
              </div>
            </Col>
            <Col sm={12} lg={6}>
              <div className="home141">
                <div className="home142">
                  <img src={Cel} alt="" />
                </div>
                <div className="home143">
                  <p>date</p>
                  <h3>How to celebrate B'day at home.</h3>
                  <button><a >Explore <i className="fa fa-arrow-circle-right"></i></a></button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home551">
        <div className="home552">
          <div className="home553">
          <h1><FaUsers /></h1>
          <h2>HR Workshops</h2>
          </div>
          <div className="home553">
          <h1><FaRegBuilding /></h1>
          <h2>Corporates Events</h2>
          </div>
          <div className="home553">
          <h1><FaUniversity /></h1>
          <h2>Store Lunch</h2>
          </div>
          <div className="home553">
          <h1><FaUserGraduate /></h1>
          <h2>School Events</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;



// <div className="home13">
// <h2 style={{ textAlign: 'center' }}>Our Top Services</h2>
// <div className="home91">
//   <div className="home94">
//     <div className="home92">
//       <p></p>
//       <p></p>
//       <p></p>
//       <p></p>
//     </div>
//     <h1><i className="fa fa-gift"></i></h1>
//     <div className="home93">
//       <p></p>
//       <p></p>
//       <p></p>
//       <p></p>
//     </div>
//   </div>
// </div>
// <div className="home130">
//   <Container fluid style={{ margin: "0px", padding: "0%" }}>
//     <Row className="home134">
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//     </Row>
//     <Row className="home134">
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//       <Col xs={12} sm={6} md={4} lg={3}>
//         <div className="home131">
//           <div className="home132"><i className="fa fa-star"></i></div>
//           <h6>Birthday Party</h6>
//           <div className="home133"><button>Read More</button></div>
//         </div>
//       </Col>
//     </Row>
//     <div className="home135">
//       <div className="home131">
//         <div className="home132"><i className="fa fa-star"></i></div>
//         <h6>Birthday Party</h6>
//         <div className="home133"><button>Read More</button></div>
//       </div>
//     </div>
//   </Container>
// </div>
// </div>
