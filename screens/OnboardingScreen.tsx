import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '../components/Button';
import { ProgressDots } from '../components/ProgressDots';
import { useApp } from '../context/AppContext';
import { gradients, palette } from '../theme/colors';

const { width } = Dimensions.get('window');

const slides = [
  {
    id: '1',
    title: 'Context-aware scanning',
    description: 'Use NLP-powered intelligence to scan anything: text, URLs, and files with unmatched accuracy.'
  },
  {
    id: '2',
    title: 'Visualize threats in real time',
    description: 'Interactive dashboards surface high-risk findings and trending attack vectors instantly.'
  },
  {
    id: '3',
    title: 'Collaborate securely',
    description: 'Share insights across teams with enterprise encryption and role-based access controls.'
  }
];

export const OnboardingScreen: React.FC = () => {
  const { completeOnboarding } = useApp();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false
  });

  const onMomentumEnd = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  const goNext = () => {
    if (index < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } else {
      completeOnboarding();
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={item => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        onMomentumScrollEnd={onMomentumEnd}
        renderItem={({ item, index: itemIndex }) => (
          <LinearGradient
            colors={itemIndex % 2 === 0 ? gradients.primary : [palette.navy, palette.midnight]}
            style={styles.slide}
          >
            <View style={styles.slideContent}>
              <Text style={styles.slideTitle}>{item.title}</Text>
              <Text style={styles.slideDescription}>{item.description}</Text>
            </View>
          </LinearGradient>
        )}
      />

      <View style={styles.footer}>
        <ProgressDots count={slides.length} progress={Animated.divide(scrollX, width)} />

        <Button
          label={index === slides.length - 1 ? 'Finish' : 'Next'}
          onPress={goNext}
          style={styles.button}
        />

        <Button
          label="Skip onboarding"
          onPress={completeOnboarding}
          variant="ghost"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.midnight
  },
  slide: {
    width,
    justifyContent: 'flex-end'
  },
  slideContent: {
    paddingHorizontal: 28,
    paddingBottom: 160
  },
  slideTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16
  },
  slideDescription: {
    fontSize: 17,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.75)'
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 24,
    right: 24,
    alignItems: 'center'
  },
  button: {
    marginTop: 24,
    alignSelf: 'stretch'
  }
});

export default OnboardingScreen;
