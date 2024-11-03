import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

export default function Control() {
    // 각 모터의 상태를 관리하는 상태 변수
    const [motorSettings, setMotorSettings] = React.useState(
        Array(5).fill({ isOn: false, strength: 1 })
    );

    // 각 전원의 상태를 관리하는 상태 변수 (각 전원에 두 개의 스위치 상태 포함)
    const [powerSettings, setPowerSettings] = React.useState(
        Array(2).fill({ isOn1: false, isOn2: false })
    );

    // 모터의 켜기/끄기 스위치 상태를 변경하는 함수
    const toggleMotor = (index) => {
        setMotorSettings((prevSettings) => {
            const newSettings = [...prevSettings];
            newSettings[index] = {
                ...newSettings[index],
                isOn: !newSettings[index].isOn
            };
            return newSettings;
        });
    };

    // 모터의 강도 슬라이더 상태를 변경하는 함수
    const setStrength = (index, value) => {
        setMotorSettings((prevSettings) => {
            const newSettings = [...prevSettings];
            newSettings[index] = {
                ...newSettings[index],
                strength: value
            };
            return newSettings;
        });
    };

    // 전원의 첫 번째 스위치 상태를 변경하는 함수
    const togglePower1 = (index) => {
        setPowerSettings((prevSettings) => {
            const newSettings = [...prevSettings];
            newSettings[index] = {
                ...newSettings[index],
                isOn1: !newSettings[index].isOn1
            };
            return newSettings;
        });
    };

    // 전원의 두 번째 스위치 상태를 변경하는 함수
    const togglePower2 = (index) => {
        setPowerSettings((prevSettings) => {
            const newSettings = [...prevSettings];
            newSettings[index] = {
                ...newSettings[index],
                isOn2: !newSettings[index].isOn2
            };
            return newSettings;
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>전원 제어</Text>
            {powerSettings.map((power, index) => (
                <View key={index} style={styles.powerContainer}>
                    <Text style={styles.powerTitle}>전원 {index + 1}</Text>
                    <View style={styles.controlRow}>
                        <Text style={styles.onOffText}>끄기</Text>
                        <Switch
                            value={power.isOn1}
                            onValueChange={() => togglePower1(index)}
                        />
                        <Text style={styles.onOffText}>켜기</Text>
                        <Switch
                            value={power.isOn2}
                            onValueChange={() => togglePower2(index)}
                            style={styles.switchSpacing}
                        />
                        <Text style={styles.onOffText}>보조 전원</Text>
                    </View>
                </View>
            ))}

            <Text style={styles.sectionTitle}>모터 제어</Text>
            {motorSettings.map((motor, index) => (
                <View key={index} style={styles.motorContainer}>
                    <Text style={styles.motorTitle}>모터 {index + 1}</Text>
                    <View style={styles.controls}>
                        <View style={styles.controlRow}>
                            <Text style={styles.onOffText}>끄기</Text>
                            <Switch
                                value={motor.isOn}
                                onValueChange={() => toggleMotor(index)}
                            />
                            <Text style={styles.onOffText}>켜기</Text>
                            <Slider
                                style={styles.slider}
                                minimumValue={1}
                                maximumValue={3}
                                step={1}
                                value={motor.strength}
                                onValueChange={(value) => setStrength(index, value)}
                            />
                            <Text style={styles.strengthText}>{motor.strength}단계</Text>
                        </View>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    powerContainer: {
        width: 'auto',
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    powerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    motorContainer: {
        width: 'auto',
        padding: 15,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    motorTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    controls: {
        alignItems: 'center',
    },
    controlRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    onOffText: {
        fontSize: 16,
    },
    switchSpacing: {
        marginHorizontal: 15,
    },
    slider: {
        width: 150,
        height: 40,
        marginHorizontal: 10,
    },
    strengthText: {
        fontSize: 16,
    },
});
