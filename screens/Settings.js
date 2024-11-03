import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, FlatList, TouchableOpacity, PermissionsAndroid, Platform } from 'react-native';
import { BleManager } from 'react-native-ble-plx';

const manager = new BleManager();

export default function Settings() {
    const [isScanning, setIsScanning] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [deviceName, setDeviceName] = useState(null);
    const [devices, setDevices] = useState([]); // 스캔된 장치 목록

    useEffect(() => {
        requestPermissions();
        return () => {
            manager.stopDeviceScan();
            manager.destroy();
        };
    }, []);

    // Android에서 Bluetooth 및 위치 권한 요청
    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple([
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
                PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ]);
            const allGranted = Object.values(granted).every((status) => status === 'granted');
            if (!allGranted) {
                console.warn("필수 권한을 허용해주세요.");
            }
        }
    };

    const startScan = () => {
        setIsScanning(true);
        setDevices([]); // 스캔 시작 시 장치 목록 초기화

        manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.error("Scan error:", error);
                setIsScanning(false);
                return;
            }

            // 새로 발견된 장치 목록에 추가
            if (device && device.name && !devices.some((d) => d.id === device.id)) {
                setDevices((prevDevices) => [...prevDevices, device]);
            }
        });
    };

    const stopScan = () => {
        manager.stopDeviceScan();
        setIsScanning(false);
    };

    const connectToDevice = async (device) => {
        try {
            await device.connect();
            await device.discoverAllServicesAndCharacteristics();
            setIsConnected(true);
            setDeviceName(device.name);
            stopScan();
        } catch (error) {
            console.error("Connection error:", error);
            setIsConnected(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>기기 연결 설정</Text>

            <View style={styles.deviceContainer}>
                <Text style={styles.deviceText}>
                    {isConnected ? `연결됨: ${deviceName}` : "연결된 장치 없음"}
                </Text>
                <Button
                    title={isScanning ? "스캔 정지" : "장치 스캔"}
                    onPress={isScanning ? stopScan : startScan}
                />
            </View>

            <Text style={styles.sectionSubtitle}>스캔된 장치 목록</Text>
            <View style={styles.deviceContainer}>
                <FlatList
                    data={devices}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.deviceItem}
                            onPress={() => connectToDevice(item)}
                        >
                            <Text style={styles.deviceName}>{item.name || '이름 없음'}</Text>
                            <Text style={styles.deviceId}>ID: {item.id}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sectionSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    deviceContainer: {
        width: 'auto',
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    deviceText: {
        fontSize: 16,
        color: '#333',
    },
    deviceItem: {
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 10,
    },
    deviceName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deviceId: {
        fontSize: 14,
        color: '#666',
    },
});
