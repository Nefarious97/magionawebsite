import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  FlatList, 
  Switch, 
  Image, 
  Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function DashboardScreen({ route, navigation }) {
  const restaurantInfo = route.params?.restaurantInfo || {
    restaurantName: 'Mama Cass Kitchen',
    address: '24 Commercial Avenue, Yaba'
  };

  const [isOnline, setIsOnline] = useState(true);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const data = await AsyncStorage.getItem('mangiona_shared_menu');
      if (data) {
        setMenuItems(JSON.parse(data));
      } else {
        const initial = [
          { id: 'item1', name: 'Special Jollof Rice Combo', price: 4500, category: 'Main Dish', available: true },
          { id: 'item2', name: 'Pounded Yam & Egusi Soup', price: 5200, category: 'Soups', available: true }
        ];
        await AsyncStorage.setItem('mangiona_shared_menu', JSON.stringify(initial));
        setMenuItems(initial);
      }
    } catch (e) {
      console.log('Storage Error:', e);
    }
  };

  const toggleStock = async (id) => {
    const updated = menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    );
    setMenuItems(updated);
    await AsyncStorage.setItem('mangiona_shared_menu', JSON.stringify(updated));
  };

  const deleteItem = async (id) => {
    const filtered = menuItems.filter(i => i.id !== id);
    setMenuItems(filtered);
    await AsyncStorage.setItem('mangiona_shared_menu', JSON.stringify(filtered));
  };

  return (
    <View style={styles.container}>
      {/* Header Info */}
      <View style={styles.headerCard}>
        <View style={styles.rowBetween}>
          <View>
            <Text style={styles.storeName}>{restaurantInfo.restaurantName}</Text>
            <Text style={styles.storeLoc}>{restaurantInfo.address}</Text>
          </View>
          <View style={styles.statusBox}>
            <Text style={styles.statusText}>{isOnline ? '🟢 Online' : '🔴 Offline'}</Text>
            <Switch value={isOnline} onValueChange={setIsOnline} trackColor={{ false: '#CBD5E1', true: '#10B981' }} />
          </View>
        </View>
      </View>

      {/* Stats Summary */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Revenue Today</Text>
          <Text style={styles.statValue}>₦84,500</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Orders</Text>
          <Text style={styles.statValue}>18</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Prep Pending</Text>
          <Text style={styles.statValue}>3</Text>
        </View>
      </View>

      {/* Menu Manager Header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Menu Items ({menuItems.length})</Text>
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('UploadMeal')}>
          <Text style={styles.addBtnText}>+ Upload Meal</Text>
        </TouchableOpacity>
      </View>

      {/* Food List */}
      <FlatList
        data={menuItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.foodRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodCategory}>{item.category} • ₦{Number(item.price).toLocaleString()}</Text>
            </View>
            <View style={styles.actionRow}>
              <Switch value={item.available} onValueChange={() => toggleStock(item.id)} />
              <TouchableOpacity style={styles.delBtn} onPress={() => deleteItem(item.id)}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>✕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 16 },
  headerCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  storeName: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  storeLoc: { fontSize: 12, color: '#64748B', marginTop: 2 },
  statusBox: { alignItems: 'flex-end' },
  statusText: { fontSize: 12, fontWeight: '700', marginBottom: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  statBox: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 14, padding: 12, marginHorizontal: 4, borderWidth: 1, borderColor: '#E2E8F0' },
  statLabel: { fontSize: 11, color: '#64748B' },
  statValue: { fontSize: 16, fontWeight: '800', color: '#FF6B00', marginTop: 2 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  addBtn: { backgroundColor: '#FF6B00', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 8 },
  addBtnText: { color: '#FFFFFF', fontSize: 13, fontWeight: '700' },
  foodRow: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  foodName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  foodCategory: { fontSize: 12, color: '#FF6B00', marginTop: 2 },
  actionRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  delBtn: { backgroundColor: '#EF4444', borderRadius: 12, width: 28, height: 28, alignItems: 'center', justifyContent: 'center' }
});
