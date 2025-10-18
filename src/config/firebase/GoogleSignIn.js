import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

export const SignInWithGoogle = async () => {
    try {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: '699993641307-n4t4vhj9tpje6p0249s3g9upcrut4k9m.apps.googleusercontent.com',
            scopes: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
        })
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);
        auth().signInWithCredential(googleCredential);
        return userInfo
    } catch (error) {
        console.log(error);
    }
}