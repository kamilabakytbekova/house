import React from 'react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';
import {useSelector} from "react-redux";


const MapComponent = () => {
    const data = useSelector((state) => state.data.data )
    return (
        <div>
            <YMaps>
                <Map
                    width={'60%'}
                    height={'500px'}
                    defaultState={{center: [42.875728, 74.593255], zoom: 9}}
                >
                    {
                        data.map((item)=> <Placemark key={item.id} geometry={[Number(item.lng) , +item.ltd]} />)
                    }
                </Map>
            </YMaps>
            <div>
                {data.map((item) => <div key={item.id}>{item.title}</div>)}
            </div>
        </div>
    )
}

export default MapComponent;