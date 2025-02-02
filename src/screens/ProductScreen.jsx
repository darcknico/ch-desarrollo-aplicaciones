import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
import { useGetProductQuery } from "../services/shopService";
import Toast from "react-native-toast-message";
const ProductScreen = ({ route, navigation }) => {
  const { item:productFound } = route.params;
  const { width, height } = useWindowDimensions();

  const dispatch = useDispatch();

  const discounted = Number(productFound.price * (1 - productFound.discountPercentage / 100)).toFixed(2)

  return (
    <ScrollView style={styles.productContainer} contentContainerStyle={{ paddingBottom: 60 }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Icon style={styles.goBack} name="arrow-back-ios" size={24} />
      </Pressable>
      <Text style={styles.textTitle}>{productFound.title}</Text>
      <Text style={styles.textBrand}>{productFound.brand}</Text>
      <Image
        source={{ uri: productFound.thumbnail }}
        alt={productFound.title}
        width="100%"
        height={width * 0.7}
        resizeMode="contain"
      />
      <Text style={styles.longDescription}>
        {productFound.longDescription}
      </Text>
      {productFound.discountPercentage > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>-{productFound.discountPercentage}%</Text>
        </View>
      )}
      {productFound.stock <= 0 && (
        <Text style={styles.noStockText}>Sin Stock</Text>
      )}
      {productFound.discountPercentage > 0 ? (
        <>
          <Text style={styles.price}>${productFound.price}</Text>
          <Text style={styles.priceDto}>
            {" "}
            Precio: ${" "}
            {discounted}
          </Text>
        </>
      ) : (
        <Text style={styles.priceDto}>
          {" "}
          Precio: $ {discounted}
        </Text>
      )}

      <Pressable
        style={({ pressed }) => [
          { opacity: pressed ? 0.95 : 1 },
          styles.addToCartButton,
        ]}
        onPress={() => {
          dispatch(addItem({ ...productFound, quantity: 1 }));
      
          Toast.show({
            type: 'success',
            text1: 'Producto a\u00f1adido al carrito',
            text2: `${productFound.title} ha sido agregado con éxito.`,
            visibilityTime: 2000,
          });
      
          navigation.goBack();
        }}
      >
        <Text style={styles.textAddToCart}>Añadir</Text>
        <Icon name="shopping-cart" size={24} color={colors.white} />
      </Pressable>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  goBack: {
    padding: 8,
    color: colors.grey,
  },
  productContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    height: "100%",
  },
  textBrand: {
    fontSize: 15,
    color: colors.black,
    marginBottom: 5,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.black,
    marginBottom: 10,
  },
  productImage: {
    width: "100%",
    marginBottom: 15,
  },
  longDescription: {
    fontSize: 14,
    color: colors.black,
    textAlign: "justify",
    paddingVertical: 8,
  },
  discountBadge: {
    position: "absolute",
    top: 80,
    right: 10,
    backgroundColor: colors.orange,
    padding: 10,
    borderRadius: 30,
  },
  discountText: {
    color: colors.black,
    fontWeight: "bold",
  },
  noStockText: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  price: {
    fontSize: 16,
    color: colors.orange,
    textDecorationLine: "line-through",
  },
  priceDto: {
    fontSize: 24,
    fontWeight: "600",
    color: colors.black,
  },
  addToCartButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    backgroundColor: colors.backgroundDark,
    borderRadius: 16,
    marginVertical: 16,
  },
  textAddToCart: {
    color: colors.white,
    fontSize: 18,
    textAlign: "center",
    marginRight: 10,
  },
});

const smallStyles = StyleSheet.create({});