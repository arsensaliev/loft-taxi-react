import React, { useState, useCallback } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { cancelOrder, fetchRouteRequest } from "../../redux/actions";
import { useForm, Controller } from "react-hook-form";

const customStyle = {
    control: provided => ({
        ...provided,
        display: "flex",
        border: "none",
        borderRadius: 0,
        borderBottom: "1px solid"
    })
};

export const OrderForm = () => {
    const address = useSelector(state => state.address);
    const dispatch = useDispatch();

    const [order, setOrder] = useState(false);
    const [addressOne, setAddressOne] = useState(null);
    const [addressTwo, setAddressTwo] = useState(null);

    const options = address.map(option => ({ value: option, label: option }));
    const availableOptions = options.filter(
        option => ![addressOne, addressTwo].includes(option.label)
    );
    const { control, handleSubmit } = useForm();
    const onSubmit = e => {
        dispatch(
            fetchRouteRequest({
                address1: addressOne,
                address2: addressTwo
            })
        );
        setOrder(true);
    };

    const handleAddressOne = useCallback(
        ([selected]) => {
            const value = selected ? selected.value : null;
            setAddressOne(value);
        },
        [setAddressOne]
    );

    const handleAddressTwo = useCallback(
        ([selected]) => {
            const value = selected ? selected.value : null;
            setAddressTwo(value);
        },
        [setAddressTwo]
    );

    const handleCancel = useCallback(
        e => {
            setOrder(false);
            dispatch(
                cancelOrder({
                    status: false,
                    coordinates: null
                })
            );
            setAddressOne(null);
            setAddressTwo(null);
        },
        [setOrder, dispatch]
    );
    return (
        <>
            {order ? (
                <>
                    <h1>Заказ размещён</h1>
                    <p className="panel__subtext">
                        Ваше такси уже едет к вам. Прибудет приблизительно через
                        10 минут.
                    </p>
                    <button className="form__btn" onClick={handleCancel}>
                        Сделать новый заказ
                    </button>
                </>
            ) : (
                <form action="" method="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="address__group">
                        <Controller
                            as={<Select />}
                            className="address__input"
                            options={availableOptions}
                            styles={customStyle}
                            placeholder="Откуда"
                            onChange={handleAddressOne}
                            isClearable
                            isSearchable
                            noOptionsMessage={() => "Введите корректный адрес"}
                            name="addressOne"
                            control={control}
                            defaultValue=""
                        />
                        <Controller
                            as={<Select />}
                            className="address__input"
                            options={availableOptions}
                            styles={customStyle}
                            placeholder="Куда"
                            onChange={handleAddressTwo}
                            isClearable
                            isSearchable
                            noOptionsMessage={() => "Введите корректный адрес"}
                            name="addressTwo"
                            control={control}
                            defaultValue=""
                        />
                    </div>
                    <input
                        type="submit"
                        className="form__btn"
                        value="Вызвать такси"
                        data-testid="submit"
                        disabled={!addressOne || !addressTwo}
                    />
                </form>
            )}
        </>
    );
};
