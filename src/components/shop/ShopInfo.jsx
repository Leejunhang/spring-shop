import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Row, Col, Button} from 'react-bootstrap'
import { BsFillHeartFill,  } from "react-icons/bs";
import { BsHeart } from "react-icons/bs";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ReviewPage from './ReviewPage';


const ShopInfo = () => {
    const {pid} = useParams();
    const [shop, setShop] = useState('');
    const {title, maker, image, fmtprice, fmtdate, ucnt, fcnt} = shop;

    const getShop = async() => {
    const res = await axios(`/shop/info/${pid}?uid=${sessionStorage.getItem("uid")}`);
        setShop(res.data);
        //console.log(res.data);
    }

    useEffect(()=>{
        getShop();
    }, []);
    const onClickBsHeart = async() => {
        if(!sessionStorage.getItem("uid")){
            sessionStorage.setItem("target", `/shop/info/${pid}`);
            window.location.href="/login";    
    }else{
        //좋아요 추가
        await axios.get(`/shop/insert/favorites?pid=${pid}&uid=${sessionStorage.getItem("uid")}`);
        alert("좋아요 추가");
        getShop();
    }
}

    const onClickBsFillHeartFill = async () => {
        await axios(`/shop/delete/favorites?uid=${sessionStorage.getItem("uid")}&pid=${pid}`);
        alert("좋아요 삭제!");
        getShop();
    }

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>[{pid}] 상품정보</h1>
            <Row className='mx-5'>
                <Col md={4}>
                    <img src={`/display?file=${image}`} width="90%" className='image'/>
                </Col>
                <Col>
                    <h5>
                        [{pid}] {title}
                        <span className='heart mx-2'>
                            {ucnt === 0 ? <BsHeart onClick={onClickBsHeart}/> : <BsFillHeartFill onClick={onClickBsFillHeartFill}/>}
                            <small style={{fontSize:'0.7rem'}}>{fcnt}</small>
                        </span>
                    </h5>
                    <hr/>
                    <div>가격: {fmtprice}원</div>
                    <div>제조사: {maker}</div>
                    <div>등록일: {fmtdate}</div>
                    <hr/>
                    <div className="text-center">
                        <Button variant='success' className='px-5'>바로구매</Button>
                        <Button variant='warning' className='px-5 ms-3'>장바구니</Button>
                    </div>
                </Col>
            </Row>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="my-5"
                >
                <Tab eventKey="home" title="상세설명">
                
                </Tab>
                <Tab eventKey="profile" title="상품리뷰">
                    <ReviewPage pid={pid}/>
                </Tab>
            </Tabs>
        </div>
    )
}

export default ShopInfo