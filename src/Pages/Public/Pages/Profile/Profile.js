import "./Profile.css";
import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getClient, isAuth } from "../../../../axiosConfig/Auth";
import userImage from "../../../../Assets/images/clients/user.jpg";
import { addData, deleteData, getData } from "../../../../axiosConfig/API";
import Swal from "sweetalert2";

export default function Profile() {
    const location = useLocation();
    const navigate = useNavigate();
    const [client, setClient] = useState({});
    const [subscribe, setSubscribe] = useState();
    const [reservations, setReservations] = useState([]);
    const [orders, setOrders] = useState([]);
    const [articlesComments, setArticlesComments] = useState([]);

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuth();
            if (authStatus === false) navigate(-1)
        }
        checkAuth();
    }, [location, navigate]);

    useEffect(() => {
        const fetch = getClient();
        if (fetch) setClient(JSON.parse(fetch));
    }, [location]);

    const fetchReservations = useCallback(async (id) => {
        try {
            const result = await getData(`reservations/${id}`);
            if (result.status === 200) {
                setReservations(result.result);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchOrders = useCallback(async (id) => {
        try {
            const result = await getData(`orders/${id}`);
            if (result.status === 200) {
                setOrders(result.result);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchArticlesComments = useCallback(async (id) => {
        try {
            const result = await getData(`article_comments/client/${id}`);
            if (result.status === 200) {
                setArticlesComments(result.result);
            }
        } catch (error) {
            console.error(error);
        }
    }, []);

    const fetchSubscribe = useCallback(async (email) => {
        try {
            const result = await getData(`subscribes/${email}`);
            if (result && result.status === 200) {
                setSubscribe(true);
            } else {
                setSubscribe(false);
            }
        } catch (error) {
            setSubscribe(false);
            console.error(error);
        }
    }, []);

    useEffect(() => {
        if (client && client.id) {
            fetchReservations(client.id);
            fetchOrders(client.id);
            fetchArticlesComments(client.id);
            fetchSubscribe(client.email);
        }
    }, [fetchReservations, fetchOrders, fetchArticlesComments, fetchSubscribe, client]);

    const handleSubmit = async (e, type) => {
        e.classList.add('load');

        if (client) {
            try {
                let response;
                if (type === 'subscribe') {
                    response = await addData("subscribes", { email: client.email });
                    if (response.status === 200) {
                        setSubscribe(true);
                    }
                } else {
                    response = await deleteData(`subscribes/${client.email}`);
                    if (response.status === 200) {
                        setSubscribe(false);
                    }
                }

                if (response.status === 200) {
                    e.classList.remove('load');
                    Swal.fire("Saved!", response.result, "success");
                } else {
                    setSubscribe(false);
                }
            } catch (error) {
                setSubscribe(false);
                Swal.fire("Error!", error.response?.data?.result, "error");
            }
        }
    };

    const handleDelete = async (e, type, id) => {
        if (type && id) {
            let row = e.parentElement.parentElement;
            e.classList.add("load");

            try {
                const response = await deleteData(`${type}/${id}`);

                if (response.status === 200) {
                    row.classList.add('hide');
                    setTimeout(() => row.remove(), 200);

                    Swal.fire("Saved!", response.result, "success");
                }
                row.classList.remove("load");
            } catch (error) {
                row.classList.remove("load");
                Swal.fire("Error!", error.response?.data?.result, "error");
            }
        }
    };

    const handleClipboard = async (element, text) => {
        element.classList.add("fa-check");
        element.classList.remove("fa-copy");
        setTimeout(() => {
            element.classList.remove("fa-check");
            element.classList.add("fa-copy");
        }, 1000);
        await window.navigator.clipboard.writeText(text);
    };

    return (
        <div className="Profile">
            <div className="container">
                <div className="client">
                    <div className="client-info">
                        <div className="image">
                            <img src={client.image || userImage} alt={client.name} />
                        </div>

                        <div className="text">
                            <p>
                                <span>{client.name}</span>
                                <span><i className="fas fa-copy btnActive" onClick={(e) => handleClipboard(e.target, client.name)}></i></span>
                            </p>
                            <p>
                                <span>{client.email}</span>
                                <span><i className="fas fa-copy btnActive" onClick={(e) => handleClipboard(e.target, client.email)}></i></span>
                            </p>
                            <p>
                                <span>{client.phone}</span>
                                <span><i className="fas fa-copy btnActive" onClick={(e) => handleClipboard(e.target, client.phone)}></i></span>
                            </p>
                        </div>
                    </div>

                    <div className="subscribe" id="subscribe">
                        {subscribe ?
                            <div className="inner">
                                <span>You are subscribed.!</span>
                                <button className="btn btnActive unSubscribe" onClick={(e) => handleSubmit(e.target, "unSubscribe")}>unSubscribe</button>
                            </div>
                            :
                            <div className="inner">
                                <span>You are not subscribed.!</span>
                                <p>Do you want to subscribe now?</p>
                                <button className="btn btnActive details" onClick={(e) => handleSubmit(e.target, "subscribe")}>subscribe</button>
                            </div>
                        }
                    </div>
                </div>

                {reservations.length > 0 && <>
                    <h3>your reservations:-</h3>
                    <div className="dataTable reservations">
                        <table>
                            <tbody>
                                {reservations.map((reservation, index) => (
                                    <tr key={index}>
                                        <td>{reservation.updated_at}</td>
                                        <td>{reservation.time}</td>
                                        <td>{reservation.capacity} people</td>
                                        <td><span className={reservation.status}>{reservation.status}</span></td>
                                        <td>
                                            {/* <i className="fas fa-edit btnActive"></i> */}
                                            <i className="fas fa-xmark btnActive" onClick={(e) => handleDelete(e.target, "reservations", reservation.id)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>}

                {orders.length > 0 && <>
                    <h3>your orders:-</h3>
                    <div className="dataTable orders">
                        <table>
                            <tbody>
                                {orders.map((order, index) => (
                                    <tr key={index}>
                                        <td>{order.updated_at}</td>
                                        <td><span className={order.status}>{order.status}</span></td>
                                        <td>${order.total}</td>
                                        <td>{order.wayEat}</td>
                                        <td>{order.wayPay}</td>
                                        <td>
                                            {/* <i className="fas fa-edit btnActive"></i> */}
                                            <i className="fas fa-xmark btnActive" onClick={(e) => handleDelete(e.target, "orders", order.id)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>}

                {articlesComments.length > 0 && <>
                    <h3>Your comments on the articles:-</h3>
                    <div className="dataTable articlesComments">
                        <table>
                            <tbody>
                                {articlesComments.map((comment, index) => (
                                    <tr key={index}>
                                        <td>{comment.updated_at}</td>
                                        <td>{comment.feeling || '- - -'}</td>
                                        <td>
                                            <i className="fas fa-arrow-up-right-from-square btnActive"></i>
                                            <i className="fas fa-xmark btnActive" onClick={(e) => handleDelete(e.target, "article_comments", comment.id)}></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>}

                <ul>
                    <li>articles comments *</li>
                    <li>recipes favorite *</li>
                </ul>
            </div>
        </div>
    );
}
