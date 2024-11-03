import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function Monitor() {
    const [solarData, setSolarData] = useState([]);
    const [labels, setLabels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://192.168.240.1:3000/api/solar-data');
                const data = await response.json();

                const sampledData = [];
                const sampledLabels = [];
                data.forEach((item, index) => {
                    if (index % 365 === 0) {
                        sampledData.push(parseFloat(item.E_DATA3));
                        sampledLabels.push(item.REG_DATE.split('T')[0]);
                    }
                });

                setSolarData(sampledData);
                setLabels(sampledLabels);
            } catch (error) {
                console.error('Error fetching solar data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>내부 센서</Text>
            {/* 단위 포함된 그래프 제목 */}
            <View style={styles.graphBox}>
                <Text style={styles.graphText}>1년 간격 태양광 데이터 그래프 (W/m²)</Text>
                <LineChart
                    data={{
                        labels: labels,
                        datasets: [
                            {
                                data: solarData
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width * 0.88} // 그래프 너비 조정
                    height={220}
                    chartConfig={{
                        backgroundColor: "#ffffff",
                        backgroundGradientFrom: "#ffffff",
                        backgroundGradientTo: "#ffffff",
                        decimalPlaces: 1,
                        color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        textSize: 10, // Y축 글씨 크기 조정
                        paddingLeft: 60, // Y축 레이블이 잘리지 않도록 여백을 넓게 조정
                        style: {
                            borderRadius: 16,
                        },
                        propsForDots: {
                            r: "5",
                            strokeWidth: "2",
                            stroke: "#007bff"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16,
                    }}
                />
            </View>
            <View style={styles.sensorGrid}>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>온도</Text>
                        <Text style={styles.sensorData}>25°C</Text>
                    </View>
                    <Text style={styles.emoji}>🌡️</Text>
                </View>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>습도</Text>
                        <Text style={styles.sensorData}>60%</Text>
                    </View>
                    <Text style={styles.emoji}>💧</Text>
                </View>
            </View>
            <Text style={styles.sectionTitle}>외부 센서</Text>
            <View style={styles.sensorGrid}>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>태양광</Text>
                        <Text style={styles.sensorData}>{solarData[solarData.length - 1]} W/m²</Text>
                    </View>
                    <Text style={styles.emoji}>☀️</Text>
                </View>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>온도</Text>
                        <Text style={styles.sensorData}>25°C</Text>
                    </View>
                    <Text style={styles.emoji}>🌡️</Text>
                </View>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>습도</Text>
                        <Text style={styles.sensorData}>60%</Text>
                    </View>
                    <Text style={styles.emoji}>💧</Text>
                </View>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>바람</Text>
                        <Text style={styles.sensorData}>1 m/s</Text>
                    </View>
                    <Text style={styles.emoji}>🌬️</Text>
                </View>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>날씨</Text>
                        <Text style={styles.sensorData}>맑음</Text>
                    </View>
                    <Text style={styles.emoji}>☁️</Text>
                </View>
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>강수량</Text>
                        <Text style={styles.sensorData}>0 mm</Text>
                    </View>
                    <Text style={styles.emoji}>🌧️</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    sensorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    graphBox: {
        width: '100%',
        height: 250,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    graphText: {
        fontSize: 18,
        color: '#666',
    },
    sensorBox: {
        width: '47.5%',
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginBottom: 20,
    },
    sensorInfo: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    emoji: {
        fontSize: 30,
        marginLeft: 10,
    },
    sensorName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sensorData: {
        fontSize: 14,
        color: '#666',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
