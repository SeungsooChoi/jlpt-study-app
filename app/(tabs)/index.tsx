import { StyleSheet, TouchableOpacity } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'];

// 타입 정의
interface LevelProgress {
  total: number;
  learned: number;
}

interface WordMeaning {
  meaning: string;
  language: string;
}

interface WordPos {
  pos: string;
}

interface Word {
  id: string;
  word: string;
  reading?: string;
  is_common?: boolean;
  audio_url?: string;
  word_meanings?: WordMeaning[];
  word_pos?: WordPos[];
}

export default function HomeScreen() {
  const [selectedLevel, setSelectedLevel] = useState('N5');
  const [words, setWords] = useState<Word[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [levelProgress, setLevelProgress] = useState<Record<string, LevelProgress>>({});

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">JLPT 단어 학습</ThemedText>
      </ThemedView>
      <ThemedView style={styles.todaySection}>
        <ThemedText type="subtitle">오늘의 학습</ThemedText>
        <ThemedView style={styles.todayCard}>
          <ThemedText type="subtitle">
            {selectedLevel} 레벨 - {words.length > 0 ? `${currentWordIndex + 1}/${words.length}` : '0/0'}
          </ThemedText>
          <TouchableOpacity>
            <ThemedText type="subtitle">학습 시작</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.progressSection}>
        <ThemedText type="subtitle">레벨별 진도</ThemedText>
        {JLPT_LEVELS.map((level) => (
          <ThemedView key={level} style={styles.progressItem}>
            <ThemedView style={styles.progressHeader}>
              <ThemedText type="subtitle">{level}</ThemedText>
              <ThemedText type="subtitle">
              {levelProgress[level]?.learned || 0}/{levelProgress[level]?.total || 0}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        ))}
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  todaySection: {
    marginBottom: 24,
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
  },progressSection: {
    marginBottom: 24,
  },
  progressItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
