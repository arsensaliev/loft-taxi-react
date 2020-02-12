import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { logoutAction } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const HeaderMenu = () => {
    const dispatch = useDispatch();
    const handleClick = useCallback(e => {
        e.preventDefault();
        localStorage.clear();
        dispatch(logoutAction());
    },[dispatch]);

    return (
        <ul className="header__menu">
            <li className="menu__item">
                <Link to="/map">Карта</Link>
            </li>
            <li className="menu__item">
                <Link to="/profile">Профиль</Link>
            </li>
            <li className="menu__item">
                <a href="/" onClick={handleClick}>
                    Выйти
                </a>
            </li>
        </ul>
    );
};

export default HeaderMenu;
