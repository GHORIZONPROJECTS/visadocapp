import { StyleSheet, Text, View, FlatList, Animated } from 'react-native'
import React, {useState, useRef} from 'react'
import OnboardingItem from '../../components/onboardingItem'
import slides from '../../../resources/slides'
import Paginator from '../../components/paginator'
import NextButton from '../../components/nextButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
// import { useNavigation } from '@react-navigation/native'

const OnboardingScreen = ({navigation}) => {

  // const navigation = useNavigation();

  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index)
  }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold : 50}).current;

  const scrollTo = async() => {

    if(currentIndex < slides.length - 1) {

        slidesRef.current.scrollToIndex({ index : currentIndex + 1 });

    }else {

        try {

            await AsyncStorage.setItem('@viewedOnboading', 'true')

            // navigation.replace('WelcomeScreen')
            
        } catch (error) {

            console.log('Error @setItem :', error)
            
        }

        // navigation.navigate('WelcomeScreen')

        // console.log('last item')

    }

  }

  return (

    <View style = {styles.container}>

      <View style={{flex:3}}>

      <FlatList
        data = {slides}
        renderItem={({item}) => <OnboardingItem item={item}/> }
        horizontal
        showsHorizontalScrollIndicator = {false}
        pagingEnabled
        bounces = {false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event([{nativeEvent: { contentOffset: { x : scrollX } }}],{
            useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      </View>

      <Paginator data = {slides} scrollX={scrollX}/>

      <NextButton scrollTo = {scrollTo} percentage = { (currentIndex + 1) * (100 / slides.length) } />

    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})