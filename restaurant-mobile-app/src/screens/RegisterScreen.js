import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';

export default function RegisterScreen({ navigation }) {
  const [restaurantName, setRestaurantName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [cuisine, setCuisine] = useState('Nigerian & African Dishes');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    if (!restaurantName || !email || !phone || !address || !password) {
      Alert.alert('Incomplete Form', 'Please fill out all fields to register your restaurant.');
      return;
    }
    // Navigate to Partner Dashboard
    navigation.replace('Dashboard', { 
      restaurantInfo: { restaurantName, email, phone, address, cuisine } 
    });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View class="headerBox" style={styles.headerBox}>
          <Text style={styles.brandTitle}>Mangiona Partner</Text>
          <Text style={styles.subTitle}>Register Your Restaurant to Start Receiving Orders</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Restaurant / Business Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Mama Cass Kitchen" 
            value={restaurantName}
            onChangeText={setRestaurantName}
          />

          <Text style={styles.label}>Business Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="mamacass@gmail.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput 
            style={styles.input} 
            placeholder="09021449487" 
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Restaurant Operating Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="24 Commercial Avenue, Yaba, Lagos" 
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Primary Cuisine Category</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. African Dishes, Fast Food, Drinks" 
            value={cuisine}
            onChangeText={setCuisine}
          />

          <Text style={styles.label}>Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="••••••••" 
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
            <Text style={styles.btnText}>Register Restaurant 🚀</Text>
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
  registerBtn: { backgroundColor: '#FF6B00', borderRadius: 14, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 24, shadowColor: '#FF6B00', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8, elevation: 4 },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '800' }
});
