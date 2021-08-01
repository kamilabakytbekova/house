import React, {useState} from 'react';
import {Map, Placemark, YMaps} from "react-yandex-maps";
import {Button, Input} from '@material-ui/core';
import {useHistory} from "react-router";
import Api from '../../API/Api';
import {Formik} from "formik";
import * as Yup from "yup";

function Dashboard() {
    const history = useHistory()
    const [data, setData] = useState(null)
    const initValue = {
        title: '',
        description: '',
        price: '',
        address: ''
    }
    const submit = async (values) => {
        const val = {
            ...values,
            ltd: data ? data[0] : 0,
            lng: data ? data[1] : 0
        }
        console.log(val)
        Api.createElement(val)
            .then(() => {
                alert('success')
                history.push('/map')
            })
    }
    return (
        <div>

            <Formik
                initialValues={initValue}
                onSubmit={submit}
                validationSchema={Yup.object().shape({
                    title: Yup.string()
                        .min(8, 'Минимум 8 символов')
                        .required("Required"),
                    description: Yup.string()
                        .min(8, 'Минимум 8 символов')
                        .max(25, 'Максимум 25 символов')
                        .required("Required"),
                    price: Yup.number()
                        .required("Required"),
                    address: Yup.string()
                        .required("Required")
                })}
            >
                {
                    (props) => {
                        const {values, touched, errors, handleBlur, handleChange, handleSubmit} = props
                        console.log(touched)
                        const {title, description, address, price} = values
                        return (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title">
                                    {errors.title ? <span style={{color: 'red'}}>*{errors.title}</span> : null }<br/>
                                </label>
                                <Input
                                    onBlur={handleBlur}
                                    id="title"
                                    value={title}
                                    onChange={handleChange}
                                    placeholder="Title"
                                    className={
                                        errors.title && touched.title
                                            ? "text-input error"
                                            : "text-input"
                                    }
                                /><br/>
                                <label htmlFor="title">
                                    {errors.description ? <span style={{color: 'red'}}>*{errors.description}</span> : null }<br/>
                                </label>
                                <Input id="description" value={description} onChange={handleChange}
                                       placeholder="Description"
                                       className={
                                           errors.description && touched.description
                                               ? "text-input error"
                                               : "text-input"
                                       }
                                       onBlur={handleBlur}
                                /><br/>
                                <Input  onBlur={handleBlur} id="price" value={price} onChange={handleChange}
                                       placeholder="Price"
                                        className={
                                            errors.price && touched.price
                                                ? "text-input error"
                                                : "text-input"
                                        }
                                /><br/>
                                <Input  onBlur={handleBlur} id="address" value={address} onChange={handleChange}
                                       placeholder="Address"
                                        className={
                                            errors.address && touched.address
                                                ? "text-input error"
                                                : "text-input"
                                        }
                                /><br/>
                                <YMaps>
                                    <Map
                                        width={'60%'}
                                        height={'500px'}
                                        defaultState={{center: [42.875728, 74.593255], zoom: 9}}
                                        onClick={(e) => setData(e.get('coords'))}
                                    >
                                        {
                                            data && <Placemark geometry={data}/>
                                        }
                                    </Map>
                                </YMaps>
                                <Button type="submit" variant="contained" color="primary">
                                    Submit
                                </Button>
                            </form>
                        )
                    }
                }
            </Formik>
        </div>
    );
}

export default Dashboard;