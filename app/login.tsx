import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, SafeAreaView } from 'react-native';
import { useRouter, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { loginStart, loginSuccess, loginFailure } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const colorScheme = useColorScheme();
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { isAuthenticated, loading, error } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(drawer)');
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    dispatch(loginStart());
    
    // Simulate API call with timeout
    setTimeout(() => {
      if (username === 'demo' && password.toLowerCase() === 'demo') {
        dispatch(loginSuccess({ username }));
      } else {
        dispatch(loginFailure('Invalid username or password'));
        Alert.alert('Login Failed', 'Invalid username or password. Please try again.');
      }
    }, 1000);
  };

  const isDarkMode = colorScheme === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <LinearGradient
          colors={isDarkMode ? ['#1A1A2E', '#16213E'] : ['#F5F7FA', '#C3CFE2']}
          style={styles.gradient}
        >
        <View style={styles.logoContainer}>
          <Image 
            source={require('@/assets/images/icon.png')} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <ThemedText type="title" style={styles.appName}>ACME AI</ThemedText>
        </View>

        <View style={[styles.formContainer, isDarkMode ? styles.formContainerDark : styles.formContainerLight]}>
          <ThemedText type="subtitle" style={styles.welcomeText}>Welcome Back</ThemedText>
          <ThemedText style={styles.loginText}>Login to your account</ThemedText>

          <View style={styles.inputContainer}>
            <View style={[styles.inputWrapper, isDarkMode ? styles.inputWrapperDark : styles.inputWrapperLight]}>
              <TextInput
                style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
                placeholder="Username"
                placeholderTextColor={isDarkMode ? '#8F9BB3' : '#A9A9A9'}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputWrapper, isDarkMode ? styles.inputWrapperDark : styles.inputWrapperLight]}>
              <TextInput
                style={[styles.input, isDarkMode ? styles.inputDark : styles.inputLight]}
                placeholder="Password"
                placeholderTextColor={isDarkMode ? '#8F9BB3' : '#A9A9A9'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity 
                style={styles.eyeIcon} 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <ThemedText>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading || !username || !password}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <ThemedText style={styles.loginButtonText}>LOGIN</ThemedText>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>Demo credentials:</ThemedText>
            <ThemedText style={styles.credentials}>Username: demo / Password: demo</ThemedText>
          </View>
        </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  formContainerLight: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    shadowColor: '#000',
  },
  formContainerDark: {
    backgroundColor: 'rgba(30, 30, 47, 0.9)',
    shadowColor: '#000',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  loginText: {
    marginBottom: 30,
    opacity: 0.7,
  },
  inputContainer: {
    width: '100%',
    gap: 15,
    marginBottom: 25,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    height: 55,
    paddingHorizontal: 15,
  },
  inputWrapperLight: {
    backgroundColor: '#F7F9FC',
    borderWidth: 1,
    borderColor: '#E4E9F2',
  },
  inputWrapperDark: {
    backgroundColor: '#252A37',
    borderWidth: 1,
    borderColor: '#2E3A59',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
  },
  inputLight: {
    color: '#2E3A59',
  },
  inputDark: {
    color: '#F7F9FC',
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    width: '100%',
    height: 55,
    borderRadius: 12,
    backgroundColor: '#3366FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonDisabled: {
    backgroundColor: '#8F9BB3',
    opacity: 0.7,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    opacity: 0.7,
  },
  credentials: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
  },
});