import * as React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// 각 페이지 컴포넌트 불러오기
import Monitor from './screens/Monitor';
import Settings from './screens/Settings';
import Control from './screens/Control';

// BluetoothContext 불러오기
import { BluetoothProvider } from './contexts/BluetoothContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <BluetoothProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="모니터링"
          screenOptions={{
            tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' }, // 내비게이션 바 텍스트 크기와 볼드체 적용
            tabBarActiveBackgroundColor: '#e0e0e0', // 선택된 탭의 배경색
            tabBarInactiveBackgroundColor: '#ffffff', // 비활성 탭의 배경색
          }}
        >
          <Tab.Screen
            name="모니터링"
            component={Monitor}
            options={{
              tabBarLabel: '모니터링',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 18, color: color }}>📊</Text>
              ), // 그래프 이모지 아이콘
            }}
          />
          <Tab.Screen
            name="제어"
            component={Control}
            options={{
              tabBarLabel: '제어',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 18, color: color }}>🔧</Text>
              ), // 도구 이모지 아이콘
            }}
          />
          <Tab.Screen
            name="설정"
            component={Settings}
            options={{
              tabBarLabel: '설정',
              tabBarIcon: ({ color }) => (
                <Text style={{ fontSize: 18, color: color }}>⚙️</Text>
              ), // 톱니바퀴 이모지 아이콘
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </BluetoothProvider>
  );
}
