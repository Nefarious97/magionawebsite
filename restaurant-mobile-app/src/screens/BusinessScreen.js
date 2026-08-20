import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function BusinessScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Business Management</Text>

      {/* Profile */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>🏢 Restaurant Profile</Text>
        <Text style={styles.storeName}>Mama Cass Kitchen</Text>
        <Text style={styles.storeAddress}>24 Commercial Avenue, Yaba</Text>
        <Text style={styles.badge}>Verified Partner Store • 4.8 ★</Text>
      </View>

      {/* Business Hours */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>🕒 Business Hours</Text>
        <Text style={styles.boldTxt}>Mon - Sun (08:00 AM - 10:00 PM)</Text>
      </View>

      {/* Earnings */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>💰 Earnings & Payouts</Text>
        <Text style={styles.amount}>₦84,500.00</Text>
        <TouchableOpacity style={styles.payoutBtn}>
          <Text style={styles.btnTxt}>Withdraw Earnings to Bank 🏦</Text>
        </TouchableOpacity>
      </View>

      {/* Promotions & Reviews */}
      <View style={styles.row}>
        <View style={[styles.card, { flex: 1, marginRight: 6 }]}>
          <Text style={styles.cardHeader}>🏷️ Active Promos</Text>
          <Text style={styles.boldTxt}>10% OFF Jollof</Text>
        </View>
        <View style={[styles.card, { flex: 1, marginLeft: 6 }]}>
          <Text style={styles.cardHeader}>⭐️ Reviews</Text>
          <Text style={styles.boldTxt}>4.8 ★ (340 reviews)</Text>
        </View>
      </View>

      {/* Settings & Logout */}
      <TouchableOpacity 
        style={styles.logoutBtn}
        onPress={() => navigation.replace('Login')}
      >
        <Text style={styles.logoutTxt}>Log Out of Account 🚪</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC', padding: 14 },
  title: { fontSize: 20, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 14, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  cardHeader: { fontSize: 13, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  storeName: { fontSize: 16, fontWeight: '800', color: '#FF6B00' },
  storeAddress: { fontSize: 12, color: '#64748B', marginTop: 2 },
  badge: { fontSize: 11, color: '#10B981', fontWeight: '700', marginTop: 4 },
  boldTxt: { fontSize: 13, fontWeight: '700', color: '#0F172A' },
  amount: { fontSize: 24, fontWeight: '800', color: '#FF6B00', marginTop: 2 },
  payoutBtn: { backgroundColor: '#10B981', borderRadius: 10, padding: 10, alignItems: 'center', marginTop: 10 },
  btnTxt: { color: '#FFFFFF', fontWeight: '700', fontSize: 12 },
  row: { flexDirection: 'row' },
  logoutBtn: { backgroundColor: '#FEF2F2', borderBottomWidth: 1, borderColor: '#FEE2E2', padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 10 },
  logoutTxt: { color: '#EF4444', fontWeight: '800', fontSize: 14 }
});
