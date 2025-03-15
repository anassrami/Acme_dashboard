import React from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Dimensions, SafeAreaView } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { useRouter } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// Replace IconSymbol import with Lucide icons
import { Home, Heart, Stethoscope, FileText, User, LogOut } from 'lucide-react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAppDispatch, useAppSelector } from '@/store';
import { logout } from '@/store/slices/authSlice';

// Custom drawer content with logout button at the bottom
function CustomDrawerContent(props: any) {
  const colorScheme = useColorScheme();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isDarkMode = colorScheme === 'dark';
  const { user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (

    <ThemedView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={styles.drawerScrollContent}
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.drawerHeader}>
            <View style={styles.userProfileSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('@/assets/images/user.png')}
                  style={styles.avatar}
                  resizeMode="contain"
                />
              </View>
              <ThemedText type="subtitle" style={styles.username}>{user?.username || 'demo'}</ThemedText>
              <ThemedText style={styles.userRole}>Member</ThemedText>
            </View>
          </View>

          <View style={styles.drawerItemsContainer}>
            <DrawerItemList {...props} />
          </View>



        </DrawerContentScrollView>

        {/* Logout button at the bottom */}
        <TouchableOpacity
          style={[styles.logoutButton, isDarkMode ? styles.logoutButtonDark : styles.logoutButtonLight]}
          onPress={handleLogout}
        >
          <LogOut size={20} color={isDarkMode ? '#F7F9FC' : '#2E3A59'} />
          <ThemedText style={styles.logoutText}>Logout</ThemedText>
        </TouchableOpacity>
      </SafeAreaView>
    </ThemedView>
  );
}

export default function DrawerLayout() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (

    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? '#1A1A2E' : '#4285F4',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: isDarkMode ? '#F7F9FC' : '#FFF',
        drawerActiveBackgroundColor: isDarkMode ? 'rgba(37, 42, 55, 0.8)' : '#E4E9F2',
        drawerActiveTintColor: isDarkMode ? '#F7F9FC' : '#2E3A59',
        drawerInactiveTintColor: isDarkMode ? '#8F9BB3' : '#8F9BB3',
        drawerLabelStyle: {
          marginLeft: 8, // Changed from -16 to add space between icon and text
          fontSize: 16,
          fontWeight: '500',
        },
        drawerStyle: {
          width: Dimensions.get('window').width * 0.75,
          backgroundColor: isDarkMode ? '#1A1A2E' : '#FFFFFF',
        },
        drawerItemStyle: {
          borderRadius: 8,
          paddingVertical: 4,
          marginVertical: 4,
          marginHorizontal: 8,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >

      <Drawer.Screen
        name="index"
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <Home size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="benefits"
        options={{
          title: 'Benefits',
          drawerIcon: ({ color }) => <Heart size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="find-provider"
        options={{
          title: 'Find a Provider',
          drawerIcon: ({ color }) => <Stethoscope size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="claims-bills"
        options={{
          title: 'Claims & Bills',
          drawerIcon: ({ color }) => <FileText size={22} color={color} />,
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: 'Profile',
          drawerIcon: ({ color }) => <User size={22} color={color} />,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerScrollContent: {
    paddingTop: 0,
  },
  drawerHeader: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(143, 155, 179, 0.15)',
    alignItems: 'center',
  },
  userProfileSection: {
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(143, 155, 179, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 70,
    height: 70,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    opacity: 0.7,
  },
  drawerItemsContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  settingsSection: {
    marginTop: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(143, 155, 179, 0.15)',
    paddingTop: 20,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingsText: {
    marginLeft: 16,
    fontSize: 16,
    color: '#8F9BB3',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(143, 155, 179, 0.15)',
    marginTop: 10,
  },
  logoutButtonLight: {
    backgroundColor: '#F7F9FC',
  },
  logoutButtonDark: {
    backgroundColor: '#252A37',
  },
  logoutText: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: '500',
  },
});