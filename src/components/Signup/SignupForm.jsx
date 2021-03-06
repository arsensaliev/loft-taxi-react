import React, { useCallback, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { fetchAuthRequest } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

const SignupForm = () => {
    const history = useHistory();
    const state = useSelector(state => state);
    const dispatch = useDispatch();
    const [inputData, setData] = useState({
        email: "",
        name: "",
        surname: "",
        password: ""
    });
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
                    name: inputData.name.toUpperCase(),
                    surname: inputData.surname.toUpperCase(),
                    path: "register"
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
            <h1 className="form__title">Регистрация</h1>
            <div className="form__subtitle">
                Уже зарегистрированы? <Link to="/login">Войти</Link>
            </div>
            <div className="input__group">
                <label htmlFor="email" className="input__label">
                    Адрес электронной почты<sup>*</sup>
                </label>
                <input
                    type="text"
                    name="email"
                    className="form__input"
                    value={inputData.email}
                    data-testid="email-field"
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="input__row">
                <div className="input__block">
                    <label htmlFor="name" className="input__label">
                        Имя
                    </label>
                    <input
                        type="text"
                        name="name"
                        className="form__input"
                        value={inputData.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="input__block">
                    <label htmlFor="surname" className="input__label">
                        Фамилия
                    </label>
                    <input
                        type="text"
                        name="surname"
                        className="form__input"
                        value={inputData.surname}
                        onChange={handleChange}
                    />
                </div>
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
                value="Зарегистрироваться"
                data-testid="submit-button"
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

export default SignupForm;
