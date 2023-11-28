import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {Table, Button} from 'react-bootstrap'
import "../Pagination.css";
import Pagination from "react-js-pagination";

const CartList = () => {
    const [list, setList] = useState([]);
    const [total, setTotal] = useState(0);

    const [page, setPage] = useState(1);
    const size=3;
    const uid=sessionStorage.getItem("uid");

    const getList = async() => {
        const res=await axios(`/cart/list.json?page=${page}&size=${size}&uid=${uid}`);
        //console.log(res.data);
        setList(res.data.list);
        setTotal(res.data.total);
    }

    useEffect(()=>{
        getList();
    }, [page]);

    return (
        <div className='my-5'>
            <h1 className='text-center mb-5'>장바구니</h1>
            <div>상품수:<span>{total}</span>개</div>
            <Table striped bordered hover>
                <thead className='text-center'>
                    <tr>
                        <td colSpan={2}>상품명</td>
                        <td>가격</td>
                        <td>수량</td>
                    </tr>
                </thead>
                <tbody>
                    {list.map(c=>
                    <tr key={c.cid}>
                        <td className='text-center'><img src={`/display?file=${c.image}`} width="50"/></td>
                        <td>{c.title}</td>
                        <td className='text-end'>{c.fmtprice}원</td>
                        <td>{c.qnt}</td>
                    </tr>
                    )}
                </tbody>
            </Table>
            {total > size &&
                <Pagination
                    activePage={page}
                    itemsCountPerPage={size}
                    totalItemsCount={total}
                    pageRangeDisplayed={10}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    onChange={(page)=>setPage(page)}/>
            }
        </div>
    )
}

export default CartList