import { WordGender } from "@/constants/WordGender";
import { useStyling } from "@/hooks/useStyling";
import { WordListDto } from "@/models/IWord";
import { useTheme } from "@react-navigation/native";
import { useColorScheme, View } from "react-native";
import { Card } from '../components/Card';
import { Text } from './Themed';

export interface IWordListItemProps {
    item: WordListDto,
    index: number
}

export function WordListItem(props: IWordListItemProps) {
    const colorScheme = useColorScheme();
    const theme = useTheme();
    const styles = useStyling();


    const formatItem = (word: string, gender?: WordGender) => {
        return <Text style={styles.text} >{`${word} ${!!gender ? `(gender})` : ''}`}</Text>
    }

    return (
        <View >
            <Card > 
 { formatItem(props.item.nativeWord, props.item.nativeWordGender) }
  { formatItem(props.item.translateWord) }
            </Card>
          
{/*               
                    <View >
                        {formatItem(props.item.nativeWord, props.item.nativeWordGender)}
                    </View>
                    <View>
                        {formatItem(props.item.translateWord, props.item.translateWordGender)}
                    </View> */}
        
             
        </View>
    )
}
