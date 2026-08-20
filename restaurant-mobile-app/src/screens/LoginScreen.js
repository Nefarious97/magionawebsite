import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('mamacass@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const handleLogin = () => {
    navigation.replace('Dashboard', { 
      restaurantInfo: { restaurantName: 'Mama Cass Kitchen', address: '24 Commercial Avenue, Yaba' } 
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBox}>
          <Text style={styles.brandTitle}>Partner Log In</Text>
          <Text style={styles.subTitle}>Access your restaurant orders, sales & menu</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Business Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="mamacass@gmail.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.btnText}>Log In to Dashboard 🔐</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.toggleBtn} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.toggleText}>Don't have a partner account? Register / Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#01281b' },
  scrollContent: { padding: 24, justifyContent: 'center', minHeight: '100%' },
  headerBox: { marginBottom: 28, alignItems: 'center' },
  brandTitle: { fontSize: 30, fontWeight: '800', color: '#FF6B00', marginBottom: 6 },
  subTitle: { fontSize: 13, color: '#A7F3D0', textAlign: 'center', lineHeight: 18 },
  formContainer: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 10, elevation: 5 },
  label: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginBottom: 4, marginTop: 10 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, paddingHorizontal: 14, height: 46, fontSize: 14, color: '#0F172A' },
  loginBtn: { backgroundColor: '#FF6B00', borderRadius: 14, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 24, shadowColor: '#FF6B00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' },
  toggleBtn: { marginTop: 16, alignItems: 'center' },
  toggleText: { color: '#FF6B00', fontSize: 13, fontWeight: '700', textDecorationLine: 'underline' }
});
