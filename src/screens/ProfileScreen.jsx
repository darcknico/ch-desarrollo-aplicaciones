import { StyleSheet, Text, View, Pressable,Image } from 'react-native'
import { colors } from '../global/colors'
import CameraIcon from '../components/Cameralcon'
import { useSelector, useDispatch } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import { clearUser, setProfilePicture } from '../features/auth/authSlice'
import { usePutProfilePictureMutation } from '../services/userService';
import { clearSessions } from '../db';

const ProfileScreen = () => {
    
    const token = useSelector(state=>state.authReducer.value.token)
    const user = useSelector(state=>state.authReducer.value.email)
    const image = useSelector(state=>state.authReducer.value.profilePicture)
    const localId = useSelector(state=>state.authReducer.value.localId)
    const dispatch = useDispatch()

    const isLogged = token != 'demo'

    const [triggerPutProfilePicture,result] = usePutProfilePictureMutation()

    const verifyCameraPermissions = async () => {
        const {granted} = await ImagePicker.requestCameraPermissionsAsync()
        if(!granted) return false
        return true
    }

    const pickImage = async () =>{
        const permissionOk = await verifyCameraPermissions()
        if(permissionOk){
            let result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1,1],
                base64: true,
                quality: 0.7
            })
            if(!result.canceled){
                dispatch(setProfilePicture(`data:image/jpeg;base64,${result.assets[0].base64}`))
                triggerPutProfilePicture({image: `data:image/jpeg;base64,${result.assets[0].base64}`,localId})
            }
        }else{
        }
    }
    const onLogout = ()=>{
        dispatch(clearUser())
        clearSessions()
        .then(()=>console.log("Sesión eliminada"))
        .catch((error)=>console.log("Error al eliminar la sesión"))
    }
    
    return (
        <View style={styles.profileContainer}>
            {
                isLogged ? (<>
                <View style={styles.imageProfileContainer}>
                    {
                        image
                            ?
                            <Image source={{ uri: image }} resizeMode='cover' style={styles.profileImage} />
                            :
                            <Text style={styles.textProfilePlaceHolder}>{user.charAt(0).toUpperCase()}</Text>
                    }
                    <Pressable onPress={pickImage} style={({ pressed }) => [{ opacity: pressed ? 0.90 : 1 }, styles.cameraIcon]} >
                        <CameraIcon />
                    </Pressable>
                </View>
                <Text style={styles.profileData}>Email: {user}</Text>
                <Pressable onPress={onLogout} style={styles.closeSesion}>
                    <Text style={styles.closeSesion}>Cerrar Sesion</Text>
                </Pressable>
                </>) : (<>
                    <Pressable onPress={onLogout} style={styles.closeSesion}>
                        <Text style={styles.closeSesion}>Iniciar Sesion</Text>
                    </Pressable>
                </>)
            }
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    profileContainer: {
        backgroundColor: colors.background,
        padding: 32,
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%"
    },
    imageProfileContainer: {
        width: 128,
        height: 128,
        borderRadius: 128,
        backgroundColor: colors.purple,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textProfilePlaceHolder: {
        color: colors.black,
        fontSize: 48,
    },
    profileData: {
        color: colors.black,
        paddingVertical: 16,
        fontSize: 16
    },
    cameraIcon: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    profileImage: {
        width: 128,
        height: 128,
        borderRadius: 128
    },
    closeSesion: {
        color: colors.black,
        paddingVertical: 16,
        fontSize: 16,
        textDecorationLine: 'underline'
    }
})