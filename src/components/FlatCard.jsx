import { StyleSheet, View } from 'react-native'
import { colors } from '../global/colors'

const FlatCard = ({children,style}) => {
  return (
    <View style={{...styles.cardContainer,...style}}>
      {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    cardContainer:{
        backgroundColor: colors.backgroundLight,
        borderRadius: 10,
        padding: 10,
        marginBottom: 10
    }
})