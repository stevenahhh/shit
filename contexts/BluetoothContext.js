// contexts/BluetoothContext.js
import React, { createContext, useState } from 'react';

export const BluetoothContext = createContext();

export const BluetoothProvider = ({ children }) => {
    const [temperature, setTemperature] = useState(null);
    const [humidity, setHumidity] = useState(null);

    return (
        <BluetoothContext.Provider value={{ temperature, setTemperature, humidity, setHumidity }}>
            {children}
        </BluetoothContext.Provider>
    );
};
