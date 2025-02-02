import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions, ActivityIndicator, ScrollView } from 'react-native'
//import categories from "../data/categories.json"
import FlatCard from '../components/FlatCard'
import { useEffect, useState } from 'react'
import { colors } from '../global/colors'
import { useSelector, useDispatch } from 'react-redux'
import { setCategory } from '../features/shop/shopSlice'
import { useGetCategoriesQuery } from '../services/shopService'
import { autoBatchEnhancer } from '@reduxjs/toolkit'
import MontserratText from '../components/MontserratText'

const CategoriesScreen = ({ navigation }) => {
    const { width, height } = useWindowDimensions()
    const [isPortrait, setIsPortrait] = useState(true)

    const { data: categories, error, isLoading } = useGetCategoriesQuery()

    const cardWidth = (width/3);

    const dispatch = useDispatch()

    useEffect(() => {
        if (width > height) {
            setIsPortrait(false)
        } else {
            setIsPortrait(true)
        }
    },[width, height])

    const renderCategoryItem = ({ item, index }) => {
        return (
            <Pressable 
                onPress={() => {
                    dispatch(setCategory(item.category))
                    navigation.navigate('Productos')
                }}
            >
                <View style={{...styles.categoryItemContainer, width: cardWidth}} >
                    <View style={styles.imageContainer} >
                        <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                        />
                    </View>
                    <MontserratText style={styles.categoryTitle}>{item.category}</MontserratText>
                </View>
            </Pressable>            
        )
    }

    return (
        <View style={styles.container}>
            {
                isLoading
                ?
                <ActivityIndicator size="large" color={colors.primary} />
                :
                error
                ?
                <Text>Error al cargar las categorías</Text>
                :
                <FlatList
                data={categories}
                keyExtractor={item => item.id}
                renderItem={renderCategoryItem}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
            />
            }
        </View>
    )
}

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        height: "100%",
        paddingBottom: 200,
    },
    categoryItemContainer: {
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        height: 150,
    },
    categoryTitle: {
        textTransform: 'capitalize',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: 'center',
        color: colors.black,
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 5, 
        overflow: 'hidden',
        marginBottom: 5,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: 'cover',
    },
    flatListContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
    }
})
