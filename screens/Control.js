import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';

export default function Control() {
    const [motorSettings, setMotorSettings] = React.useState(
        Array(5).fill({ isOn: false, strength: 1 })
    );

    const [powerSettings, setPowerSettings] = React.useState(
        Array(2).fill({ isOn1: false, isOn2: false })
    );

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
                        <View style={styles.chipContainer}>
                            <Text style={[styles.onOffText, power.isOn1 && styles.inactiveText]}>끄기</Text>
                            <Switch
                                value={power.isOn1}
                                onValueChange={() => togglePower1(index)}
                                style={styles.switchStyle}
                            />
                            <Text style={[styles.onOffText, !power.isOn1 && styles.inactiveText]}>켜기</Text>
                        </View>
                        <View style={styles.chipContainer}><Text style={styles.onOffText}>보조 전원</Text>
                            <Switch
                                value={power.isOn2}
                                onValueChange={() => togglePower2(index)}
                                style={{ marginLeft: 20 }}
                            />
                        </View>

                    </View>
                </View>
            ))}

            <Text style={styles.sectionTitle}>모터 제어</Text>
            {motorSettings.map((motor, index) => (
                <View key={index} style={styles.motorContainer}>
                    <Text style={styles.motorTitle}>모터 {index + 1}</Text>
                    <View style={styles.controls}>
                        <View style={styles.controlRow}>
                            <View style={styles.chipContainer}>
                                <Text style={[styles.onOffText, motor.isOn && styles.inactiveText]}>끄기</Text>
                                <Switch
                                    value={motor.isOn}
                                    onValueChange={() => toggleMotor(index)}
                                    style={styles.switchStyle}
                                />
                                <Text style={[styles.onOffText, !motor.isOn && styles.inactiveText]}>켜기</Text>
                            </View>
                            <View style={styles.chipContainer}>
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
    chipContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd', // 테두리 색상 설정
    },
    onOffText: {
        fontSize: 16,
    },
    inactiveText: {
        color: '#777',
    },
    activeText: {
        color: '#000',
    },
    switchStyle: {
        marginHorizontal: 8,
    },
    slider: {
        width: 100,
        height: 40,
        // marginHorizontal: 10,
    },
    strengthText: {
        fontSize: 16,
    },
});
