import { StyleSheet, Text, View, TextInput, Pressable, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../global/colors'
import { useState, useEffect } from 'react';
import { useSignupMutation } from '../../services/authService';
import { setUser } from '../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { validationSchema } from '../../validations/validationSchema';
import Toast from 'react-native-toast-message';
import { APP_LINEAR_GRADIENT_SCREEN } from '../../utils/const';

const textInputWidth = Dimensions.get('window').width * 0.7

const SignupScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
    const [genericValidationError, setGenericValidationError] = useState("");
    const [errorAddUser, setErrorAddUser] = useState(false);
  
    const [triggerSignup, result] = useSignupMutation();
    const dispatch = useDispatch();
  
    useEffect(() => {
      if (result.status === "rejected") {
        setErrorAddUser("Ups! No se pudo agregar el usuario");
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'No se pudo agregar el usuario. Verifica tu email y contrase\u00f1a.',
        });
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      } else if (result.status === "fulfilled") {
        dispatch(setUser(result.data));
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      }
    }, [result]);
  
    const onsubmit = () => {
      try {
        validationSchema.validateSync({ email, password, confirmPassword });
        setErrorEmail("");
        setErrorPassword("");
        setErrorConfirmPassword("");
        triggerSignup({ email, password });
      } catch (error) {
        switch (error.path) {
          case "email":
            setErrorEmail(error.message);
            break;
          case "password":
            setErrorPassword(error.message);
            break;
          case "confirmPassword":
            setErrorConfirmPassword(error.message);
            break;
          default:
            setGenericValidationError(error.message);
            break;
        }
      }
    };
  
    return (
      <LinearGradient
        colors={APP_LINEAR_GRADIENT_SCREEN}
        style={styles.gradient}
      >
        <Text style={styles.title}>{process.env.EXPO_PUBLIC_APP_TITLE}</Text>
        <Text style={styles.subTitle}>Registrate</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="#EBEBEB"
            placeholder="Email"
            style={styles.textInput}
          />
          {(errorEmail && !errorPassword) && <Text style={styles.error}>{errorEmail}</Text>}
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="#EBEBEB"
            placeholder='Contraseña'
            style={styles.textInput}
            secureTextEntry
          />
          {errorPassword && <Text style={styles.error}>{errorPassword}</Text>}
          <TextInput
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholderTextColor="#EBEBEB"
            placeholder='Repetir contraseña'
            style={styles.textInput}
            secureTextEntry
          />
          {errorConfirmPassword && <Text style={styles.error}>{errorConfirmPassword}</Text>}
        </View>
  
        <Pressable style={styles.btn} onPress={onsubmit}><Text style={styles.btnText}>Crear cuenta</Text></Pressable>
  
        <View style={styles.footTextContainer}>
          <Text style={styles.whiteText}>¿Ya tienes una cuenta?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={{ ...styles.whiteText, ...styles.underLineText }}>
              Iniciar sesión
            </Text>
          </Pressable>
        </View>
  
        {errorAddUser && <Text style={styles.error}>{errorAddUser}</Text>}
        <View style={styles.guestOptionContainer}>
          <Text style={styles.whiteText}>¿Solo quieres dar un vistazo?</Text>
          <Pressable onPress={() => dispatch(setUser({ email: "demo@chmarket.com", token: "demo" }))}>
            <Text style={{ ...styles.whiteText, ...styles.strongText }}>Ingresa como invitado</Text>
          </Pressable>
        </View>
        <Toast/>
      </LinearGradient>
    );
  };

export default SignupScreen

const styles = StyleSheet.create({
    gradient: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },
    title: {
        color: colors.white,
        fontFamily: "BebasNeue",
        fontSize: 64
    },
    subTitle: {
        fontFamily: "Montserrat",
        fontSize: 20,
        color: colors.white,
        fontWeight: '700',
        letterSpacing: 3
    },
    inputContainer: {
        gap: 16,
        margin: 16,
        marginTop: 48,
        alignItems: 'center',

    },
    textInput: {
        padding: 8,
        paddingLeft: 16,
        borderRadius: 16,
        backgroundColor: colors.backgroundDark,
        width: textInputWidth,
        color: colors.white,
    },
    footTextContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    whiteText: {
        color: colors.white,
        fontSize: 18,
    },
    underLineText: {
        textDecorationLine: 'underline',
    },
    strongText: {
        fontWeight: '900',
        fontSize: 18
    },
    btn: {
        padding: 16,
        paddingHorizontal: 32,
        backgroundColor: colors.backgroundDark,
        borderRadius: 16,
        marginVertical: 10
    },
    btnText: {
        color: colors.white,
        fontSize: 18,
        fontWeight: '700'
    },
    guestOptionContainer: {
        alignItems: 'center',
        marginTop: 64
    },
    error: {
        color: colors.red
      }
})