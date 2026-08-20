import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UploadMealScreen({ navigation }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Main Dish');
  const [prepTime, setPrepTime] = useState('15-20 Mins');
  const [desc, setDesc] = useState('');

  const handleUpload = async () => {
    if (!name || !price) {
      Alert.alert('Missing Info', 'Please provide dish name and price.');
      return;
    }

    const newItem = {
      id: 'item_' + Date.now(),
      name,
      price: Number(price),
      category,
      prepTime,
      desc,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
      available: true
    };

    try {
      const existing = await AsyncStorage.getItem('mangiona_shared_menu');
      let menu = existing ? JSON.parse(existing) : [];
      menu.unshift(newItem);
      await AsyncStorage.setItem('mangiona_shared_menu', JSON.stringify(menu));

      Alert.alert('Success 🎉', `"${name}" published live to Customer App!`);
      navigation.goBack();
    } catch (e) {
      console.log('Error saving meal:', e);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <Text style={styles.headerTitle}>Upload New Meal</Text>
      <Text style={styles.subTitle}>This dish will appear live on the Customer App menu.</Text>

      <Text style={styles.label}>Dish / Meal Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. Special Peppered Snapper Fish" 
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Price (₦)</label>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. 4500" 
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Category</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g. Main Dish, Soups, Drinks" 
        value={category}
        onChangeText={setCategory}
      />

      <Text style={styles.label}>Prep Time</Text>
      <TextInput 
        style={styles.input} 
        placeholder="15-20 Mins" 
        value={prepTime}
        onChangeText={setPrepTime}
      />

      <Text style={styles.label}>Short Description</Text>
      <TextInput 
        style={[styles.input, { height: 80 }]} 
        placeholder="Describe ingredients and portion..." 
        multiline
        value={desc}
        onChangeText={setDesc}
      />

      <TouchableOpacity style={styles.submitBtn} onPress={handleUpload}>
        <Text style={styles.btnText}>Publish Meal to Customer App 🚀</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollContent: { padding: 20 },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#0F172A' },
  subTitle: { fontSize: 13, color: '#64748B', marginBottom: 20 },
  label: { fontSize: 12, fontWeight: '700', color: '#0F172A', marginBottom: 6, marginTop: 12 },
  input: { backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 12, paddingHorizontal: 14, height: 46, fontSize: 14, color: '#0F172A' },
  submitBtn: { backgroundColor: '#FF6B00', borderRadius: 14, height: 50, alignItems: 'center', justifyContent: 'center', marginTop: 28 },
  btnText: { color: '#FFFFFF', fontSize: 15, fontWeight: '800' }
});
