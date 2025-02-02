import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { LoginScreen, SignupScreen } from "../screens/auth"
import { CardStyleInterpolators, TransitionSpecs } from "@react-navigation/stack"

const Stack = createNativeStackNavigator()

const stackOptions = {
	transitionSpec: {
		open: TransitionSpecs.FadeInFromBottomAndroidSpec,
		close: TransitionSpecs.FadeOutToBottomAndroidSpec,
	},
	cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
}

const AuthNavigator = () => {
    return(
        <Stack.Navigator 
            screenOptions={{
				...stackOptions,
                animationEnabled: true,
                headerShown:false,
            }}
			initialRouteName='Login'
        >
            <Stack.Screen name="Login" component={LoginScreen} />    
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator