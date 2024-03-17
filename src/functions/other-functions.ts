import Clipboard from "@react-native-clipboard/clipboard";
import { ToastAndroid, Alert, TouchableNativeFeedback } from "react-native";
import { Note } from "../types/other-types";

export function generateUUID() { // Public Domain/MIT
  var d = new Date().getTime();//Timestamp
  var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16;//random number between 0 and 16
    if(d > 0){//Use timestamp until depleted
        r = (d + r)%16 | 0;
        d = Math.floor(d/16);
    } else {//Use microseconds since page-load if supported
        r = (d2 + r)%16 | 0;
        d2 = Math.floor(d2/16);
    }
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
} 

export function copyToClipboard(text: string) {
  Clipboard.setString(text)
}

export function showMessage(message: string) {
  ToastAndroid.show(message, ToastAndroid.SHORT)
}

export function showBooleanMessage(title: string, message: string, callbackYes: () => void, callbackNo?: () => void) {
  Alert.alert(title, message, [
    {
        text: 'Sim',
        onPress: () => callbackYes()
    },
    {
        text: 'Não',
        onPress: () => callbackNo && callbackNo()
    }
  ])
}

export function customRippleRadiusEffect(colorCode: string, rippleRadius: number) {
  return TouchableNativeFeedback.Ripple(colorCode, false, rippleRadius)
}

export function toCustomCreateLocaleString(dateObj: Date, languageCode: Intl.LocalesArgument, localeOptions: Intl.DateTimeFormatOptions) {
  const creationDatetimeDate = dateObj.toLocaleDateString(languageCode, localeOptions)
  const creationDatetimeTime = dateObj.toLocaleTimeString(languageCode, localeOptions)
  const creationDatetime = `Criado em ${ creationDatetimeDate } as ${ creationDatetimeTime }`

  return creationDatetime
}

export function toCustomEditLocaleString(dateObj: Date, languageCode: Intl.LocalesArgument, localeOptions: Intl.DateTimeFormatOptions) {
  const lastEditDatetimeDate = dateObj.toLocaleDateString(languageCode, localeOptions)
  const lastEditDatetimeTime = dateObj.toLocaleTimeString(languageCode, localeOptions)
  const lastEditDatetime = `Editado em ${ lastEditDatetimeDate } as ${ lastEditDatetimeTime }`

  return lastEditDatetime
}

export function isNote(obj: Note) {
  /**
   * {
   *  id: string;
   *  title: string;
   *  text: string;
   *  creation_datetime: string;
   *  last_edit_datetime: string;
   * }
   */
  const noteKeys =  ['id', 'title', 'text', 'creation_datetime', 'last_edit_datetime']
  const objKeys = Object.keys(obj)

  if (!isArrayEqual(noteKeys, objKeys)) return false

  for (const noteKey of noteKeys) {
    if (typeof obj[noteKey as keyof Note] != 'string') return false
  }

  return true
}

export function isArrayEqual(arr1: any[], arr2: any[]) {
  if (arr1.length != arr2.length) return false

  const sortedArr1 = [...arr1].sort()
  const sortedArr2 = [...arr2].sort()
  
  for (let i = 0; i < arr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false
  }

  return true
}