import React, { useEffect, useState } from 'react';
import 'react-slideshow-image/dist/styles.css';
import './VerticalMarquee.css';
import { generateRandomNumbers, isEmpty } from '../../utils';
import { serverURL } from '../../config';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const VerticalMarquee = (props) => {
    const navigate = useNavigate();
    const itemList = useSelector((state) => state.category.itemList);
    let tempArray = [];
    // if (!isEmpty(itemList)) {
    //     let temp = generateRandomNumbers(itemList.length, 9);
    //     for(let j=0;j < temp.length; j++){
    //         tempArray.push(itemList[temp[j]])
    //     }
    // } 
    tempArray = itemList?.slice(3, 12);
    
    const handleDetails = (id) => {
        let strUrl = "/item/" + id;
        navigate(strUrl);
    };
    // console.log("tempArray", tempArray)
    return (
        <div>
            <div className="container">
                <div className="second-section">
                    <table className='second-section-table'>
                        {tempArray && tempArray.length > 0 &&
                            <tbody className='second-section-tbody'>
                                <tr>
                                    <td rowSpan="2" className='second-section-11' onClick={e => {e.preventDefault();handleDetails(tempArray[0].id)}}>
                                        <img src={serverURL + tempArray[0]?.image} alt='img1' />
                                        <div className='second-section-productname'>{tempArray[0]?.name}</div>
                                        <div className='second-section-product-quantity'>{tempArray[0]?.quantity} Items</div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[1].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[1]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[1]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[1]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[2].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[2]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[2]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[2]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[3].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[3]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[3]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[3]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[4].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[4]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[4]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[4]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                <td>
                                    <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[5].id)}}>
                                        <img className='second-section-00' src={serverURL + tempArray[5]?.image} alt='img1' />
                                        <div className='second-section-subcontent'>
                                            <span className='second-section-productname'>{tempArray[5]?.name}</span>
                                            <span className='second-section-product-quantity'>{tempArray[5]?.quantity} Items</span>
                                        </div>
                                    </div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[6].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[6]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[6]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[6]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[7].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[7]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[7]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[7]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <div className='second-section-00-parent' onClick={e => {e.preventDefault();handleDetails(tempArray[8].id)}}>
                                            <img className='second-section-00' src={serverURL + tempArray[8]?.image} alt='img1' />
                                            <div className='second-section-subcontent'>
                                                <span className='second-section-productname'>{tempArray[8]?.name}</span>
                                                <span className='second-section-product-quantity'>{tempArray[8]?.quantity} Items</span>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        }
                    </table>
                </div>
            </div>

        </div>
    );
};

export default VerticalMarquee;