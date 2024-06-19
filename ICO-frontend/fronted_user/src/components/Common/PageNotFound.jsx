import React from 'react'
import { Route, Navigate } from "react-router-dom";

function PageNotFound({ authenticated, token, role }) {
    console.log("sss")
    const userToken = localStorage.getItem("token"),
        userRole = localStorage.getItem("role");
    return (
        <div>
            {
                !userToken ? <Navigate to={{ pathname: `/` }} /> :
                    authenticated && <Navigate to={{ pathname: `/${userRole}/dashboard` }} />
            }

            {token && <section className="notfound-main">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="page-not-found-main">
                                <div className="not-found-des">
                                    <div className="not-found-logo">
                                         
                                    </div>
                                    <h2>404</h2>
                                    <p>Oops! Page not found</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="back-img-error">
                     
                </div>
            </section>
            }
        </div>
    )
}

export default PageNotFound
