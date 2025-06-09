import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;

export default function HomeScreen() {
  const [todayProgress, setTodayProgress] = useState({ current: 0, total: 20 });
  const [levelProgress, setLevelProgress] = useState({
    N5: { learned: 45, total: 800 },
    N4: { learned: 23, total: 600 },
    N3: { learned: 12, total: 500 },
    N2: { learned: 5, total: 400 },
    N1: { learned: 0, total: 300 },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 헤더 */}
        <ThemedView style={styles.header}>
          <ThemedText type="subtitle">JLPT 단어 학습</ThemedText>
        </ThemedView>
        {/* 레벨별 진도 */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>📊 레벨별 진도</ThemedText>
          {JLPT_LEVELS.map((level) => (
            <TouchableOpacity
              key={level}
              style={styles.levelCard}
            >
              <ThemedView style={styles.levelHeader}>
                <ThemedView style={styles.levelInfo}>
                  <ThemedText style={styles.levelText}>{level}</ThemedText>
                  <ThemedText style={styles.levelSubtext}>JLPT {level} 단어</ThemedText>
                </ThemedView>
                <ThemedText style={styles.levelProgress}>
                  {levelProgress[level]?.learned || 0}/{levelProgress[level]?.total || 0}
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.progressBar}>
                <ThemedView
                  style={[
                    styles.progressFill,
                    {
                      width: `${((levelProgress[level]?.learned || 0) /
                        (levelProgress[level]?.total || 1)) * 100
                        }%`
                    }
                  ]}
                />
              </ThemedView>
            </TouchableOpacity>
          ))}
        </ThemedView>
        {/* 오늘의 학습 */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">오늘의 학습</ThemedText>
          <ThemedView style={styles.todayInfo}>
            <ThemedText style={styles.todayLabel}>학습 진도</ThemedText>
            <ThemedText style={styles.todayProgress}>
              {todayProgress.current}/{todayProgress.total}
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.progressBar}>
            <ThemedView
              style={[
                styles.progressFill,
                { width: `${(todayProgress.current / todayProgress.total) * 100}%` }
              ]}
            />
          </ThemedView>
          <TouchableOpacity
            style={styles.startButton}
          >
            <ThemedText style={styles.startButtonText}>학습 시작하기</ThemedText>
          </TouchableOpacity>
        </ThemedView>
        {/* 퀵 액션 */}
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>⚡ 빠른 학습</ThemedText>
          <ThemedView style={styles.quickActions}>
            <TouchableOpacity
              style={styles.quickAction}
            >
              <ThemedText style={styles.quickActionText}>즐겨찾기 복습</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
            >
              <ThemedText style={styles.quickActionText}>단어 테스트</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickAction}
            >
              <ThemedText style={styles.quickActionText}>학습 통계</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    padding: 8,
  },
  section: {
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  todayCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  todayInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  todayLabel: {
    fontSize: 16,
    color: '#666',
  },
  todayProgress: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    // marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 4,
  },
  startButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    padding: 6,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  levelCard: {
    backgroundColor: '#fff',
    padding: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  levelInfo: {
    flex: 1,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  levelSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  levelProgress: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickAction: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  quickActionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});
