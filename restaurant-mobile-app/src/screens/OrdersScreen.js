import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';

export default function OrdersScreen() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [orders, setOrders] = useState([
    { id: '#1042', customer: 'Chidi O.', items: '2x Special Jollof Rice Combo, 1x Malt', total: 9800, status: 'new' },
    { id: '#1043', customer: 'Amina K.', items: '1x Pounded Yam & Egusi Soup', total: 5200, status: 'accepted' },
    { id: '#1044', customer: 'Bayo A.', items: '3x Peppered Suya Platter', total: 11400, status: 'prep' },
    { id: '#1045', customer: 'Grace E.', items: '2x Gourmet Beef Burger Combo', total: 8000, status: 'ready' },
    { id: '#1040', customer: 'Emeka U.', items: '1x Jollof Rice Special', total: 4500, status: 'completed' },
    { id: '#1039', customer: 'David O.', items: '1x Malt Drink', total: 800, status: 'cancelled' }
  ]);

  const updateStatus = (id, nextStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: nextStatus } : o));
  };

  const filters = [
    { key: 'all', label: 'All' },
    { key: 'new', label: 'New' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'prep', label: 'Preparing' },
    { key: 'ready', label: 'Ready' },
    { key: 'completed', label: 'Completed' },
    { key: 'cancelled', label: 'Cancelled' }
  ];

  const filteredOrders = activeFilter === 'all' ? orders : orders.filter(o => o.status === activeFilter);

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
        {filters.map(f => (
          <TouchableOpacity 
            key={f.key} 
            style={[styles.chip, activeFilter === f.key && styles.activeChip]}
            onPress={() => setActiveFilter(f.key)}
          >
            <Text style={[styles.chipText, activeFilter === f.key && styles.activeChipText]}>{f.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.rowBetween}>
              <Text style={styles.orderId}>{item.id} • {item.customer}</Text>
              <Text style={styles.statusTag}>{item.status.toUpperCase()}</Text>
            </View>
            <Text style={styles.items}>{item.items}</Text>
            <View style={styles.footer}>
              <Text style={styles.total}>₦{item.total.toLocaleString()}</Text>
              {item.status === 'new' && (
                <TouchableOpacity style={styles.btn} onPress={() => updateStatus(item.id, 'accepted')}>
                  <Text style={styles.btnTxt}>Accept Order 👨‍🍳</Text>
                </TouchableOpacity>
              )}
              {item.status === 'accepted' && (
                <TouchableOpacity style={styles.btn} onPress={() => updateStatus(item.id, 'prep')}>
                  <Text style={styles.btnTxt}>Start Prep 🍳</Text>
                </TouchableOpacity>
              )}
              {item.status === 'prep' && (
                <TouchableOpacity style={styles.btn} onPress={() => updateStatus(item.id, 'ready')}>
                  <Text style={styles.btnTxt}>Mark Ready 🛵</Text>
                </TouchableOpacity>
              )}
              {item.status === 'ready' && (
                <TouchableOpacity style={[styles.btn, { backgroundColor: '#10B981' }]} onPress={() => updateStatus(item.id, 'completed')}>
                  <Text style={styles.btnTxt}>Complete Order ✅</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 14 },
  chipsRow: { marginBottom: 12 },
  chip: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, marginRight: 6 },
  activeChip: { backgroundColor: '#FF6B00', borderColor: '#FF6B00' },
  chipText: { fontSize: 12, fontWeight: '700', color: '#64748B' },
  activeChipText: { color: '#FFFFFF' },
  orderCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  orderId: { fontSize: 14, fontWeight: '800', color: '#0F172A' },
  statusTag: { fontSize: 10, fontWeight: '700', color: '#FF6B00' },
  items: { fontSize: 12, color: '#64748B', marginBottom: 10 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#F1F5F9', paddingTop: 8 },
  total: { fontSize: 15, fontWeight: '800', color: '#FF6B00' },
  btn: { backgroundColor: '#FF6B00', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  btnTxt: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' }
});
