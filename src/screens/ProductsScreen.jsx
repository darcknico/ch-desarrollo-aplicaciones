import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, Image, Pressable, ActivityIndicator, useWindowDimensions } from 'react-native';
import { colors } from '../global/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Search from '../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsByCategoryQuery } from '../services/shopService';
import { setProductId } from '../features/shop/shopSlice';
import Toast from 'react-native-toast-message';

const ProductsScreen = ({ navigation, route }) => {
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [search, setSearch] = useState("");

    const { width, height } = useWindowDimensions()
    const cardWidth = (width/2)-45;
    
    const category = useSelector(state => state.shopReducer.value.categorySelected);
    const { data: productsFilteredByCategory, error, isLoading } = useGetProductsByCategoryQuery(category);

    const dispatch = useDispatch();

    useEffect(() => {
        setProductsFiltered(productsFilteredByCategory);
        if (search) {
            setProductsFiltered(productsFilteredByCategory.filter(product => product.title.toLowerCase().includes(search.toLowerCase())));
        }
    }, [search, productsFilteredByCategory]);

    const renderProductItem = ({ item }) => {
        const discounted = Number(item.price * (1 - item.discountPercentage / 100)).toFixed(2)
        return (
            <Pressable onPress={() => {
                navigation.navigate("Producto", {
                    item
                });
            }}>
                <View style={{...styles.productContainer, width: cardWidth}}>
                    {
                        item.discountPercentage > 0 && (
                            <View style={styles.discountBadge}>
                                <Text style={styles.discountText}>-{item.discountPercentage}%</Text>
                            </View>
                        )
                    }
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={styles.productImage}
                        resizeMode="contain"
                    />
                    <Text style={styles.productTitle}>{item.title}</Text>
                    {
                        item.discountPercentage > 0 ? (
                            <>
                                <Text style={styles.price}>${item.price}</Text>
                                <Text style={styles.priceDto}>$ {discounted}</Text>
                            </>
                            ): 
                            <Text style={styles.priceDto}>$ {discounted}</Text>
                    }
                    
                    
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color={colors.backgroundDark} />
            ) : error ? (
                <Text style={styles.errorText}>Error al cargar los productos</Text>
            ) : (
                <>
                    <Pressable onPress={() => navigation.goBack()}>
                        <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
                    </Pressable>
                    <Search setSearch={setSearch} />
                    <FlatList
                        data={productsFiltered}
                        keyExtractor={item => item.id}
                        renderItem={renderProductItem}
                        numColumns={2}
                        contentContainerStyle={styles.flatListContainer}
                    />
                </>
            )}
            <Toast />
        </View>
    );
};

export default ProductsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.background,
        flex: 1,
        padding: 10,
        paddingBottom:80
    },
    errorText: {
      color: colors.black,
      fontSize: 16,
      fontWeight: 'bold',  
    },
    productContainer: {
        backgroundColor: colors.backgroundLight,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
        position: 'relative',
    },
    productImage: {
        width: 100,
        height: 100,
        marginBottom: 5,
    },
    productTitle: {
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.black,
    },
    price: {
        fontSize: 11,
        color: colors.orange,
        textDecorationLine: 'line-through',
    },
    priceDto: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.black,
    },
    discountBadge: {
        position: 'absolute',
        top: 3,
        left: 3,
        backgroundColor: colors.orange,
        padding: 2,
        borderRadius: 5,
    },
    discountText: {
        color: colors.black,
        fontWeight: 'bold',
    },
    flatListContainer: {
        paddingHorizontal: 10,
    },
    goBack: {
        padding: 10,
        color: colors.grey,
    },
});