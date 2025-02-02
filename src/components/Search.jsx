import { StyleSheet, TextInput } from 'react-native'
import { colors } from '../global/colors'

const Search = ({setSearch}) => {
  return (
    <TextInput 
      placeholder="Busca un producto"
      onChangeText={(text)=>setSearch(text)}
      style={styles.searchInput}
    />
  )
}

export default Search

const styles = StyleSheet.create({
  searchInput:{
    backgroundColor: colors.background,
    margin: 5,
    borderWidth: 1,
    borderRadius: 15,
    padding: 5,
    paddingLeft: 10,
  }
})