import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchAuthRequest } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const LoginForm = () => {
    const history = useHistory();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [inputData, setData] = useState({ email: "", password: "" });
    const handleChange = useCallback(
        ({ target }) => {
            setData({ ...inputData, [target.name]: target.value });
        },
        [inputData]
    );

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            dispatch(
                fetchAuthRequest({
                    email: inputData.email,
                    password: inputData.password,
                    path: "auth"
                })
            );
        },
        [inputData, dispatch]
    );

    if (state.isLoggedIn) {
        history.push("/map");
    }
    return (
        <form
            action=""
            method=""
            onSubmit={handleSubmit}
            className="form"
            id="loginForm"
            data-testid="LoginForm"
        >
            <h1 className="form__title">Войти</h1>
            <div className="form__subtitle">
                Новый пользователь? <Link to="/signup">Зарегистрируйтесь</Link>
            </div>
            <div className="input__group">
                <label htmlFor="email" className="input__label">
                    Имя пользователя<sup>*</sup>
                </label>
                <input
                    type="text"
                    name="email"
                    className="form__input"
                    value={inputData.email}
                    data-testid="login-field"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input__group">
                <label htmlFor="password" className="input__label">
                    Пароль<sup>*</sup>
                </label>
                <input
                    type="password"
                    name="password"
                    className="form__input"
                    value={inputData.password}
                    data-testid="password-field"
                    onChange={handleChange}
                    required
                />
            </div>
            <input
                type="submit"
                value="Войти"
                data-testid="authButton"
                className="form__btn"
            />
            {state.pending ? (
                <div className="pending">
                    <div className="pending__inner"></div>
                </div>
            ) : null}
        </form>
    );
};

export default LoginForm;
