import React, { useState, useEffect, useContext } from "react";
import { ethers } from 'ethers';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import User from "../../store/api/User"; 
import  showToast  from "../../helper/Api";
import { useNavigate } from 'react-router-dom';
import Pagination from "../../components/Common/Pagination";
import {Loader} from "../Loader"
import {displayDateFormat} from "../../helper/Common";

import Emitter from '../../services/emitter';
import * as Actions from "../../store/action/user";

const Transaction = (props) => {

  const [showLoader, setShowLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [kycStatus, setKycStatus] = useState("");
  const navigate = useNavigate();

  const { list } = props.user;
  const param = {
    page_number: page,
    page_size: 10
  };

  useEffect( () => {
    setShowLoader(true);
      props.getTransactionList(param);
    setShowLoader(false);
}, [page]);   
 
   
  useEffect( () => {
    setShowLoader(true);
    async function setup() {
        setShowLoader(true);
         
          await User.getUserDetail().then((res) => {
          if(res.data.statusCode === 200){
            let result = res.data.result;
            props.getUserFullName(result)
            Emitter.emit('setKycStatus', result.kyc_status);
            setKycStatus(result.kyc_status);
          }
          setShowLoader(false);
          }).catch((e) => {
              setShowLoader(false);
          })

        setShowLoader(false);
    }
    setup();
  },[]);
 
 
    return (
      <>
       <section className="section transaction-page" id="transactions">
            <div className="container-fluid">
               <div className="transaction-page-wrp px-sm-3">
                <div className="row my-5">
                    <h1 className="mb-5 dashboard-title"><span className="dsbrd-title">Transactions List</span></h1>
                    <div className="col">
                    {list ? (
                              <>
                              <div className="table-responsive">
                                  <table  className="table table-dark">
                                        <thead>
                                            <tr  className="top-tble-bg">
                                                <th scope="col" className="transaction-top-title">Transaction Id</th>
                                                <th scope="col" className="transaction-top-title">Tokens</th>
                                                <th scope="col" className="transaction-top-title">Amount</th>
                                                <th scope="col" className="transaction-top-title">Transaction Hash</th>
                                                <th scope="col" className="transaction-top-title">Date</th>
                                                <th scope="col" className="transaction-top-title">Status</th>
                                                <th scope="col" className="transaction-top-title">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {list.data.map((row,index) => {
                                          let viewBlockExpoler;
                                          if(row.transaction_hash){
                                            viewBlockExpoler =  `https://goerli.etherscan.io/tx/${row.transaction_hash}`
                                          }
                                          
                                          return ( 
                                              <tr   key={row.id}>
                                                
                                              <td className="transaction-data">T{row.id}</td>
                                              <td className="transaction-data">+{row.tokens}  <div className="data-text-btm">MFlix</div></td>
                                              <td className="transaction-data">{row.amount} <div className="data-text-btm"> 
                                              {row.coin !== '' ? row.coin : "BNB" }
                                              </div></td>
                                              <td className="transaction-data"> { row.transaction_hash &&
                                                String(row.transaction_hash).substring(0, 6) +"..." }</td>
                                              <td className="transaction-data">{displayDateFormat(row.created_at)}</td>
                                              <td className="transaction-data"><span className={`staus-btn-success  ${row.status} `}>{row.status}</span></td>
                                              <td className="transaction-data">{row.transaction_hash && 
                                              <div className="profile-btn"><a  href={viewBlockExpoler} 
                                                  target="	_blank"
                                                  className="btn profile-btn-text"><span className="register-btn-txt">View</span> </a>
                                                  </div>
                                                  }
                                              </td>
                                          </tr>
                                            )})}
                                        </tbody>
                                  </table>
                                  
                                      <Pagination dataList={list} page={page} setPage={setPage} />
                              </div>
                              </>
                          ) : null}
                  
                        
                    </div>
                </div>
              </div>
            </div>
        </section>  
      {showLoader && <Loader />}
      </>
    )
}


const mapStateToProps = (state) => {
  return {
    user: state.User,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...Actions }, dispatch,),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
