import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { CategoriesScreen, ProductsScreen, ProductScreen } from "../screens"
import Header from "../components/Header"
import { CardStyleInterpolators, TransitionSpecs } from "@react-navigation/stack"

const Stack = createNativeStackNavigator()

const stackOptions = {
    transitionSpec: {
        open: TransitionSpecs.FadeInFromBottomAndroidSpec,
        close: TransitionSpecs.FadeOutToBottomAndroidSpec,
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}

const ShopNavigator = () => {
  return (
        <Stack.Navigator
            screenOptions = {{
                ...stackOptions,
                animationEnabled: true,
                header: ({route})=><Header subtitle={route.name}/>
            }}
        >
            <Stack.Screen name="Categorías" component={CategoriesScreen} />
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Producto" component={ProductScreen} />
        </Stack.Navigator>
  )
}

export default ShopNavigator
