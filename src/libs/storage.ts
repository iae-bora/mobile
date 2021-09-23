import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserProps {
    displayName: string;
    email: string;
    photoUrl: string;
    uid: string;
    registrationStep: string;
}

export async function saveUserData(user: UserProps){
    try {
        await AsyncStorage.setItem('@iaebora:user', JSON.stringify(user));
    } catch (error) {
        throw new Error('Não foi possível salvar os dados do usuário');
    }
}

export async function loadUserData(){
    try {
        const data = await AsyncStorage.getItem('@iaebora:user');
        const user = data ? JSON.parse(data) : {};

        return user;
    } catch (error) {
        throw new Error('Não foi possível carregar os dados do usuário');
    }
}

export async function removeUserData() {
    await AsyncStorage.setItem('@iaebora:user', '');
}