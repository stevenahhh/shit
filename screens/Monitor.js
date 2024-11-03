import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Monitor() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.sectionTitle}>내부 센서</Text>
            {/* 내부 센서 그래프 박스 */}
            <View style={styles.graphBox}>
                <Text style={styles.graphText}>내부 센서 그래프</Text>
            </View>
            <View style={styles.sensorGrid}>
                {/* 각 센서 데이터 박스 */}
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
                {/* 각 센서 데이터 박스 */}
                <View style={styles.sensorBox}>
                    <View style={styles.sensorInfo}>
                        <Text style={styles.sensorName}>태양광</Text>
                        <Text style={styles.sensorData}>300 W/m²</Text>
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
        width: '100%', // 화면 전체 너비를 차지하도록 설정
        height: 200,   // 그래프 박스 높이
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
        alignItems: 'flex-start', // 왼쪽 정렬로 설정
    },
    emoji: {
        fontSize: 30,
        marginLeft: 10, // 텍스트와 이모지 사이 간격 조정
    },
    sensorName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    sensorData: {
        fontSize: 14,
        color: '#666',
    },
});
